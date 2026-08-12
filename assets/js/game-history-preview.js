(() => {
  const VERSION = "38";
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
    kicker: "游戏经历", title: "玩过的游戏",
    intro: "这里快速预览我投入时间较多、全成就或具有代表性的游戏经历。完整页面包含更多游戏、时长与完成情况。",
    view: "查看完整游戏经历", games: "款游戏", hours: "小时", perfect: "全成就", empty: "Steam 游戏导入或手动记录后，这里会自动显示代表性游戏。",
    nonSteam: "非 Steam"
  } : {
    kicker: "Game History", title: "Games Played",
    intro: "A quick preview of games I have spent significant time with, completed at 100%, or chosen as representative play experience.",
    view: "View Full Game History", games: "games", hours: "hours", perfect: "100%", empty: "Representative games will appear here automatically after Steam import or manual entry.",
    nonSteam: "Non-Steam"
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
    ].filter(game => game && text(game.name) && !game.hidden);
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
    return (game.featured ? 2e9 : 0) + (perfect(game) ? 1e9 : 0) + (num(game.playtimeHours) >= threshold ? 1e8 : 0) + num(game.playtimeHours) * 1000;
  }

  async function init() {
    const root = $("#game-history-preview");
    if (!root) return;
    $("#home-game-kicker").textContent = T.kicker;
    $("#home-game-title").textContent = T.title;
    $("#home-game-intro").textContent = T.intro;
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
      const settings = data.settings || {};
      const threshold = Math.max(0, num(settings.highlightHours) || 100);
      const limit = Math.max(1, Math.min(8, num(settings.homePreviewLimit) || 6));
      const totalHours = games.reduce((sum, game) => sum + num(game.playtimeHours), 0);
      const perfectCount = games.filter(perfect).length;

      $("#home-game-preview-stats").innerHTML = games.length ? `
        <span><strong>${games.length}</strong> ${T.games}</span>
        <span><strong>${Math.round(totalHours).toLocaleString()}</strong> ${T.hours}</span>
        ${perfectCount ? `<span><strong>${perfectCount}</strong> ${T.perfect}</span>` : ""}` : "";

      const selected = games
        .slice()
        .sort((a, b) => score(b, threshold) - score(a, threshold) || currentName(a).localeCompare(currentName(b)))
        .slice(0, limit);

      const list = $("#home-game-preview-games");
      if (!selected.length) {
        list.innerHTML = `<div class="home-game-preview-empty">${escapeHtml(T.empty)}</div>`;
        return;
      }
      list.innerHTML = selected.map(game => {
        const platform = game._source === "steam" ? "Steam" : T.nonSteam;
        const badge = perfect(game) ? `<span class="home-game-perfect">100%</span>` : "";
        return `<article class="home-game-mini-card${perfect(game) ? " is-perfect" : ""}">
          <div class="home-game-mini-top"><span>${escapeHtml(platform)}</span>${badge}</div>
          <h3>${escapeHtml(currentName(game))}</h3>
          <strong>${escapeHtml(formatHours(game.playtimeHours))}</strong>
        </article>`;
      }).join("");
    } catch (error) {
      console.error("Home game preview could not be loaded", error);
      $("#home-game-preview-games").innerHTML = `<div class="home-game-preview-empty">${escapeHtml(T.empty)}</div>`;
    }
  }

  init();
})();
