#!/usr/bin/env python3
"""Import a public Steam library once, then keep a local editable snapshot.

Data flow:
- CMS writes only content/game-history.json.
- This script fetches Steam only on first import, profile change, explicit refresh,
  or workflow_dispatch force.
- Imported entries are written to `steamGames` and become local data.
- Existing local edits (hours, status, names, perfect, hidden, notes) are never
  overwritten on later refreshes.
- If an imported Steam entry is deleted in CMS, its App ID is recorded in
  content/steam-import-state.json so later refreshes do not resurrect it.
- `manualGames` is never touched.

The importer first tries Steam Community's public XML games list. If that is
unavailable and a STEAM_WEB_API_KEY repository secret exists, it falls back to
Steam's official Web API GetOwnedGames endpoint.
"""
from __future__ import annotations

import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "content" / "game-history.json"
STATE_PATH = ROOT / "content" / "steam-import-state.json"
USER_AGENT = "RuiQi-Portfolio-SteamSnapshot/2.0"


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def request_bytes(url: str, timeout: int = 35) -> bytes:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/json, application/xml, text/xml, text/html;q=0.8, */*;q=0.5",
            "Accept-Language": "en-US,en;q=0.8",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        return response.read()


def normalize_profile_url(raw: str) -> str:
    raw = str(raw or "").strip()
    if not raw:
        return ""
    if not re.match(r"^https?://", raw, re.I):
        raw = "https://" + raw.lstrip("/")
    parsed = urllib.parse.urlsplit(raw)
    if parsed.netloc.lower() not in {"steamcommunity.com", "www.steamcommunity.com"}:
        raise ValueError("Steam 主页必须来自 steamcommunity.com。")
    path = parsed.path.rstrip("/")
    path = re.sub(r"/games(?:/.*)?$", "", path, flags=re.I)
    if not (path.startswith("/id/") or path.startswith("/profiles/")):
        raise ValueError("Steam 主页应类似 /id/自定义ID 或 /profiles/数字SteamID。")
    return f"https://steamcommunity.com{path}/"


def parse_hours(value: str | None) -> float:
    if not value:
        return 0.0
    cleaned = str(value).replace(",", "").strip()
    try:
        return round(float(cleaned), 1)
    except ValueError:
        return 0.0


def fetch_via_public_xml(profile_url: str) -> list[dict]:
    # `tab=all` makes intent explicit; xml=1 returns the compact public library feed.
    url = profile_url.rstrip("/") + "/games?tab=all&xml=1"
    payload = request_bytes(url)
    try:
        root = ET.fromstring(payload)
    except ET.ParseError as exc:
        preview = payload[:180].decode("utf-8", "replace")
        raise RuntimeError(f"Steam Community 未返回可解析 XML：{preview}") from exc

    error_text = (root.findtext("error") or "").strip()
    if error_text:
        raise RuntimeError(error_text)

    games: list[dict] = []
    for node in root.findall(".//game"):
        app_text = (node.findtext("appID") or "").strip()
        name = (node.findtext("name") or "").strip()
        if not app_text.isdigit() or not name:
            continue
        games.append(
            {
                "steamAppId": int(app_text),
                "name": name,
                "playtimeHours": parse_hours(node.findtext("hoursOnRecord")),
            }
        )
    if not games:
        raise RuntimeError("Steam Community 返回了空游戏库。请确认个人资料与“游戏详情 / Game details”均为公开。")
    return games


def steamid_from_profile(profile_url: str, api_key: str) -> str:
    path = urllib.parse.urlsplit(profile_url).path.strip("/").split("/")
    if len(path) >= 2 and path[0] == "profiles" and path[1].isdigit():
        return path[1]
    if len(path) >= 2 and path[0] == "id":
        vanity = path[1]
        qs = urllib.parse.urlencode({"key": api_key, "vanityurl": vanity})
        payload = json.loads(request_bytes(f"https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?{qs}"))
        response = payload.get("response", {})
        steamid = str(response.get("steamid") or "")
        if response.get("success") != 1 or not steamid.isdigit():
            raise RuntimeError("Steam Web API 无法解析该自定义主页 ID。")
        return steamid
    raise RuntimeError("无法从 Steam 主页解析 SteamID。")


def fetch_via_web_api(profile_url: str, api_key: str) -> list[dict]:
    steamid = steamid_from_profile(profile_url, api_key)
    qs = urllib.parse.urlencode(
        {
            "key": api_key,
            "steamid": steamid,
            "include_appinfo": "true",
            "include_played_free_games": "true",
            "format": "json",
        }
    )
    payload = json.loads(request_bytes(f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?{qs}"))
    raw_games = payload.get("response", {}).get("games", []) or []
    games = []
    for item in raw_games:
        try:
            appid = int(item.get("appid"))
        except (TypeError, ValueError):
            continue
        name = str(item.get("name") or "").strip()
        if not name:
            continue
        games.append(
            {
                "steamAppId": appid,
                "name": name,
                "playtimeHours": round(float(item.get("playtime_forever") or 0) / 60.0, 1),
            }
        )
    if not games:
        raise RuntimeError("Steam Web API 没有返回游戏。请确认 Game details 为 Public。")
    return games


def fetch_games(profile_url: str) -> tuple[list[dict], str]:
    xml_error = None
    try:
        return fetch_via_public_xml(profile_url), "Steam Community XML"
    except Exception as exc:  # fallback is intentional
        xml_error = exc

    api_key = os.environ.get("STEAM_WEB_API_KEY", "").strip()
    if api_key:
        try:
            return fetch_via_web_api(profile_url, api_key), "Steam Web API"
        except Exception as api_exc:
            raise RuntimeError(f"公开 XML 导入失败：{xml_error}；Web API 也失败：{api_exc}") from api_exc
    raise RuntimeError(
        f"公开 Steam 游戏列表导入失败：{xml_error}。请确认 Steam 个人资料和 Game details 都是 Public。"
    )


def load_json(path: Path, fallback: dict) -> dict:
    if not path.exists():
        return dict(fallback)
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.name} 顶层必须是对象。")
    return value


def int_or_none(value):
    try:
        return int(value) if value not in (None, "") else None
    except (TypeError, ValueError):
        return None


def main() -> int:
    data = load_json(DATA_PATH, {"settings": {}, "manualGames": [], "steamGames": []})
    settings = data.setdefault("settings", {})
    data.setdefault("manualGames", [])
    steam_games_local = [g for g in data.setdefault("steamGames", []) if isinstance(g, dict)]

    raw_profile = settings.get("steamProfileUrl", "")
    if not str(raw_profile).strip():
        print("Steam 主页链接为空：不执行导入。")
        return 0
    try:
        profile_url = normalize_profile_url(raw_profile)
    except ValueError as exc:
        print(f"::error::{exc}")
        return 1

    state = load_json(
        STATE_PATH,
        {"profileUrl": "", "lastSteamAppIds": [], "excludedSteamAppIds": [], "importedAt": ""},
    )
    previous_profile = str(state.get("profileUrl") or "")
    last_ids = {int(x) for x in state.get("lastSteamAppIds", []) if str(x).isdigit()}
    excluded = {int(x) for x in state.get("excludedSteamAppIds", []) if str(x).isdigit()}
    current_by_id = {
        int_or_none(g.get("steamAppId")): g
        for g in steam_games_local
        if int_or_none(g.get("steamAppId")) is not None
    }

    profile_changed = bool(previous_profile and previous_profile != profile_url)
    if profile_changed:
        last_ids.clear()
        excluded.clear()
    elif previous_profile == profile_url and last_ids:
        # Entries missing from the local editable list were intentionally deleted.
        excluded.update(last_ids - set(current_by_id))

    requested = bool(settings.get("steamImportRequested"))
    force = os.environ.get("FORCE_STEAM_IMPORT", "").strip().lower() in {"1", "true", "yes"}
    first_import = not previous_profile or profile_changed or not last_ids
    if not (first_import or requested or force):
        print("已有 Steam 本地快照；普通 CMS 保存不会重新抓取。")
        return 0

    try:
        fetched, source_name = fetch_games(profile_url)
    except Exception as exc:
        print(f"::error::{exc}")
        return 1

    added = 0
    fetched_ids: list[int] = []
    for steam in fetched:
        appid = int(steam["steamAppId"])
        fetched_ids.append(appid)
        if appid in excluded or appid in current_by_id:
            continue
        item = {
            "name": steam["name"],
            "playtimeHours": steam["playtimeHours"],
            "platforms": ["Steam"],
            "status": "",
            "perfect": False,
            "featured": False,
            "hidden": False,
            "steamAppId": appid,
        }
        steam_games_local.append(item)
        current_by_id[appid] = item
        added += 1

    settings["steamProfileUrl"] = profile_url
    settings["steamImportRequested"] = False
    data["steamGames"] = steam_games_local
    data["schemaVersion"] = "GAME-HISTORY-V37"
    DATA_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    state = {
        "schemaVersion": "STEAM-IMPORT-STATE-V37",
        "profileUrl": profile_url,
        "lastSteamAppIds": sorted(set(fetched_ids)),
        "excludedSteamAppIds": sorted(excluded),
        "importedAt": now_iso(),
        "source": source_name,
        "fetchedCount": len(fetched_ids),
    }
    STATE_PATH.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Steam 快照完成：来源 {source_name}；读取 {len(fetched_ids)} 条；新增 {added} 条；本地编辑未覆盖。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
