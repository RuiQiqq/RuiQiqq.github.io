#!/usr/bin/env python3
"""One-time Steam library snapshot importer for a static GitHub Pages portfolio.

Reads content/game-history.json, fetches the public Steam games XML for the
configured profile, then MERGES new Steam entries into the local JSON.

Important merge rules:
- Existing local hours/status/names/hidden/perfect are never overwritten.
- Deleted Steam entries stay deleted on later manual refreshes.
- New Steam entries are appended with name, hours, platform and App ID.
- After the first successful import, normal CMS edits do not re-fetch Steam.
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
USER_AGENT = "RuiQi-Portfolio-SteamSnapshot/1.0 (+GitHub Pages portfolio importer)"


def normalize_profile_url(raw: str) -> str:
    raw = (raw or "").strip()
    if not raw:
        return ""
    if not re.match(r"^https?://", raw, re.I):
        raw = "https://" + raw.lstrip("/")
    parsed = urllib.parse.urlsplit(raw)
    host = parsed.netloc.lower()
    if host not in {"steamcommunity.com", "www.steamcommunity.com"}:
        raise ValueError("Steam 主页必须是 steamcommunity.com 的公开个人主页链接。")
    path = parsed.path.rstrip("/")
    # Accept /id/name, /profiles/765..., and links copied from /games pages.
    path = re.sub(r"/games(?:/.*)?$", "", path, flags=re.I)
    if not (path.startswith("/id/") or path.startswith("/profiles/")):
        raise ValueError("Steam 主页应类似 https://steamcommunity.com/id/你的ID 或 /profiles/数字ID。")
    return f"https://steamcommunity.com{path}"


def games_xml_url(profile_url: str) -> str:
    return profile_url.rstrip("/") + "/games?xml=1"


def parse_hours(value: str | None) -> float:
    if not value:
        return 0.0
    cleaned = value.replace(",", "").strip()
    try:
        return round(float(cleaned), 1)
    except ValueError:
        return 0.0


def fetch_games(profile_url: str) -> list[dict]:
    req = urllib.request.Request(games_xml_url(profile_url), headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            payload = response.read()
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"Steam 返回 HTTP {exc.code}。请确认个人资料和游戏详情为公开。") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"无法连接 Steam Community：{exc.reason}") from exc

    try:
        root = ET.fromstring(payload)
    except ET.ParseError as exc:
        preview = payload[:160].decode("utf-8", "replace")
        raise RuntimeError(f"Steam 返回的不是可解析的游戏列表 XML：{preview}") from exc

    games = []
    for node in root.findall(".//game"):
        app_text = (node.findtext("appID") or "").strip()
        name = (node.findtext("name") or "").strip()
        if not app_text.isdigit() or not name:
            continue
        games.append({
            "steamAppId": int(app_text),
            "name": name,
            "playtimeHours": parse_hours(node.findtext("hoursOnRecord")),
        })

    if not games:
        error_text = (root.findtext("error") or "").strip()
        if error_text:
            raise RuntimeError(f"Steam 没有返回游戏列表：{error_text}")
        raise RuntimeError("Steam 没有返回任何游戏。请确认“游戏详情 / Game details”是公开状态。")
    return games


def load_data() -> dict:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"找不到 {DATA_PATH.relative_to(ROOT)}")
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("game-history.json 顶层必须是对象。")
    data.setdefault("settings", {})
    data.setdefault("games", [])
    if not isinstance(data["games"], list):
        raise ValueError("game-history.json 的 games 必须是数组。")
    return data


def appid_of(game: dict) -> int | None:
    value = game.get("steamAppId")
    try:
        return int(value) if value not in (None, "") else None
    except (TypeError, ValueError):
        return None


def main() -> int:
    data = load_data()
    settings = data["settings"]
    raw_profile = settings.get("steamProfileUrl", "")
    if not str(raw_profile).strip():
        print("Steam 主页链接为空：不执行导入。")
        return 0

    try:
        profile_url = normalize_profile_url(str(raw_profile))
    except ValueError as exc:
        print(f"::error::{exc}")
        return 1

    requested = bool(settings.get("steamImportRequested"))
    imported = bool(settings.get("steamImported"))
    previous_profile = str(settings.get("lastImportedSteamProfileUrl") or "").strip()
    profile_changed = previous_profile and previous_profile != profile_url
    first_import = not imported or not previous_profile or profile_changed

    # FORCE_STEAM_IMPORT is used by the workflow_dispatch "force" option.
    force_env = os.environ.get("FORCE_STEAM_IMPORT", "").strip().lower() in {"1", "true", "yes"}
    should_fetch = first_import or requested or force_env

    if not should_fetch:
        print("Steam 已经做过本地快照；这是普通 CMS 编辑，不重新访问 Steam。")
        return 0

    existing_games = [g for g in data["games"] if isinstance(g, dict)]
    current_by_appid = {appid_of(g): g for g in existing_games if appid_of(g) is not None}

    previous_ids = set()
    for value in settings.get("lastSteamAppIds", []) or []:
        try:
            previous_ids.add(int(value))
        except (TypeError, ValueError):
            pass

    excluded_ids = set()
    for value in settings.get("excludedSteamAppIds", []) or []:
        try:
            excluded_ids.add(int(value))
        except (TypeError, ValueError):
            pass

    # If the same profile is manually refreshed, anything that existed in the
    # previous snapshot but is no longer in local JSON was intentionally deleted.
    if previous_profile == profile_url and previous_ids:
        excluded_ids.update(previous_ids - set(current_by_appid))
    elif profile_changed:
        # A different profile should not inherit deletion tombstones from the old one.
        excluded_ids.clear()
        previous_ids.clear()

    try:
        steam_games = fetch_games(profile_url)
    except Exception as exc:
        print(f"::error::{exc}")
        return 1

    added = 0
    fetched_ids: list[int] = []
    for steam in steam_games:
        appid = steam["steamAppId"]
        fetched_ids.append(appid)
        if appid in excluded_ids:
            continue
        if appid in current_by_appid:
            # Local JSON is authoritative after import. Never overwrite user edits.
            continue
        item = {
            "name": steam["name"],
            "nameEn": steam["name"],
            "playtimeHours": steam["playtimeHours"],
            "platforms": ["Steam"],
            "steamAppId": appid,
            "source": "steam",
            "perfect": False,
            "hidden": False,
        }
        existing_games.append(item)
        current_by_appid[appid] = item
        added += 1

    settings["steamProfileUrl"] = profile_url
    settings["steamImported"] = True
    settings["steamImportRequested"] = False
    settings["lastImportedSteamProfileUrl"] = profile_url
    settings["steamImportedAt"] = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    settings["lastSteamAppIds"] = sorted(set(fetched_ids))
    settings["excludedSteamAppIds"] = sorted(excluded_ids)
    settings["lastSteamImportCount"] = len(fetched_ids)
    data["games"] = existing_games

    DATA_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Steam 本地快照完成：读取 {len(fetched_ids)} 条，新增 {added} 条；已有本地编辑全部保留。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
