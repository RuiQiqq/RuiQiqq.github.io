(function () {
  "use strict";

  const VERSION = "32";
  const LANGUAGE_KEY = "ruiqi-portfolio-language";

  const UI = {
    en: {
      navProjects: "Projects",
      navGames: "Games Played",
      navResume: "Resume",
      navContact: "Contact",
      kicker: "Game History",
      title: "Games Played",
      steamProfile: "Open Steam Profile",
      featuredKicker: "Highlighted Play History",
      featuredTitle: "High-playtime & 100% games",
      featuredIntro: "Games are highlighted automatically when they pass the playtime threshold or reach 100% achievements. You can also pin a game manually.",
      allKicker: "Full Record",
      allTitle: "All listed games",
      allIntro: "Search, filter, and sort a large game history without turning the page into hundreds of oversized cards.",
      searchLabel: "Search",
      searchPlaceholder: "Search games",
      statusLabel: "Status",
      platformLabel: "Platform",
      sortLabel: "Sort",
      colGame: "Game",
      colPlatform: "Platform",
      colTime: "Playtime",
      colStatus: "Completion",
      colAchievements: "Achievements",
      all: "All",
      sortFeatured: "Highlights first",
      sortHours: "Playtime ↓",
      sortCompletion: "Completion ↓",
      sortName: "Name A–Z",
      statusPlaying: "Currently playing",
      statusCompleted: "Completed",
      statusMultiple: "Multiple playthroughs",
      statusMainComplete: "Main story complete",
      statusSampled: "Sampled / short-term",
      statusUnfinished: "Not completed",
      statusUnknown: "Not specified",
      hours: "h",
      unknownTime: "—",
      perfect: "100% Achievements",
      achievements: "Achievements",
      playthroughs: "playthroughs",
      onePlaythrough: "playthrough",
      designNote: "Design note",
      listedGames: "Games listed",
      knownHours: "Known hours",
      completedGames: "Completed",
      perfectGames: "100% games",
      noGamesTitle: "No game records yet",
      noGamesText: "The page is ready. Import the Steam library in bulk, then add console, mobile, or other games manually in Pages CMS.",
      noResults: "No games match the current filters.",
      backPortfolio: "Back to Portfolio"
    },
    zh: {
      navProjects: "项目",
      navGames: "游戏经历",
      navResume: "简历",
      navContact: "联系",
      kicker: "个人游戏经历",
      title: "游戏经历",
      steamProfile: "查看 Steam 主页",
      featuredKicker: "重点游戏经历",
      featuredTitle: "高时长与全成就游戏",
      featuredIntro: "达到设定时长或完成 100% 成就的游戏会自动进入重点区域，也可以手动置顶。",
      allKicker: "完整记录",
      allTitle: "全部游戏记录",
      allIntro: "通过搜索、筛选和排序展示大量游戏，不把页面做成几百张巨大卡片。",
      searchLabel: "搜索",
      searchPlaceholder: "搜索游戏名称",
      statusLabel: "完成状态",
      platformLabel: "平台",
      sortLabel: "排序",
      colGame: "游戏",
      colPlatform: "平台",
      colTime: "时长",
      colStatus: "完成情况",
      colAchievements: "成就",
      all: "全部",
      sortFeatured: "重点优先",
      sortHours: "游玩时长 ↓",
      sortCompletion: "完成度 ↓",
      sortName: "名称 A–Z",
      statusPlaying: "持续游玩",
      statusCompleted: "通关",
      statusMultiple: "多周目通关",
      statusMainComplete: "主线完成",
      statusSampled: "试玩 / 短期体验",
      statusUnfinished: "未通关",
      statusUnknown: "未填写",
      hours: "小时",
      unknownTime: "—",
      perfect: "100% 全成就",
      achievements: "成就",
      playthroughs: "周目",
      onePlaythrough: "周目",
      designNote: "设计观察",
      listedGames: "记录游戏",
      knownHours: "已知总时长",
      completedGames: "已通关",
      perfectGames: "全成就",
      noGamesTitle: "游戏记录还没有导入",
      noGamesText: "页面结构已经准备好。Steam 游戏可以批量导入，主机、手游和其他平台游戏再在 Pages CMS 中手动补充即可。",
      noResults: "当前筛选条件下没有游戏。",
      backPortfolio: "返回作品集"
    }
  };

  function getLanguage() {
    const requested = new URLSearchParams(location.search).get("lang");
    if (requested === "en" || requested === "zh") {
      try { localStorage.setItem(LANGUAGE_KEY, requested); } catch (error) {}
      return requested;
    }
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      if (saved === "en" || saved === "zh") return saved;
    } catch (error) {}
    const languages = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    return languages.some(value => String(value).toLowerCase().startsWith("zh")) ? "zh" : "en";
  }

  const lang = getLanguage();
  const T = UI[lang];
  let DATA = { settings: {}, games: [] };
  let allGames = [];

  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function num(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function meaningful(value) {
    return String(value ?? "").trim();
  }

  function currentName(game) {
    if (lang === "zh" && meaningful(game.nameZh)) return game.nameZh;
    return meaningful(game.name) || meaningful(game.nameZh) || "Untitled";
  }

  function statusText(status) {
    const map = {
      playing: T.statusPlaying,
      completed: T.statusCompleted,
      multiple: T.statusMultiple,
      main_complete: T.statusMainComplete,
      sampled: T.statusSampled,
      unfinished: T.statusUnfinished
    };
    return map[status] || T.statusUnknown;
  }

  function isPerfect(game) {
    if (game.perfect === true) return true;
    const total = num(game.achievementsTotal);
    return total > 0 && num(game.achievementsUnlocked) >= total;
  }

  function completionPercent(game) {
    const total = num(game.achievementsTotal);
    if (total > 0) return Math.min(100, Math.round((num(game.achievementsUnlocked) / total) * 100));
    const status = game.status;
    if (status === "multiple" || status === "completed" || status === "main_complete") return 100;
    if (status === "playing") return 55;
    if (status === "sampled") return 20;
    return 0;
  }

  function completed(game) {
    return isPerfect(game) || ["multiple", "completed", "main_complete"].includes(game.status);
  }

  function highlightThreshold() {
    return Math.max(1, num(DATA.settings?.highlightHours) || 100);
  }

  function isHighlighted(game) {
    return Boolean(game.featured) || isPerfect(game) || num(game.playtimeHours) >= highlightThreshold();
  }

  function highlightScore(game) {
    return (game.featured ? 1000000 : 0) + (isPerfect(game) ? 500000 : 0) + (completed(game) ? 100000 : 0) + num(game.playtimeHours) * 100 + completionPercent(game);
  }

  function formatHours(hours) {
    const value = num(hours);
    if (!value) return T.unknownTime;
    const formatted = Number.isInteger(value) ? value.toLocaleString() : value.toLocaleString(undefined, { maximumFractionDigits: 1 });
    return lang === "zh" ? `${formatted} ${T.hours}` : `${formatted}${T.hours}`;
  }

  function achievementText(game) {
    const total = num(game.achievementsTotal);
    if (!total) return T.unknownTime;
    const unlocked = Math.min(num(game.achievementsUnlocked), total);
    const percent = Math.round((unlocked / total) * 100);
    return `${unlocked}/${total} · ${percent}%`;
  }

  function playthroughText(game) {
    const count = num(game.playthroughs);
    if (!count) return "";
    if (lang === "zh") return `${count} ${T.playthroughs}`;
    return `${count} ${count === 1 ? T.onePlaythrough : T.playthroughs}`;
  }

  function noteText(game) {
    return meaningful(lang === "zh" ? game.designNoteZh : game.designNoteEn);
  }

  function platformText(game) {
    if (Array.isArray(game.platforms)) return game.platforms.filter(Boolean).join(" / ");
    return meaningful(game.platform) || meaningful(game.source) || "—";
  }

  function genreText(game) {
    if (Array.isArray(game.genres)) return game.genres.filter(Boolean).join(" · ");
    return meaningful(game.genre);
  }

  function setLanguage(next) {
    if (next !== "en" && next !== "zh") return;
    try { localStorage.setItem(LANGUAGE_KEY, next); } catch (error) {}
    const url = new URL(location.href);
    url.searchParams.set("lang", next);
    location.href = url.toString();
  }

  function localizeLink(href) {
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
    try {
      const url = new URL(href, location.href);
      url.searchParams.set("lang", lang);
      return `${url.pathname.split("/").pop() || "index.html"}${url.search}${url.hash}`;
    } catch (error) {
      return href;
    }
  }

  function applyLanguage() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.body.classList.toggle("lang-zh", lang === "zh");
    $$('[data-game-i18n]').forEach(element => {
      const key = element.dataset.gameI18n;
      if (T[key]) element.textContent = T[key];
    });
    $$('[data-game-placeholder]').forEach(element => {
      const key = element.dataset.gamePlaceholder;
      if (T[key]) element.setAttribute("placeholder", T[key]);
    });
    $$('[data-language-choice]').forEach(button => {
      const active = button.dataset.languageChoice === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
      button.addEventListener("click", () => setLanguage(button.dataset.languageChoice));
    });
    $$('a[href]').forEach(anchor => {
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || /^(https?:|mailto:|tel:)/i.test(href)) return;
      anchor.setAttribute("href", localizeLink(href));
    });
  }

  function renderSource() {
    const settings = DATA.settings || {};
    $("#games-intro").textContent = meaningful(lang === "zh" ? settings.introZh : settings.introEn);
    $("#games-source-note").textContent = meaningful(lang === "zh" ? settings.steamNoteZh : settings.steamNoteEn);
    const url = meaningful(settings.steamProfileUrl);
    $("#games-source-actions").innerHTML = url ? `<a class="button primary" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(T.steamProfile)}</a>` : "";
  }

  function renderStats() {
    const knownHours = allGames.reduce((sum, game) => sum + num(game.playtimeHours), 0);
    const completedCount = allGames.filter(completed).length;
    const perfectCount = allGames.filter(isPerfect).length;
    const stats = [
      [allGames.length.toLocaleString(), T.listedGames],
      [knownHours ? Math.round(knownHours).toLocaleString() : "0", T.knownHours],
      [completedCount.toLocaleString(), T.completedGames],
      [perfectCount.toLocaleString(), T.perfectGames]
    ];
    $("#games-stats").innerHTML = stats.map(([value, label]) => `<div class="game-stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`).join("");
  }

  function badgesHtml(game) {
    const badges = [];
    if (isPerfect(game)) badges.push(`<span class="game-badge game-badge--perfect">${escapeHtml(T.perfect)}</span>`);
    if (num(game.playtimeHours) >= highlightThreshold()) badges.push(`<span class="game-badge game-badge--hours">${escapeHtml(formatHours(game.playtimeHours))}</span>`);
    const playthroughs = playthroughText(game);
    if (playthroughs) badges.push(`<span class="game-badge">${escapeHtml(playthroughs)}</span>`);
    return badges.join("");
  }

  function renderFeatured() {
    const limit = Math.max(1, num(DATA.settings?.featuredLimit) || 18);
    const highlighted = allGames.filter(isHighlighted).sort((a, b) => highlightScore(b) - highlightScore(a)).slice(0, limit);
    const section = $("#games-featured-section");
    if (!highlighted.length) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    $("#game-featured-grid").innerHTML = highlighted.map(game => {
      const note = noteText(game);
      const genres = genreText(game);
      return `<article class="game-featured-card${isPerfect(game) ? " is-perfect" : ""}">
        <div class="game-featured-topline">
          <span class="game-platform-chip">${escapeHtml(platformText(game))}</span>
          <span class="game-featured-hours">${escapeHtml(formatHours(game.playtimeHours))}</span>
        </div>
        <h3>${escapeHtml(currentName(game))}</h3>
        ${meaningful(game.nameZh) && lang === "en" ? `<p class="game-alt-name">${escapeHtml(game.nameZh)}</p>` : ""}
        <div class="game-badges">${badgesHtml(game)}</div>
        <div class="game-featured-meta">
          <span>${escapeHtml(statusText(game.status))}</span>
          ${num(game.achievementsTotal) ? `<span>${escapeHtml(achievementText(game))}</span>` : ""}
          ${genres ? `<span>${escapeHtml(genres)}</span>` : ""}
        </div>
        ${note ? `<div class="game-design-note"><strong>${escapeHtml(T.designNote)}</strong><p>${escapeHtml(note)}</p></div>` : ""}
      </article>`;
    }).join("");
  }

  function buildControls() {
    const statusOptions = [
      ["all", T.all],
      ["perfect", T.perfect],
      ["completed", T.statusCompleted],
      ["multiple", T.statusMultiple],
      ["playing", T.statusPlaying],
      ["main_complete", T.statusMainComplete],
      ["unfinished", T.statusUnfinished],
      ["sampled", T.statusSampled]
    ];
    $("#game-status-filter").innerHTML = statusOptions.map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`).join("");

    const platforms = [...new Set(allGames.flatMap(game => {
      if (Array.isArray(game.platforms)) return game.platforms;
      const value = platformText(game);
      return value === "—" ? [] : value.split("/").map(item => item.trim());
    }).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    $("#game-platform-filter").innerHTML = `<option value="all">${escapeHtml(T.all)}</option>${platforms.map(platform => `<option value="${escapeHtml(platform)}">${escapeHtml(platform)}</option>`).join("")}`;

    const sortOptions = [
      ["featured", T.sortFeatured],
      ["hours", T.sortHours],
      ["completion", T.sortCompletion],
      ["name", T.sortName]
    ];
    $("#game-sort").innerHTML = sortOptions.map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`).join("");

    [$("#game-search"), $("#game-status-filter"), $("#game-platform-filter"), $("#game-sort")].forEach(control => {
      control.addEventListener(control.tagName === "INPUT" ? "input" : "change", renderList);
    });
  }

  function statusMatches(game, filter) {
    if (filter === "all") return true;
    if (filter === "perfect") return isPerfect(game);
    if (filter === "completed") return completed(game);
    return game.status === filter;
  }

  function renderList() {
    const query = meaningful($("#game-search").value).toLocaleLowerCase();
    const status = $("#game-status-filter").value;
    const platform = $("#game-platform-filter").value;
    const sort = $("#game-sort").value;

    let games = allGames.filter(game => {
      const haystack = [currentName(game), game.name, game.nameZh, platformText(game), genreText(game), noteText(game)].join(" ").toLocaleLowerCase();
      const platformValues = Array.isArray(game.platforms) ? game.platforms : [platformText(game)];
      return (!query || haystack.includes(query)) && statusMatches(game, status) && (platform === "all" || platformValues.some(value => String(value).trim() === platform));
    });

    games.sort((a, b) => {
      if (sort === "hours") return num(b.playtimeHours) - num(a.playtimeHours) || currentName(a).localeCompare(currentName(b));
      if (sort === "completion") return completionPercent(b) - completionPercent(a) || num(b.playtimeHours) - num(a.playtimeHours);
      if (sort === "name") return currentName(a).localeCompare(currentName(b));
      return highlightScore(b) - highlightScore(a) || currentName(a).localeCompare(currentName(b));
    });

    const list = $("#game-list");
    const empty = $("#game-empty");
    if (!allGames.length) {
      list.innerHTML = "";
      empty.hidden = false;
      empty.innerHTML = `<strong>${escapeHtml(T.noGamesTitle)}</strong><p>${escapeHtml(T.noGamesText)}</p>`;
      return;
    }
    if (!games.length) {
      list.innerHTML = "";
      empty.hidden = false;
      empty.textContent = T.noResults;
      return;
    }
    empty.hidden = true;

    list.innerHTML = games.map(game => {
      const note = noteText(game);
      const genres = genreText(game);
      const perfectClass = isPerfect(game) ? " is-perfect" : "";
      const highlightClass = isHighlighted(game) ? " is-highlighted" : "";
      return `<article class="game-row${perfectClass}${highlightClass}">
        <div class="game-row-name">
          <strong>${escapeHtml(currentName(game))}</strong>
          ${meaningful(game.nameZh) && lang === "en" ? `<span class="game-alt-name">${escapeHtml(game.nameZh)}</span>` : ""}
          ${genres ? `<span class="game-row-genre">${escapeHtml(genres)}</span>` : ""}
          ${note ? `<p>${escapeHtml(note)}</p>` : ""}
        </div>
        <div class="game-row-cell" data-label="${escapeHtml(T.colPlatform)}">${escapeHtml(platformText(game))}</div>
        <div class="game-row-cell game-row-hours" data-label="${escapeHtml(T.colTime)}">${escapeHtml(formatHours(game.playtimeHours))}</div>
        <div class="game-row-cell" data-label="${escapeHtml(T.colStatus)}"><span>${escapeHtml(statusText(game.status))}</span>${playthroughText(game) ? `<small>${escapeHtml(playthroughText(game))}</small>` : ""}</div>
        <div class="game-row-cell" data-label="${escapeHtml(T.colAchievements)}">${isPerfect(game) ? `<span class="game-perfect-inline">${escapeHtml(T.perfect)}</span>` : escapeHtml(achievementText(game))}</div>
      </article>`;
    }).join("");
  }

  async function init() {
    applyLanguage();
    $("#year").textContent = new Date().getFullYear();
    try {
      const response = await fetch(`content/game-history.json?v=${VERSION}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      DATA = await response.json();
    } catch (error) {
      console.error("Game history could not be loaded:", error);
      DATA = { settings: {}, games: [] };
    }
    allGames = Array.isArray(DATA.games) ? DATA.games.filter(game => game && game.hidden !== true && (meaningful(game.name) || meaningful(game.nameZh))) : [];
    renderSource();
    renderStats();
    renderFeatured();
    buildControls();
    renderList();
    document.title = `${T.title} | Rui Qi`;
  }

  init();
})();
