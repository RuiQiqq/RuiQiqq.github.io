(() => {
  const VERSION = "43";
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
    intro: "首页这里只展示我的 Steam 游戏记录；完整的主机、手机与其他平台游戏统一放在全平台游戏经历中。",
    viewMain: "查看全平台完整游戏经历 →", viewSub: "Steam · 主机 · 手机 · 其他平台",
    hours: "Steam 小时", perfect: "全成就", empty: "Steam 游戏导入后，这里会自动显示代表性游戏。",
    previewTitle: "STEAM · 游戏预览", previewNote: "首页仅 Steam · 全平台记录请点击左侧按钮",
    steamOnlyNote: "本区统计与时长仅来自 Steam；其他平台不计入这里。"
  } : {
    kicker: "Game History · STEAM", title: "Steam Play History",
    intro: "This homepage section shows Steam only. Console, mobile, and other platform titles are collected on the full all-platform game history page.",
    viewMain: "View Full All-Platform Game History →", viewSub: "Steam · Console · Mobile · Other Platforms",
    hours: "Steam hours", perfect: "100%", empty: "Representative Steam games will appear here automatically after import.",
    previewTitle: "STEAM · Game Preview", previewNote: "Steam only · use the left button for the complete all-platform record",
    steamOnlyNote: "Stats and playtime in this section are Steam-only; other platforms are excluded."
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
    link.innerHTML = `<span>${escapeHtml(T.viewMain)}</span><small>${escapeHtml(T.viewSub)}</small>`;
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
      const limit = Math.min(60, Math.max(33, configuredLimit || 33));
      const totalHours = steamGames.reduce((sum, game) => sum + num(game.playtimeHours), 0);
      const perfectCount = steamGames.filter(perfect).length;

      $("#home-game-preview-stats").innerHTML = steamGames.length ? `
        <span><strong>${Math.round(totalHours).toLocaleString()}</strong> ${T.hours}</span>
        ${perfectCount ? `<span><strong>${perfectCount}</strong> ${T.perfect}</span>` : ""}` : "";
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
