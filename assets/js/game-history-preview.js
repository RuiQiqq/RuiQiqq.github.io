(() => {
  const VERSION = "45";
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
    kicker: "游戏经历", title: "游戏经历",
    intro: "右侧只展示我手动选择的重点游戏，可包含 Steam、主机、手机与其他平台。点击下方按钮可查看完整全平台记录。",
    viewMain: "查看全平台完整游戏经历 →", viewSub: "Steam · Switch · PlayStation · 手机 · 其他平台",
    hours: "Steam 小时", perfect: "Steam 全成就", empty: "请在 Pages CMS 的游戏条目中勾选「首页重点游戏经历显示」。",
    previewTitle: "重点游戏", previewNote: "仅显示你手动勾选的游戏",
    steamOnlyNote: "下方数字仅统计 Steam；右侧重点游戏可包含所有平台。"
  } : {
    kicker: "Game History", title: "Game History",
    intro: "The games on the right are selected manually and can come from Steam, console, mobile, or other platforms. Use the button below for the complete all-platform record.",
    viewMain: "View Full All-Platform Game History →", viewSub: "Steam · Switch · PlayStation · Mobile · Other Platforms",
    hours: "Steam hours", perfect: "Steam perfect games", empty: "Select \"Show in homepage highlights\" on the game entries in Pages CMS.",
    previewTitle: "Featured Games", previewNote: "Only games you manually select are shown",
    steamOnlyNote: "The numbers below are Steam-only; featured games on the right may come from any platform."
  };

  function normalize(data, nameMap) {
    const manual = Array.isArray(data.manualGames) ? data.manualGames : [];
    const steam = Array.isArray(data.steamGames) ? data.steamGames : (Array.isArray(data.games) ? data.games : []);
    const withNames = (game, source, key) => {
      const mapped = nameMap[text(game.name)] || {};
      return {
        ...game,
        nameEn: text(game.nameEn) || text(mapped.en),
        nameZh: text(game.nameZh) || text(mapped.zh),
        _source: source,
        _key: key
      };
    };
    return [
      ...manual.map((game, index) => withNames(game, "manual", `m-${index}`)),
      ...steam.map((game, index) => withNames(game, "steam", `s-${game.steamAppId ?? index}`))
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

  function platformLabel(game) {
    if (game._source === "steam") return "Steam";
    const platform = text(game.platform);
    if (!platform) return lang === "zh" ? "其他平台" : "Other";
    if (lang === "zh" && platform === "Mobile") return "手机";
    if (lang === "zh" && platform === "PC / Other") return "PC / 其他";
    return platform;
  }

  function statusLabel(game) {
    const labels = lang === "zh" ? {
      completed: "通关", multiple: "多周目通关", main_complete: "主线完成",
      playing: "持续游玩", unfinished: "未通关", sampled: "试玩"
    } : {
      completed: "Completed", multiple: "Multiple clears", main_complete: "Main story complete",
      playing: "Ongoing", unfinished: "Not completed", sampled: "Sampled"
    };
    return labels[text(game.status)] || "";
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
      const settings = data.settings || {};
      const threshold = Math.max(0, num(settings.highlightHours) || 100);
      const statsGames = games.filter(game => num(game.playtimeHours) >= MIN_VISIBLE_HOURS);
      const steamGames = statsGames.filter(game => game._source === "steam");
      const totalHours = steamGames.reduce((sum, game) => sum + num(game.playtimeHours), 0);
      const perfectCount = steamGames.filter(perfect).length;

      $("#home-game-preview-stats").innerHTML = steamGames.length ? `
        <span><strong>${Math.round(totalHours).toLocaleString()}</strong> ${T.hours}</span>
        ${perfectCount ? `<span><strong>${perfectCount}</strong> ${T.perfect}</span>` : ""}` : "";

      const customTitle = text(settings.homeHighlightTitle);
      const customTitleNode = $("#home-game-highlight-title");
      if (customTitleNode) {
        customTitleNode.textContent = customTitle;
        customTitleNode.hidden = !customTitle;
      }

      const selected = games
        .filter(game => game.homeFeatured === true)
        .slice()
        .sort((a, b) => score(b, threshold) - score(a, threshold) || currentName(a).localeCompare(currentName(b)));

      const list = $("#home-game-preview-games");
      if (!selected.length) {
        list.innerHTML = `<div class="home-game-preview-empty">${escapeHtml(T.empty)}</div>`;
        return;
      }
      list.innerHTML = selected.map(game => {
        const perfectLabel = perfect(game) ? (lang === "zh" ? "全成就" : "100%") : "";
        const status = statusLabel(game);
        const meta = [platformLabel(game), formatHours(game.playtimeHours), perfectLabel || status].filter(Boolean).join(" · ");
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
