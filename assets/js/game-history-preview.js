(() => {
  const VERSION = "42";
  const MIN_VISIBLE_HOURS = 3;
  const LANGUAGE_KEY = "ruiqi-portfolio-language";
  const $ = (selector) => document.querySelector(selector);
  const num = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
  const text = (value) => String(value ?? "").trim();
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function language() {
    const query = new URLSearchParams(location.search).get("lang");
    if (query === "zh" || query === "en") return query;
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      if (saved === "zh" || saved === "en") return saved;
    } catch (_) {}
    const langs = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    return langs.some(item => String(item).toLowerCase().startsWith("zh")) ? "zh" : "en";
  }

  const lang = language();
  const T = lang === "zh" ? {
    kicker: "游戏经历 · STEAM", title: "Steam 游戏记录",
    intro: "这里直接预览我的 Steam 游玩记录，重点展示投入时间较多、全成就和手动重点游戏。右侧只是 Steam 预览，并不是我的全部游戏平台。",
    view: "查看全平台所有游戏 →", hours: "Steam 小时", perfect: "全成就", empty: "Steam 游戏导入后，这里会自动显示代表性游戏。",
    previewTitle: "STEAM · 更多游戏预览", previewNote: "这里只是 Steam；完整页包含主机 / 手机 / 非 Steam 游戏",
    steamOnlyNote: "以下时长仅统计 Steam，不包含主机、手机及其他平台。",
    allPlatformCallout: "👇 想看我玩过的全部平台游戏？点击下面按钮进入完整游戏经历：Steam + 主机 + 手机 + 其他平台。"
  } : {
    kicker: "Game History · STEAM", title: "Steam Play History",
    intro: "A compact preview of my Steam play history, emphasizing high-playtime, 100%-achievement, and manually pinned titles. This is only the Steam portion of my overall game history.",
    view: "View All-Platform Games →", hours: "Steam hours", perfect: "100%", empty: "Representative Steam games will appear here automatically after import.",
    previewTitle: "STEAM · More Games", previewNote: "Steam preview only; the full page also includes console, mobile, and non-Steam games",
    steamOnlyNote: "Playtime shown here is Steam-only and excludes console, mobile, and other platforms.",
    allPlatformCallout: "👇 Want the complete list? Use the button below for my full game history across Steam + console + mobile + other platforms."
  };

  function normalize(data, nameMap) {
    const manual = Array.isArray(data.manualGames) ? data.manualGames : [];
    const steam = Array.isArray(data.steamGames) ? data.steamGames : (Array.isArray(data.games) ? data.games : []);
    return [
      ...manual.map((game, index) => {
        const mapped = nameMap[text(game.name)] || {};
        return { ...game, nameEn: text(game.nameEn) || text(mapped.en), nameZh: text(game.nameZh) || text(mapped.zh), _source: "manual", _key: `m-${index}` };
      }),
      ...steam.map((game, index) => ({ ...game, _source: "steam", _key: `s-${game.steamAppId ?? index}` }))
    ].filter(game => game && text(game.name) && !game.hidden && num(game.playtimeHours) >= MIN_VISIBLE_HOURS);
  }

  function perfect(game) {
    if (game.perfect === true) return true;
    const unlocked = num(game.achievementsUnlocked), total = num(game.achievementsTotal);
    return total > 0 && unlocked >= total;
  }

  function currentName(game) {
    if (lang === "zh" && text(game.nameZh)) return text(game.nameZh);
    if (lang === "en" && text(game.nameEn)) return text(game.nameEn);
    return text(game.name) || text(game.nameZh) || "Untitled";
  }

  function formatHours(value) {
    const hours = num(value);
    if (!hours) return "—";
    return `${Math.abs(hours - Math.round(hours)) < .05 ? Math.round(hours) : hours.toFixed(1)}h`;
  }

  function score(game, threshold) {
    return (game.featured ? 1e9 : 0) + num(game.playtimeHours) * 1000 + (perfect(game) ? 75000 : 0) + (num(game.playtimeHours) >= threshold ? 25000 : 0);
  }

  async function init() {
    const root = $("#game-history-preview");
    if (!root) return;
    $("#home-game-kicker").textContent = T.kicker;
    $("#home-game-title").textContent = T.title;
    $("#home-game-intro").textContent = T.intro;
    const sourceTitle = $("#home-game-preview-source-title");
    const sourceNote = $("#home-game-preview-source-note");
    const steamOnlyNote = $("#home-game-steam-only-note");
    if (sourceTitle) sourceTitle.textContent = T.previewTitle;
    if (sourceNote) sourceNote.textContent = T.previewNote;
    if (steamOnlyNote) steamOnlyNote.textContent = T.steamOnlyNote;
    const link = $("#home-game-preview-link");
    link.textContent = T.view;
    link.href = `game-history.html${new URLSearchParams(location.search).get("lang") ? `?lang=${lang}` : ""}`;

    try {
      const [historyResponse, mapResponse] = await Promise.all([
        fetch(`content/game-history.json?v=${VERSION}`, { cache: "no-store" }),
        fetch(`content/game-name-map.json?v=${VERSION}`, { cache: "no-store" })
      ]);
      if (!historyResponse.ok) throw new Error(`HTTP ${historyResponse.status}`);
      const data = await historyResponse.json();
      let nameMap = {};
      if (mapResponse.ok) {
        const mapping = await mapResponse.json();
        nameMap = mapping && typeof mapping.names === "object" ? mapping.names : {};
      }
      const games = normalize(data, nameMap);
      const steamGames = games.filter(game => game._source === "steam");
      const settings = data.settings || {};
      const threshold = Math.max(0, num(settings.highlightHours) || 100);
      const configuredLimit = num(settings.homePreviewLimit);
      const limit = configuredLimit >= 20 ? Math.min(48, configuredLimit) : 30;
      const totalHours = steamGames.reduce((sum, game) => sum + num(game.playtimeHours), 0);
      const perfectCount = steamGames.filter(perfect).length;

      $("#home-game-preview-stats").innerHTML = steamGames.length ? `
        <span><strong>${Math.round(totalHours).toLocaleString()}</strong> ${T.hours}</span>
        ${perfectCount ? `<span><strong>${perfectCount}</strong> ${T.perfect}</span>` : ""}` : "";
      const callout = $("#home-game-all-platform-callout");
      if (callout) callout.textContent = T.allPlatformCallout;

      const selected = steamGames
        .slice()
        .sort((a, b) => score(b, threshold) - score(a, threshold) || currentName(a).localeCompare(currentName(b)))
        .slice(0, limit);

      const list = $("#home-game-preview-games");
      if (!selected.length) {
        list.innerHTML = `<div class="home-game-preview-empty">${escapeHtml(T.empty)}</div>`;
        return;
      }
      list.innerHTML = selected.map(game => {
        const perfectLabel = perfect(game) ? (lang === "zh" ? "全成就" : "100%") : "";
        const meta = [formatHours(game.playtimeHours), perfectLabel].filter(Boolean).join(" · ");
        return `<article class="home-game-mini-card${perfect(game) ? " is-perfect" : ""}" title="${escapeHtml(currentName(game))}">
          <h3>${escapeHtml(currentName(game))}</h3>
          <strong>${escapeHtml(meta)}</strong>
        </article>`;
      }).join("");
    } catch (error) {
      console.error("Home game preview could not be loaded", error);
      $("#home-game-preview-games").innerHTML = `<div class="home-game-preview-empty">${escapeHtml(T.empty)}</div>`;
    }
  }

  init();
})();
