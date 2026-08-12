(() => {
  const VERSION = "43";
  const MIN_VISIBLE_HOURS = 3;
  const LANGUAGE_KEY = "ruiqi-portfolio-language";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const num = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
  const meaningful = (value) => String(value ?? "").trim();
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const TEXT = {
    en: {
      navProjects: "Projects", navResume: "Resume", navContact: "Contact",
      kicker: "All-Platform Game History", title: "All-Platform Games",
      steamProfile: "Open Steam Profile",
      featuredKicker: "Highlighted Across Platforms", featuredTitle: "Highlighted games",
      featuredIntro: "High-playtime, 100% achievement, and manually pinned games are surfaced here automatically.",
      allKicker: "Full All-Platform Record", allTitle: "All games across platforms",
      allIntro: "Search, filter, and sort the full record. Steam imports are stored locally, so edits remain under my control.",
      searchLabel: "Search", searchPlaceholder: "Search games", statusLabel: "Status", platformLabel: "Platform", sortLabel: "Sort",
      colGame: "Game", colPlatform: "Platform", colTime: "Playtime", colStatus: "Completion", colAchievements: "Achievements",
      backPortfolio: "Back to Portfolio", all: "All", perfect: "100% Achievements",
      statusPlaying: "Playing", statusCompleted: "Completed", statusMultiple: "Multiple Playthroughs", statusMainComplete: "Main Story Complete", statusSampled: "Sampled", statusUnfinished: "Unfinished", statusUnknown: "—",
      sortFeatured: "Highlighted first", sortHours: "Playtime ↓", sortCompletion: "Completion ↓", sortName: "Name A–Z",
      statGames: "Games", statHours: "Known hours", statCompleted: "Completed", statPerfect: "100% games",
      nonSteam: "Non-Steam", unknownPlatform: "—", noAchievements: "—", designNote: "Design note",
      playthrough: "playthrough", playthroughs: "playthroughs",
      emptyTitle: "No matching games", emptyText: "Try another filter, or add/import games from Pages CMS."
    },
    zh: {
      navProjects: "项目", navResume: "简历", navContact: "联系",
      kicker: "游戏经历 · 全平台", title: "全平台游戏经历",
      steamProfile: "查看 Steam 主页",
      featuredKicker: "全平台重点游戏", featuredTitle: "重点游戏经历",
      featuredIntro: "高时长、100% 全成就和手动重点游戏会自动集中展示在这里。",
      allKicker: "全平台完整记录", allTitle: "所有平台游戏记录",
      allIntro: "可以搜索、筛选和排序完整记录。Steam 导入后会保存成本地数据，因此时长、状态和展示内容都可以继续修改。",
      searchLabel: "搜索", searchPlaceholder: "搜索游戏", statusLabel: "状态", platformLabel: "平台", sortLabel: "排序",
      colGame: "游戏", colPlatform: "平台", colTime: "时长", colStatus: "完成情况", colAchievements: "成就",
      backPortfolio: "返回作品集", all: "全部", perfect: "100% 全成就",
      statusPlaying: "持续游玩", statusCompleted: "通关", statusMultiple: "多周目通关", statusMainComplete: "主线完成", statusSampled: "试玩／短期体验", statusUnfinished: "未通关", statusUnknown: "—",
      sortFeatured: "重点优先", sortHours: "游玩时长 ↓", sortCompletion: "完成度 ↓", sortName: "名称 A–Z",
      statGames: "游戏记录", statHours: "已知总时长", statCompleted: "已通关", statPerfect: "全成就",
      nonSteam: "非 Steam", unknownPlatform: "—", noAchievements: "—", designNote: "设计观察",
      playthrough: "周目", playthroughs: "周目",
      emptyTitle: "没有符合条件的游戏", emptyText: "可以换一个筛选条件，或在 Pages CMS 中添加／导入游戏。"
    }
  };

  function language() {
    const query = new URLSearchParams(location.search).get("lang");
    if (query === "zh" || query === "en") {
      try { localStorage.setItem(LANGUAGE_KEY, query); } catch (_) {}
      return query;
    }
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      if (saved === "zh" || saved === "en") return saved;
    } catch (_) {}
    const langs = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    return langs.some(item => String(item).toLowerCase().startsWith("zh")) ? "zh" : "en";
  }

  let lang = language();
  let T = TEXT[lang];
  let DATA = { settings: {}, manualGames: [], steamGames: [] };
  let NAME_MAP = {};
  let allGames = [];

  function setLanguage(next) {
    if (next !== "zh" && next !== "en") return;
    try { localStorage.setItem(LANGUAGE_KEY, next); } catch (_) {}
    const url = new URL(location.href);
    url.searchParams.set("lang", next);
    location.href = url.toString();
  }

  function normalizeGames(data) {
    const manual = Array.isArray(data.manualGames) ? data.manualGames : [];
    const steam = Array.isArray(data.steamGames) ? data.steamGames : (Array.isArray(data.games) ? data.games : []);
    const manualNormalized = manual.filter(item => item && meaningful(item.name)).map((item, index) => {
      const mapped = NAME_MAP[meaningful(item.name)] || {};
      return {
        ...item,
        nameEn: meaningful(item.nameEn) || meaningful(mapped.en),
        nameZh: meaningful(item.nameZh) || meaningful(mapped.zh),
        _source: "manual",
        _key: `manual-${index}-${meaningful(item.name)}`,
        platforms: item.platforms?.length ? item.platforms : (meaningful(item.platform) ? [meaningful(item.platform)] : [T.nonSteam]),
        hidden: Boolean(item.hidden)
      };
    });
    const steamNormalized = steam.filter(item => item && meaningful(item.name)).map((item, index) => ({
      ...item,
      _source: "steam",
      _key: `steam-${item.steamAppId ?? index}`,
      platforms: item.platforms?.length ? item.platforms : ["Steam"],
      hidden: Boolean(item.hidden)
    }));
    return [...manualNormalized, ...steamNormalized].filter(game => !game.hidden && num(game.playtimeHours) >= MIN_VISIBLE_HOURS);
  }

  function currentName(game) {
    if (lang === "zh" && meaningful(game.nameZh)) return meaningful(game.nameZh);
    if (lang === "en" && meaningful(game.nameEn)) return meaningful(game.nameEn);
    return meaningful(game.name) || meaningful(game.nameZh) || "Untitled";
  }

  function platformText(game) {
    const list = Array.isArray(game.platforms) ? game.platforms.filter(Boolean) : [];
    return list.length ? list.join(" / ") : (game._source === "manual" ? T.nonSteam : T.unknownPlatform);
  }

  function formatHours(value) {
    const hours = num(value);
    if (!hours) return "—";
    const rounded = Math.abs(hours - Math.round(hours)) < 0.05 ? String(Math.round(hours)) : hours.toFixed(1);
    return `${rounded}h`;
  }

  function isPerfect(game) {
    if (game.perfect === true) return true;
    const unlocked = num(game.achievementsUnlocked);
    const total = num(game.achievementsTotal);
    return total > 0 && unlocked >= total;
  }

  function completed(game) {
    return ["completed", "multiple", "main_complete"].includes(game.status);
  }

  function statusText(status) {
    return ({
      playing: T.statusPlaying,
      completed: T.statusCompleted,
      multiple: T.statusMultiple,
      main_complete: T.statusMainComplete,
      sampled: T.statusSampled,
      unfinished: T.statusUnfinished
    })[status] || T.statusUnknown;
  }

  function playthroughText(game) {
    const count = num(game.playthroughs);
    if (!count) return "";
    return lang === "zh" ? `${count} ${T.playthroughs}` : `${count} ${count === 1 ? T.playthrough : T.playthroughs}`;
  }

  function achievementText(game) {
    const unlocked = num(game.achievementsUnlocked);
    const total = num(game.achievementsTotal);
    if (!total) return T.noAchievements;
    return `${unlocked}/${total}${isPerfect(game) ? " · 100%" : ""}`;
  }

  function completionScore(game) {
    if (isPerfect(game)) return 1000000;
    if (game.status === "multiple") return 900000;
    if (game.status === "completed") return 800000;
    if (game.status === "main_complete") return 700000;
    const total = num(game.achievementsTotal);
    return total ? Math.round((num(game.achievementsUnlocked) / total) * 10000) : 0;
  }

  function threshold() { return Math.max(0, num(DATA.settings?.highlightHours) || 100); }
  function highlighted(game) { return Boolean(game.featured) || isPerfect(game) || num(game.playtimeHours) >= threshold(); }
  function highlightScore(game) {
    return (game.featured ? 2e9 : 0) + (isPerfect(game) ? 1e9 : 0) + num(game.playtimeHours) * 1000 + completionScore(game);
  }
  function genreText(game) { return Array.isArray(game.genres) ? game.genres.filter(Boolean).join(" · ") : ""; }
  function noteText(game) { return lang === "zh" ? meaningful(game.designNoteZh) : meaningful(game.designNoteEn); }

  function applyStaticText() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.documentElement.classList.toggle("lang-zh", lang === "zh");
    $$('[data-game-i18n]').forEach(node => {
      const key = node.dataset.gameI18n;
      if (T[key]) node.textContent = T[key];
    });
    $$('[data-game-placeholder]').forEach(node => {
      const key = node.dataset.gamePlaceholder;
      if (T[key]) node.placeholder = T[key];
    });
    $$('[data-language-choice]').forEach(button => {
      const active = button.dataset.languageChoice === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
      button.addEventListener("click", () => setLanguage(button.dataset.languageChoice));
    });
    const titleName = lang === "zh" ? "祁睿" : "Rui Qi";
    document.title = `${T.title} | ${titleName}`;
  }

  function renderHero() {
    const settings = DATA.settings || {};
    $("#games-intro").textContent = lang === "zh" ? meaningful(settings.introZh) : meaningful(settings.introEn);
    $("#games-source-note").textContent = lang === "zh" ? meaningful(settings.steamNoteZh) : meaningful(settings.steamNoteEn);
    const url = meaningful(settings.steamProfileUrl);
    $("#games-source-actions").innerHTML = url ? `<a class="button secondary" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(T.steamProfile)}</a>` : "";

    const totalHours = allGames.reduce((sum, game) => sum + num(game.playtimeHours), 0);
    const stats = [
      [allGames.length, T.statGames],
      [totalHours ? `${Math.round(totalHours).toLocaleString()}h` : "—", T.statHours],
      [allGames.filter(completed).length, T.statCompleted],
      [allGames.filter(isPerfect).length, T.statPerfect]
    ];
    $("#games-stats").innerHTML = stats.map(([value, label]) => `<div class="game-stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`).join("");
  }

  function badgesHtml(game) {
    const badges = [];
    if (isPerfect(game)) badges.push(`<span class="game-badge game-badge--perfect">${escapeHtml(T.perfect)}</span>`);
    if (num(game.playtimeHours) >= threshold()) badges.push(`<span class="game-badge game-badge--hours">${escapeHtml(formatHours(game.playtimeHours))}</span>`);
    const playthroughs = playthroughText(game);
    if (playthroughs) badges.push(`<span class="game-badge">${escapeHtml(playthroughs)}</span>`);
    return badges.join("");
  }

  function renderFeatured() {
    const section = $("#games-featured-section");
    const limit = Math.max(1, num(DATA.settings?.featuredLimit) || 18);
    const selected = allGames.filter(highlighted).sort((a, b) => highlightScore(b) - highlightScore(a)).slice(0, limit);
    if (!selected.length) { section.hidden = true; return; }
    section.hidden = false;
    $("#game-featured-grid").innerHTML = selected.map(game => {
      const status = statusText(game.status);
      const perfect = isPerfect(game);
      const meta = [platformText(game), formatHours(game.playtimeHours), perfect ? T.perfect : (status !== T.statusUnknown ? status : "")].filter(Boolean).join(" · ");
      return `<article class="game-featured-line${perfect ? " is-perfect" : ""}" title="${escapeHtml(currentName(game))}">
        <strong>${escapeHtml(currentName(game))}</strong>
        <span>${escapeHtml(meta)}</span>
      </article>`;
    }).join("");
  }

  function buildControls() {
    const statuses = [
      ["all", T.all], ["perfect", T.perfect], ["completed", T.statusCompleted], ["multiple", T.statusMultiple],
      ["playing", T.statusPlaying], ["main_complete", T.statusMainComplete], ["unfinished", T.statusUnfinished], ["sampled", T.statusSampled]
    ];
    $("#game-status-filter").innerHTML = statuses.map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`).join("");
    const platforms = [...new Set(allGames.flatMap(game => (Array.isArray(game.platforms) ? game.platforms : []).filter(Boolean)))].sort((a,b)=>a.localeCompare(b));
    $("#game-platform-filter").innerHTML = `<option value="all">${escapeHtml(T.all)}</option>${platforms.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
    $("#game-sort").innerHTML = [["featured",T.sortFeatured],["hours",T.sortHours],["completion",T.sortCompletion],["name",T.sortName]].map(([v,l])=>`<option value="${v}">${escapeHtml(l)}</option>`).join("");
    [$("#game-search"), $("#game-status-filter"), $("#game-platform-filter"), $("#game-sort")].forEach(control => control.addEventListener(control.tagName === "INPUT" ? "input" : "change", renderList));
  }

  function statusMatches(game, filter) {
    if (filter === "all") return true;
    if (filter === "perfect") return isPerfect(game);
    if (filter === "completed") return completed(game);
    return game.status === filter;
  }

  function renderList() {
    const query = meaningful($("#game-search").value).toLowerCase();
    const status = $("#game-status-filter").value;
    const platform = $("#game-platform-filter").value;
    const sort = $("#game-sort").value;
    let games = allGames.filter(game => {
      const haystack = [currentName(game), game.name, game.nameZh, genreText(game), platformText(game)].map(meaningful).join(" ").toLowerCase();
      const platformOk = platform === "all" || (Array.isArray(game.platforms) && game.platforms.includes(platform));
      return (!query || haystack.includes(query)) && statusMatches(game, status) && platformOk;
    });
    games.sort((a,b) => {
      if (sort === "hours") return num(b.playtimeHours) - num(a.playtimeHours) || currentName(a).localeCompare(currentName(b));
      if (sort === "completion") return completionScore(b) - completionScore(a) || num(b.playtimeHours) - num(a.playtimeHours);
      if (sort === "name") return currentName(a).localeCompare(currentName(b));
      return highlightScore(b) - highlightScore(a) || currentName(a).localeCompare(currentName(b));
    });

    const list = $("#game-list");
    const empty = $("#game-empty");
    if (!games.length) {
      list.innerHTML = "";
      empty.hidden = false;
      empty.innerHTML = `<strong>${escapeHtml(T.emptyTitle)}</strong><p>${escapeHtml(T.emptyText)}</p>`;
      return;
    }
    empty.hidden = true;
    list.innerHTML = games.map(game => {
      const badges = [];
      if (isPerfect(game)) badges.push(`<span class="game-perfect-inline">100%</span>`);
      const playthroughs = playthroughText(game);
      return `<article class="game-row${highlighted(game) ? " is-highlighted" : ""}${isPerfect(game) ? " is-perfect" : ""}">
        <div class="game-row-name" title="${escapeHtml(currentName(game))}"><strong>${escapeHtml(currentName(game))}</strong></div>
        <div class="game-row-cell" data-label="${escapeHtml(T.colPlatform)}">${escapeHtml(platformText(game))}</div>
        <div class="game-row-cell game-row-hours" data-label="${escapeHtml(T.colTime)}">${escapeHtml(formatHours(game.playtimeHours))}</div>
        <div class="game-row-cell" data-label="${escapeHtml(T.colStatus)}">${escapeHtml(statusText(game.status))}${playthroughs ? ` · ${escapeHtml(playthroughs)}` : ""}</div>
        <div class="game-row-cell" data-label="${escapeHtml(T.colAchievements)}">${badges.join("")} ${escapeHtml(achievementText(game))}</div>
      </article>`;
    }).join("");
  }

  async function init() {
    applyStaticText();
    $("#year").textContent = new Date().getFullYear();
    try {
      const [historyResponse, mapResponse] = await Promise.all([
        fetch(`content/game-history.json?v=${VERSION}`, { cache: "no-store" }),
        fetch(`content/game-name-map.json?v=${VERSION}`, { cache: "no-store" })
      ]);
      if (!historyResponse.ok) throw new Error(`HTTP ${historyResponse.status}`);
      DATA = await historyResponse.json();
      if (mapResponse.ok) {
        const mapping = await mapResponse.json();
        NAME_MAP = mapping && typeof mapping.names === "object" ? mapping.names : {};
      }
      allGames = normalizeGames(DATA);
      renderHero();
      renderFeatured();
      buildControls();
      renderList();
    } catch (error) {
      console.error("Game history could not be loaded", error);
      $("#game-empty").hidden = false;
      $("#game-empty").innerHTML = `<strong>Game history failed to load</strong><p>${escapeHtml(String(error.message || error))}</p>`;
    }
  }

  init();
})();
