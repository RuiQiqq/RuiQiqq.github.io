#!/usr/bin/env python3
"""Import a Steam library through the official Steam Web API and keep a local editable snapshot.

Key behavior:
- Requires GitHub Actions secret: STEAM_WEB_API_KEY.
- Uses ResolveVanityURL + GetOwnedGames; no Steam Community XML scraping.
- Imports only titles with at least 3 hours of recorded playtime.
- Best-effort backfills Simplified Chinese game names and stores them locally.
- For newly imported games that expose community stats, it also attempts to read achievement counts.
- Existing local edits are authoritative: hours/status/perfect/notes are never overwritten on refresh.
- Deleted Steam entries are remembered in content/steam-import-state.json and stay deleted.
- manualGames is never touched.
"""
from __future__ import annotations

import concurrent.futures
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "content" / "game-history.json"
STATE_PATH = ROOT / "content" / "steam-import-state.json"
NAME_MAP_PATH = ROOT / "content" / "game-name-map.json"
USER_AGENT = "RuiQi-Portfolio-SteamSnapshot/4.0"
API_BASE = "https://api.steampowered.com"
STORE_APPDETAILS = "https://store.steampowered.com/api/appdetails"
MIN_IMPORT_HOURS = 3.0
ZH_BACKFILL_VERSION = "ZH-NAMES-V44"

# Fallbacks for titles whose Steam store name remains English even in Simplified Chinese.
KNOWN_ZH_NAMES = {
    "Apex Legends": "Apex 英雄",
    "Counter-Strike 2": "反恐精英 2",
    "ELDEN RING": "艾尔登法环",
    "DARK SOULS™ III": "黑暗之魂 III",
    "DARK SOULS III": "黑暗之魂 III",
    "DARK SOULS™: REMASTERED": "黑暗之魂：重制版",
    "DARK SOULS: REMASTERED": "黑暗之魂：重制版",
    "ELDEN RING NIGHTREIGN": "艾尔登法环 黑夜君临",
    "Sekiro™: Shadows Die Twice": "只狼：影逝二度",
    "Sekiro: Shadows Die Twice": "只狼：影逝二度",
    "Black Myth: Wukong": "黑神话：悟空",
    "Stacklands": "堆叠大陆",
    "Cyberpunk 2077": "赛博朋克 2077",
    "Baldur\'s Gate 3": "博德之门 3",
    "Monster Hunter: World": "怪物猎人：世界",
    "Monster Hunter Wilds": "怪物猎人：荒野",
    "Hades": "哈迪斯",
    "Hades II": "哈迪斯 II",
    "Stardew Valley": "星露谷物语",
    "Terraria": "泰拉瑞亚",
}


def load_shared_name_map() -> dict[str, str]:
    try:
        value = json.loads(NAME_MAP_PATH.read_text(encoding="utf-8"))
        names = value.get("names") if isinstance(value, dict) else {}
        if not isinstance(names, dict):
            return {}
        result = {}
        for key, item in names.items():
            if isinstance(item, dict):
                zh = str(item.get("zh") or "").strip()
            else:
                zh = ""
            if zh:
                result[str(key).strip()] = zh
        return result
    except Exception:
        return {}


SHARED_ZH_NAMES = load_shared_name_map()



def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def request_json(url: str, timeout: int = 30) -> dict:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.8",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as response:
            payload = response.read()
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"Steam Web API returned HTTP {exc.code} for {urllib.parse.urlsplit(url).path}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Could not connect to Steam Web API: {exc.reason}") from exc

    try:
        value = json.loads(payload.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        preview = payload[:160].decode("utf-8", "replace")
        raise RuntimeError(f"Steam Web API did not return valid JSON: {preview}") from exc
    if not isinstance(value, dict):
        raise RuntimeError("Steam Web API returned an unexpected response shape.")
    return value


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


def steamid_from_profile(profile_url: str, api_key: str) -> str:
    parts = urllib.parse.urlsplit(profile_url).path.strip("/").split("/")
    if len(parts) >= 2 and parts[0].lower() == "profiles" and parts[1].isdigit():
        return parts[1]
    if len(parts) >= 2 and parts[0].lower() == "id":
        vanity = parts[1]
        qs = urllib.parse.urlencode({"key": api_key, "vanityurl": vanity, "url_type": 1})
        payload = request_json(f"{API_BASE}/ISteamUser/ResolveVanityURL/v1/?{qs}")
        response = payload.get("response") or {}
        steamid = str(response.get("steamid") or "")
        if response.get("success") != 1 or not steamid.isdigit():
            message = str(response.get("message") or "Steam Web API 无法解析该自定义主页 ID。")
            raise RuntimeError(message)
        return steamid
    raise RuntimeError("无法从 Steam 主页解析 SteamID。")


def fetch_owned_games(profile_url: str, api_key: str) -> tuple[str, list[dict]]:
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
    payload = request_json(f"{API_BASE}/IPlayerService/GetOwnedGames/v1/?{qs}")
    response = payload.get("response") or {}
    raw_games = response.get("games") or []
    if not isinstance(raw_games, list):
        raw_games = []

    games: list[dict] = []
    for item in raw_games:
        if not isinstance(item, dict):
            continue
        try:
            appid = int(item.get("appid"))
            minutes = int(item.get("playtime_forever") or 0)
        except (TypeError, ValueError):
            continue
        name = str(item.get("name") or "").strip()
        # The portfolio intentionally hides very short trials / accidental launches.
        if not name or minutes < int(MIN_IMPORT_HOURS * 60):
            continue
        games.append(
            {
                "steamAppId": appid,
                "name": name,
                "playtimeHours": round(minutes / 60.0, 1),
                "hasCommunityStats": bool(item.get("has_community_visible_stats")),
            }
        )

    if not games:
        raise RuntimeError(
            "Steam Web API 没有返回任何有游玩时长的游戏。请确认 Steam 的 Game details / 游戏详情为 Public。"
        )
    return steamid, games


def fetch_achievement_summary(steamid: str, appid: int, api_key: str) -> tuple[int, int] | None:
    qs = urllib.parse.urlencode({"key": api_key, "steamid": steamid, "appid": appid, "l": "english"})
    try:
        payload = request_json(f"{API_BASE}/ISteamUserStats/GetPlayerAchievements/v1/?{qs}", timeout=15)
    except Exception:
        return None
    playerstats = payload.get("playerstats") or {}
    if playerstats.get("success") is not True:
        return None
    achievements = playerstats.get("achievements") or []
    if not isinstance(achievements, list) or not achievements:
        return None
    total = len(achievements)
    unlocked = sum(1 for achievement in achievements if isinstance(achievement, dict) and int(achievement.get("achieved") or 0) == 1)
    return unlocked, total


def enrich_new_games_with_achievements(games: list[dict], steamid: str, api_key: str) -> int:
    candidates = [game for game in games if game.get("hasCommunityStats")]
    if not candidates:
        return 0

    def worker(game: dict):
        return game, fetch_achievement_summary(steamid, int(game["steamAppId"]), api_key)

    enriched = 0
    # A small pool keeps first import practical without flooding the API.
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        futures = [executor.submit(worker, game) for game in candidates]
        for future in concurrent.futures.as_completed(futures):
            try:
                game, summary = future.result()
            except Exception:
                continue
            if not summary:
                continue
            unlocked, total = summary
            game["achievementsUnlocked"] = unlocked
            game["achievementsTotal"] = total
            game["perfect"] = total > 0 and unlocked >= total
            enriched += 1
    return enriched


def contains_cjk(value: str) -> bool:
    return any("\u3400" <= char <= "\u9fff" for char in str(value or ""))


def fetch_store_zh_names(appids: list[int]) -> dict[int, str]:
    """Best-effort Simplified Chinese store-title lookup.

    This is deliberately non-fatal: if Steam Store metadata is unavailable or a title has no
    localized store name, the portfolio keeps the English Steam name.
    """
    unique = sorted({int(appid) for appid in appids if int(appid) > 0})
    if not unique:
        return {}

    result: dict[int, str] = {}
    batches = [unique[index:index + 20] for index in range(0, len(unique), 20)]

    def fetch_batch(batch: list[int]) -> dict[int, str]:
        query = urllib.parse.urlencode(
            {
                "appids": ",".join(str(appid) for appid in batch),
                "filters": "name",
                "l": "schinese",
                "cc": "CN",
            }
        )
        try:
            payload = request_json(f"{STORE_APPDETAILS}?{query}", timeout=20)
        except Exception:
            return {}
        found: dict[int, str] = {}
        for appid in batch:
            entry = payload.get(str(appid)) or {}
            data = entry.get("data") or {}
            name = str(data.get("name") or "").strip()
            if entry.get("success") and name:
                found[appid] = name
        return found

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        futures = [executor.submit(fetch_batch, batch) for batch in batches]
        for future in concurrent.futures.as_completed(futures):
            try:
                result.update(future.result())
            except Exception:
                continue
    return result


def best_zh_name(english_name: str, store_name: str = "") -> str:
    english_name = str(english_name or "").strip()
    if english_name in SHARED_ZH_NAMES:
        return SHARED_ZH_NAMES[english_name]
    if english_name in KNOWN_ZH_NAMES:
        return KNOWN_ZH_NAMES[english_name]
    store_name = str(store_name or "").strip()
    if store_name and store_name != english_name and contains_cjk(store_name):
        return store_name
    return ""


def backfill_zh_names(games: list[dict]) -> int:
    candidates = [
        game for game in games
        if int_or_none(game.get("steamAppId")) is not None and not str(game.get("nameZh") or "").strip()
    ]
    if not candidates:
        return 0
    localized = fetch_store_zh_names([int(game["steamAppId"]) for game in candidates])
    changed = 0
    for game in candidates:
        appid = int(game["steamAppId"])
        zh = best_zh_name(str(game.get("name") or ""), localized.get(appid, ""))
        if zh:
            game["nameZh"] = zh
            changed += 1
    return changed


def load_json(path: Path, fallback: dict) -> dict:
    if not path.exists():
        return dict(fallback)
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.name} 顶层必须是对象。")
    return value


def write_json(path: Path, value: dict) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def int_or_none(value):
    try:
        return int(value) if value not in (None, "") else None
    except (TypeError, ValueError):
        return None


def main() -> int:
    data = load_json(DATA_PATH, {"settings": {}, "manualGames": [], "steamGames": []})
    settings = data.setdefault("settings", {})
    data.setdefault("manualGames", [])
    steam_games_local = [game for game in data.setdefault("steamGames", []) if isinstance(game, dict)]

    raw_profile = settings.get("steamProfileUrl", "")
    if not str(raw_profile).strip():
        print("Steam 主页链接为空：不执行导入。")
        return 0
    try:
        profile_url = normalize_profile_url(raw_profile)
    except ValueError as exc:
        print(f"::error::{exc}")
        return 1

    api_key = os.environ.get("STEAM_WEB_API_KEY", "").strip()
    if not api_key:
        print("::error::未找到 GitHub Actions Secret：STEAM_WEB_API_KEY。请在仓库 Settings → Secrets and variables → Actions 中添加。")
        return 1

    state = load_json(
        STATE_PATH,
        {
            "profileUrl": "",
            "steamId": "",
            "lastSteamAppIds": [],
            "excludedSteamAppIds": [],
            "importedAt": "",
        },
    )
    # One-time localization migration for the already-imported local snapshot.
    # It never changes hours, completion state, achievements, notes, or deletion state.
    if state.get("zhNameBackfillVersion") != ZH_BACKFILL_VERSION:
        localized_count = backfill_zh_names(steam_games_local)
        state["zhNameBackfillVersion"] = ZH_BACKFILL_VERSION
        if localized_count:
            data["steamGames"] = steam_games_local
            write_json(DATA_PATH, data)
        write_json(STATE_PATH, state)
        print(f"中文名称补全：为 {localized_count} 款本地 Steam 游戏写入中文名；其余继续使用英文名。")

    previous_profile = str(state.get("profileUrl") or "")
    last_ids = {int(value) for value in state.get("lastSteamAppIds", []) if str(value).isdigit()}
    excluded = {int(value) for value in state.get("excludedSteamAppIds", []) if str(value).isdigit()}
    current_by_id = {
        int_or_none(game.get("steamAppId")): game
        for game in steam_games_local
        if int_or_none(game.get("steamAppId")) is not None
    }

    profile_changed = bool(previous_profile and previous_profile != profile_url)
    if profile_changed:
        last_ids.clear()
        excluded.clear()
    elif previous_profile == profile_url and last_ids:
        # If an imported entry is missing from the editable CMS list, the user deleted it.
        excluded.update(last_ids - set(current_by_id))

    requested = bool(settings.get("steamImportRequested"))
    force = os.environ.get("FORCE_STEAM_IMPORT", "").strip().lower() in {"1", "true", "yes"}
    first_import = not previous_profile or profile_changed or not last_ids

    if not (first_import or requested or force):
        # Persist deletion tombstones even on an ordinary CMS save, without touching Steam.
        previous_excluded = {int(value) for value in state.get("excludedSteamAppIds", []) if str(value).isdigit()}
        if excluded != previous_excluded:
            state["schemaVersion"] = "STEAM-IMPORT-STATE-V38"
            state["excludedSteamAppIds"] = sorted(excluded)
            write_json(STATE_PATH, state)
            print(f"记录了 {len(excluded)} 个已删除 Steam 条目；未访问 Steam。")
        else:
            print("已有 Steam 本地快照；普通 CMS 保存不会重新访问 Steam。")
        return 0

    try:
        steamid, fetched = fetch_owned_games(profile_url, api_key)
    except Exception as exc:
        print(f"::error::{exc}")
        return 1

    fetched_ids = [int(game["steamAppId"]) for game in fetched]
    new_candidates = [game for game in fetched if int(game["steamAppId"]) not in excluded and int(game["steamAppId"]) not in current_by_id]
    zh_names = fetch_store_zh_names([int(game["steamAppId"]) for game in new_candidates])
    for game in new_candidates:
        game["nameZh"] = best_zh_name(game.get("name", ""), zh_names.get(int(game["steamAppId"]), ""))
    achievement_enriched = enrich_new_games_with_achievements(new_candidates, steamid, api_key)

    added = 0
    for steam in new_candidates:
        appid = int(steam["steamAppId"])
        item = {
            "name": steam["name"],
            "nameZh": steam.get("nameZh", ""),
            "playtimeHours": steam["playtimeHours"],
            "platforms": ["Steam"],
            "status": "",
            "perfect": bool(steam.get("perfect", False)),
            "featured": False,
            "homeFeatured": False,
            "hidden": False,
            "steamAppId": appid,
        }
        if steam.get("achievementsTotal"):
            item["achievementsUnlocked"] = int(steam.get("achievementsUnlocked") or 0)
            item["achievementsTotal"] = int(steam["achievementsTotal"])
        steam_games_local.append(item)
        current_by_id[appid] = item
        added += 1

    settings["steamProfileUrl"] = profile_url
    settings["steamImportRequested"] = False
    data["steamGames"] = steam_games_local
    data["schemaVersion"] = "GAME-HISTORY-V38"
    write_json(DATA_PATH, data)

    state = {
        "schemaVersion": "STEAM-IMPORT-STATE-V38",
        "profileUrl": profile_url,
        "steamId": steamid,
        "lastSteamAppIds": sorted(set(fetched_ids)),
        "excludedSteamAppIds": sorted(excluded),
        "importedAt": now_iso(),
        "source": "Steam Web API",
        "fetchedPlayedCount": len(fetched_ids),
        "achievementEnrichedNewGames": achievement_enriched,
    }
    write_json(STATE_PATH, state)
    print(
        f"Steam 本地快照完成：读取 {len(fetched_ids)} 款有游玩时长的游戏；新增 {added} 款；"
        f"自动读取 {achievement_enriched} 款新游戏的成就信息；已有本地编辑未覆盖。"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
