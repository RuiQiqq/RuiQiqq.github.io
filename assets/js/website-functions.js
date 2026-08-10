/*
  Website behavior and bilingual switching.
  You normally do not need to edit this file.
  Edit portfolio content through Pages CMS. Data is stored in content/portfolio-en.json and content/portfolio-zh.json.
*/

const LANGUAGE_KEY = "ruiqi-portfolio-language";

const UI = {
  en: {
    navProjects: "Projects",
    navResume: "Resume",
    navContact: "Contact",
    viewProjects: "View Projects",
    downloadResume: "Download Resume",
    selectedWork: "Selected Work",
    featuredProjects: "Featured Projects",
    featuredIntro: "Selected projects that best represent my gameplay design, systems thinking, level work, and in-engine iteration.",
    focusKicker: "Design Focus",
    focusTitle: "What I Do",
    focusIntro: "Clear categories help interviewers understand my direction quickly without reading every project page.",
    libraryKicker: "Project Library",
    libraryTitle: "Other work and experiments.",
    libraryIntro: "Commercial work, VR prototypes, tools, VFX, and visual studies are grouped here without overwhelming the featured section.",
    openLibrary: "Open Full Project Library",
    resumeKicker: "Resume",
    resumeTitle: "Resume preview and download.",
    resumeText: "The PDF is displayed here for quick review. You can also open it in a separate page or download it directly.",
    downloadPdf: "Download PDF",
    openResumePage: "Open Resume Page",
    resumeFallback: "If the preview does not load, use the Download PDF button. Upload the English resume as <strong>assets/resume/Rui_Qi_Resume_EN.pdf</strong>.",
    resumeMissingTitle: "Resume PDF not uploaded yet",
    resumeMissingText: "Upload the English resume to assets/resume/Rui_Qi_Resume_EN.pdf. The preview and download buttons will become available automatically.",
    resumeUnavailable: "Resume Not Uploaded",
    contactKicker: "Contact",
    contactTitle: "Interested in systems, prototypes, or gameplay feel?",
    footerRole: "Gameplay Design & Prototyping",
    projectsPageKicker: "Project Library",
    projectsPageTitle: "All Projects",
    projectsPageText: "Gameplay prototypes, commercial work, tools, VFX, level design, and visual studies collected in one place.",
    backHome: "Back to home",
    backProjects: "Back to projects",
    all: "All",
    role: "Role",
    tools: "Tools",
    category: "Category",
    projectBreakdown: "Project Breakdown",
    blueprintBreakdown: "System / Design Breakdown",
    systemPageKicker: "Project Breakdown",
    systemPageTitle: "System & Design Breakdown",
    systemPageIntro: "A flexible space for system screenshots, diagrams, level layouts, visual results, implementation notes, and design reasoning.",
    backProject: "Back to project",
    imagePlaceholder: "System screenshot / diagram / visual slot",
    openVideo: "Open Video",
    playHere: "Play here",
    loadingVideo: "Loading video…",
    details: "Details",
    openLink: "Open Link",
    downloadFile: "Download File",
    overview: "Overview",
    whatIBuilt: "What I Built",
    systemBreakdown: "System Breakdown",
    challenges: "Challenges & Improvements",
    workflowNotes: "Workflow Notes",
    mediaGallery: "Media Gallery",
    mediaGalleryIntro: "This project can contain multiple independent videos and images. Videos load only after the viewer clicks them.",
    assetsPending: "Assets pending",
    projectNotFound: "Project not found.",
    projectNotFoundText: "Please go back to the Projects page.",
    demoReel: "Demo Reel",
    montageTitle: "Project Montage",
    montageText: "30–60 second overview of gameplay systems, prototypes, and interaction work.",
    video: "Video",
    openDemoReel: "Open Demo Reel",
    montageSlot: "Project Montage Slot",
    montageSlotText: "This area is reserved for a 30–60 second project reel. Until then, it works as a quick portfolio snapshot.",
    placeholder: "Placeholder",
    futureMontage: "Future montage",
    montageTypes: "Gameplay / UI / Interaction",
    youtubeNote: "Add a YouTube link in Pages CMS under English Website Content.",
    email: "Email",
    resume: "Resume",
    github: "GitHub",
    linkedin: "LinkedIn",
    openProfile: "Open Profile",
    addLinkLater: "Add link later",
    contactDownloadPdf: "Download PDF",
    resumeViewerKicker: "Resume",
    resumeViewerTitle: "Resume Preview",
    resumeViewerText: "This page displays the English PDF directly and includes a download button.",
    backPortfolio: "Back to Portfolio",
    resumeContactKicker: "Resume & Contact",
    resumeContactText: "Gameplay designer focused on playable systems, level experiences, rapid prototypes, and readable player feedback.",
    skills: "Skills",
    relevantFocus: "Relevant focus.",
    resumeDownloadTitle: "Download PDF.",
    resumeDownloadText: "Upload the English resume to <code>assets/resume/Rui_Qi_Resume_EN.pdf</code>, then this button will open it.",
    reachMe: "Reach me here.",
    professionalLinks: "Only include professional links. Daily personal social media is better left out unless it shows game development work.",
    projects: "Projects"
  },
  zh: {
    navProjects: "项目",
    navResume: "简历",
    navContact: "联系",
    viewProjects: "查看项目",
    downloadResume: "下载中文简历",
    selectedWork: "精选作品",
    featuredProjects: "重点项目",
    featuredIntro: "这些项目集中展示了我的玩法设计、系统思考、关卡工作和引擎内迭代能力。",
    focusKicker: "设计方向",
    focusTitle: "我能做什么",
    focusIntro: "通过明确的分类，让招聘者无需阅读所有项目页面，也能快速理解我的方向。",
    libraryKicker: "项目库",
    libraryTitle: "其他作品与实验",
    libraryIntro: "商业项目、VR 原型、数据工具、VFX 与视觉练习集中展示在这里，不挤占重点项目。",
    openLibrary: "打开完整项目库",
    resumeKicker: "中文简历",
    resumeTitle: "简历预览与下载",
    resumeText: "网页会直接展示中文 PDF，招聘者也可以在独立页面打开或下载。",
    downloadPdf: "下载中文 PDF",
    openResumePage: "打开简历页面",
    resumeFallback: "如果预览无法加载，请使用下载按钮。请将中文简历上传为 <strong>assets/resume/Rui_Qi_Resume_ZH.pdf</strong>。",
    resumeMissingTitle: "中文简历尚未上传",
    resumeMissingText: "请将中文简历上传到 assets/resume/Rui_Qi_Resume_ZH.pdf。上传后，预览窗口和下载按钮会自动启用。",
    resumeUnavailable: "中文简历尚未上传",
    contactKicker: "联系方式",
    contactTitle: "欢迎交流玩法系统、原型设计与游戏体验。",
    footerRole: "玩法设计与原型实现",
    projectsPageKicker: "项目库",
    projectsPageTitle: "全部项目",
    projectsPageText: "玩法原型、商业项目、数据工具、VFX、关卡和视觉练习集中展示在此页面。",
    backHome: "返回首页",
    backProjects: "返回项目",
    all: "全部",
    role: "职责",
    tools: "工具",
    category: "分类",
    projectBreakdown: "项目拆解",
    blueprintBreakdown: "系统／设计拆解",
    systemPageKicker: "项目拆解",
    systemPageTitle: "系统与设计拆解",
    systemPageIntro: "用于展示系统截图、流程图、关卡图、蓝图、GIF、效果图、实现说明和设计判断的独立页面。",
    backProject: "返回项目详情",
    imagePlaceholder: "系统截图／流程图／效果图位置",
    openVideo: "打开 Bilibili 视频",
    playHere: "在此播放",
    loadingVideo: "正在载入视频…",
    details: "查看详情",
    openLink: "打开链接",
    downloadFile: "下载文件",
    overview: "项目概述",
    whatIBuilt: "我的工作",
    systemBreakdown: "系统拆解",
    challenges: "问题与改进",
    workflowNotes: "工作流程说明",
    mediaGallery: "媒体画廊",
    mediaGalleryIntro: "同一个项目可以放多个独立视频和图片；视频只会在访客点击后加载。",
    assetsPending: "素材待补充",
    projectNotFound: "未找到该项目。",
    projectNotFoundText: "请返回项目页面。",
    demoReel: "作品混剪",
    montageTitle: "项目演示视频",
    montageText: "用 30–60 秒快速展示玩法系统、原型和交互设计。",
    video: "视频",
    openDemoReel: "在 Bilibili 打开",
    montageSlot: "作品混剪位置",
    montageSlotText: "此区域用于放置 30–60 秒的项目混剪；在添加视频之前，会显示作品集概览。",
    placeholder: "待添加",
    futureMontage: "待上传混剪",
    montageTypes: "玩法／UI／交互",
    youtubeNote: "请在 Pages CMS 的“中文网站内容”中添加 Bilibili 链接。",
    email: "邮箱",
    resume: "中文简历",
    github: "GitHub 主页",
    linkedin: "LinkedIn 主页",
    openProfile: "打开职业主页",
    addLinkLater: "暂未添加",
    contactDownloadPdf: "下载中文 PDF",
    resumeViewerKicker: "中文简历",
    resumeViewerTitle: "简历预览",
    resumeViewerText: "此页面直接展示中文简历 PDF，并提供下载按钮。",
    backPortfolio: "返回作品集",
    resumeContactKicker: "简历与联系方式",
    resumeContactText: "专注于可玩系统、关卡体验、快速原型和清晰玩家反馈的玩法策划。",
    skills: "技能",
    relevantFocus: "相关能力",
    resumeDownloadTitle: "下载中文 PDF",
    resumeDownloadText: "请将中文简历上传到 <code>assets/resume/Rui_Qi_Resume_ZH.pdf</code>，此按钮会自动打开该文件。",
    reachMe: "通过以下方式联系我",
    professionalLinks: "建议只保留职业相关链接；除非能够展示游戏开发内容，否则无需加入日常个人社交账号。",
    projects: "项目"
  }
};

function getCurrentLanguage() {
  const requested = new URLSearchParams(window.location.search).get("lang");
  if (requested === "en" || requested === "zh") {
    try { localStorage.setItem(LANGUAGE_KEY, requested); } catch (error) {}
    return requested;
  }
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === "en" || saved === "zh") return saved;
  } catch (error) {}
  return "en";
}

const CURRENT_LANGUAGE = getCurrentLanguage();
const EN_DATA = window.PORTFOLIO_EN || {};
const ZH_DATA = window.PORTFOLIO_ZH || {};

function buildChineseData() {
  const zhProjectsById = new Map((ZH_DATA.projects || []).map(project => [project.id, project]));
  const englishProjectsById = new Map((EN_DATA.projects || []).map(project => [project.id, project]));
  const orderedIds = [
    ...(EN_DATA.projects || []).map(project => project.id),
    ...(ZH_DATA.projects || []).map(project => project.id).filter(id => !englishProjectsById.has(id))
  ];
  const mergedProjects = orderedIds.map(id => {
    const english = englishProjectsById.get(id) || {};
    const chinese = zhProjectsById.get(id);
    const merged = {
      ...english,
      ...(chinese || {}),
      detail: { ...(english.detail || {}), ...((chinese && chinese.detail) || {}) }
    };
    // Never inherit English/YouTube media into the Chinese version.
    merged.videoEmbed = chinese?.videoEmbed ?? "";
    merged.videoLink = chinese?.videoLink ?? "#";
    merged.videoFile = chinese?.videoFile ?? "";
    merged.videoPlatform = chinese?.videoPlatform ?? "Bilibili";
    merged.externalLinks = chinese?.externalLinks ?? [];
    merged.downloadLinks = chinese?.downloadLinks ?? [];
    merged.status = chinese?.status ?? "";
    return merged;
  });
  const zhSite = ZH_DATA.site || {};
  return {
    ...EN_DATA,
    ...ZH_DATA,
    site: {
      ...(EN_DATA.site || {}),
      ...zhSite,
      resumeUrl: zhSite.resumeUrl || "assets/resume/Rui_Qi_Resume_ZH.pdf",
      demoReelEmbed: zhSite.demoReelEmbed ?? "",
      demoReelLink: zhSite.demoReelLink ?? "#",
      demoReelCoverImage: zhSite.demoReelCoverImage ?? "",
      demoReelPlatform: zhSite.demoReelPlatform || "Bilibili"
    },
    tags: { ...(EN_DATA.tags || {}), ...(ZH_DATA.tags || {}) },
    snapshot: ZH_DATA.snapshot || EN_DATA.snapshot || [],
    focusAreas: ZH_DATA.focusAreas || EN_DATA.focusAreas || [],
    resumeSkills: ZH_DATA.resumeSkills || EN_DATA.resumeSkills || [],
    projects: mergedProjects
  };
}

const DATA = CURRENT_LANGUAGE === "zh" ? buildChineseData() : EN_DATA;
const TEXT = UI[CURRENT_LANGUAGE];
const projects = [...(DATA.projects || [])].sort((a, b) => (a.order || 999) - (b.order || 999));
const tagMap = DATA.tags || {};

function $(selector) { return document.querySelector(selector); }
function safeText(value, fallback = "") { return value || fallback; }
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function tagLabel(tagId) { return tagMap[tagId] || tagId; }
function isRealLink(url) { return Boolean(url && url !== "#"); }

function localizedUrl(url) {
  if (!url || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(url) || url.startsWith("assets/")) return url;
  const hashIndex = url.indexOf("#");
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : "";
  const beforeHash = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const queryIndex = beforeHash.indexOf("?");
  let path = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex + 1) : "";
  if (!path) path = window.location.pathname.split("/").pop() || "index.html";
  const params = new URLSearchParams(query);
  params.set("lang", CURRENT_LANGUAGE);
  return `${path}?${params.toString()}${hash}`;
}

function setLanguage(language) {
  if (language !== "en" && language !== "zh") return;
  try { localStorage.setItem(LANGUAGE_KEY, language); } catch (error) {}
  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.location.href = url.toString();
}

function applyLanguageControls() {
  if (!new URLSearchParams(window.location.search).has("lang")) {
    const visibleUrl = new URL(window.location.href);
    visibleUrl.searchParams.set("lang", CURRENT_LANGUAGE);
    window.history.replaceState({}, "", visibleUrl.toString());
  }
  document.documentElement.lang = CURRENT_LANGUAGE === "zh" ? "zh-CN" : "en";
  document.body.classList.toggle("lang-zh", CURRENT_LANGUAGE === "zh");
  document.querySelectorAll("[data-language-choice]").forEach(button => {
    const active = button.dataset.languageChoice === CURRENT_LANGUAGE;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
    button.addEventListener("click", () => setLanguage(button.dataset.languageChoice));
  });
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (TEXT[key] !== undefined) element.textContent = TEXT[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach(element => {
    const key = element.dataset.i18nHtml;
    if (TEXT[key] !== undefined) element.innerHTML = TEXT[key];
  });
  document.querySelectorAll(".wordmark, [data-site-name]").forEach(element => {
    element.textContent = safeText(DATA.site?.name, CURRENT_LANGUAGE === "zh" ? "祁睿" : "Rui Qi");
  });
}

function localizeInternalLinks() {
  document.querySelectorAll("a[href]").forEach(anchor => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;
    if (href.startsWith("#") || /\.html(?:[?#]|$)/i.test(href)) {
      anchor.setAttribute("href", localizedUrl(href));
    }
  });
}

function updatePageMetadata(title, description) {
  document.title = title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && description) meta.setAttribute("content", description);
}

function tagsHtml(tags = []) {
  return `<div class="tag-row">${tags.map(tag => `<span class="tag">${escapeHtml(tagLabel(tag))}</span>`).join("")}</div>`;
}

function withAutoplayDisabled(embedUrl) {
  if (!embedUrl) return "";
  try {
    const url = new URL(embedUrl);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      url.searchParams.set("autoplay", "0");
      url.searchParams.set("playsinline", "1");
      url.searchParams.set("rel", "0");
    }
    if (host === "player.bilibili.com" || host.endsWith("bilibili.com")) {
      url.searchParams.set("autoplay", "0");
    }
    return url.toString();
  } catch (error) {
    return embedUrl;
  }
}

function embeddedMediaHtml(embedUrl, title) {
  return `<div class="video-box"><iframe src="${escapeHtml(withAutoplayDisabled(embedUrl))}" title="${escapeHtml(title)}" loading="lazy" scrolling="no" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
}

function withAutoplayAfterClick(embedUrl) {
  if (!embedUrl) return "";
  try {
    const url = new URL(embedUrl);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com") || host === "player.bilibili.com" || host.endsWith("bilibili.com")) {
      url.searchParams.set("autoplay", "1");
    }
    if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      url.searchParams.set("playsinline", "1");
      url.searchParams.set("rel", "0");
    }
    return url.toString();
  } catch (error) {
    return embedUrl;
  }
}

function automaticEmbedUrl(explicitEmbed, normalLink) {
  if (isRealLink(explicitEmbed)) return explicitEmbed;
  if (!isRealLink(normalLink)) return "";
  try {
    const url = new URL(normalLink);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=0&playsinline=1&rel=0` : "";
    }
    if (host.endsWith("youtube.com")) {
      const pathParts = url.pathname.split("/").filter(Boolean);
      const id = url.searchParams.get("v") || ((pathParts[0] === "shorts" || pathParts[0] === "embed" || pathParts[0] === "live") ? pathParts[1] : "");
      return id ? `https://www.youtube.com/embed/${id}?autoplay=0&playsinline=1&rel=0` : "";
    }
    if (host.endsWith("bilibili.com")) {
      if (host === "player.bilibili.com") return normalLink;
      const match = url.pathname.match(/\/video\/(BV[a-zA-Z0-9]+)/i);
      if (match) {
        const page = url.searchParams.get("p") || "1";
        return `https://player.bilibili.com/player.html?bvid=${match[1]}&page=${page}&high_quality=1&danmaku=0&autoplay=0`;
      }
    }
  } catch (error) {}
  return "";
}

function mediaHtml(project) {
  const embedUrl = automaticEmbedUrl(project.videoEmbed, project.videoLink);
  if (embedUrl) return embeddedMediaHtml(embedUrl, `${project.title} ${project.videoPlatform || TEXT.video}`);
  if (project.videoFile) {
    return `<div class="video-box"><video controls preload="metadata" src="${escapeHtml(project.videoFile)}"></video></div>`;
  }
  if (project.coverImage) {
    return `<img class="cover-image" src="${escapeHtml(project.coverImage)}" alt="${escapeHtml(project.title)}">`;
  }
  return `<div class="cover-placeholder"><span>${escapeHtml(project.category || TEXT.projectBreakdown)}</span></div>`;
}

function featuredMediaHtml(project) {
  const embedUrl = automaticEmbedUrl(project.videoEmbed, project.videoLink);
  if (!embedUrl || !project.coverImage) return mediaHtml(project);
  const title = `${project.title} ${project.videoPlatform || TEXT.video}`;
  return `
    <div class="inline-video-preview" data-inline-video-preview data-embed-url="${escapeHtml(embedUrl)}" data-video-title="${escapeHtml(title)}">
      <div class="inline-video-frame">
        <img class="inline-video-backdrop" src="${escapeHtml(project.coverImage)}" alt="" aria-hidden="true" decoding="async">
        <img class="inline-video-poster" src="${escapeHtml(project.coverImage)}" alt="${escapeHtml(project.title)}" decoding="async" fetchpriority="high">
        <button class="inline-video-play" type="button" data-inline-video-play aria-label="${escapeHtml(TEXT.playHere)}: ${escapeHtml(project.title)}">
          <span class="inline-video-play-icon">▶</span>
          <span class="inline-video-play-label">${escapeHtml(TEXT.playHere)}</span>
        </button>
      </div>
    </div>`;
}

function bindInlineVideoPreviews() {
  document.querySelectorAll("[data-inline-video-preview]").forEach(preview => {
    const button = preview.querySelector("[data-inline-video-play]");
    if (!button || button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const frame = preview.querySelector(".inline-video-frame");
      const embedUrl = preview.dataset.embedUrl || "";
      const title = preview.dataset.videoTitle || TEXT.video;
      if (!frame || !embedUrl) return;

      button.disabled = true;
      frame.classList.add("is-playing");
      frame.innerHTML = `<div class="inline-video-loader" aria-live="polite">${escapeHtml(TEXT.loadingVideo || "Loading video")}</div>`;

      const iframe = document.createElement("iframe");
      iframe.src = withAutoplayAfterClick(embedUrl);
      iframe.title = title;
      iframe.loading = "eager";
      iframe.scrolling = "no";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.addEventListener("load", () => frame.classList.add("is-loaded"), { once: true });
      frame.appendChild(iframe);

      window.setTimeout(() => frame.classList.add("is-loaded"), 3500);
    });
  });
}


function projectExtraLinksHtml(project) {
  const externalLinks = (project.externalLinks || [])
    .filter(link => isRealLink(link.url))
    .map(link => `<a class="button secondary" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label || TEXT.openLink)}</a>`);
  const downloadLinks = (project.downloadLinks || [])
    .filter(link => isRealLink(link.url))
    .map(link => `<a class="button secondary" href="${escapeHtml(link.url)}" download>${escapeHtml(link.label || TEXT.downloadFile)}</a>`);
  return [...externalLinks, ...downloadLinks].join("");
}

function featuredProjectCard(project) {
  return `
    <article class="featured-card">
      <div class="project-media${automaticEmbedUrl(project.videoEmbed, project.videoLink) && project.coverImage ? " project-media--preview" : ""}">${featuredMediaHtml(project)}</div>
      <div class="project-body">
        <div>
          <div class="project-meta-row"><div class="project-meta">${escapeHtml(safeText(project.category))}</div>${project.status ? `<span class="project-status">${escapeHtml(project.status)}</span>` : ""}</div>
          <h3>${escapeHtml(safeText(project.title))}</h3>
          <p class="project-summary">${escapeHtml(safeText(project.summary))}</p>
          <div class="detail-list">
            <div><strong>${TEXT.role}</strong><span>${escapeHtml(safeText(project.role))}</span></div>
            <div><strong>${TEXT.tools}</strong><span>${escapeHtml(safeText(project.tools))}</span></div>
          </div>
          ${tagsHtml(project.tags)}
        </div>
        <div class="project-actions">
          <a class="button primary" href="${localizedUrl(`project-detail.html?id=${encodeURIComponent(project.id)}`)}">${TEXT.projectBreakdown}</a>
          ${projectExtraLinksHtml(project)}
        </div>
      </div>
    </article>`;
}

function libraryProjectCard(project) {
  const media = project.coverImage
    ? `<div class="library-card-media"><img src="${escapeHtml(project.coverImage)}" alt="${escapeHtml(project.title)}" loading="lazy"></div>`
    : `<div class="library-card-media library-card-media--placeholder"><span>${escapeHtml(project.status || TEXT.assetsPending)}</span></div>`;
  return `
    <article class="library-card library-card--with-media" data-tags="${escapeHtml((project.tags || []).join(" "))}">
      ${media}
      <div class="library-card-content">
        <div>
          <div class="project-meta-row"><div class="project-meta">${escapeHtml(safeText(project.category))}</div>${project.status ? `<span class="project-status">${escapeHtml(project.status)}</span>` : ""}</div>
          <h3>${escapeHtml(safeText(project.title))}</h3>
          <p>${escapeHtml(safeText(project.summary))}</p>
          ${tagsHtml(project.tags)}
        </div>
        <div class="project-actions">
          <a class="button secondary" href="${localizedUrl(`project-detail.html?id=${encodeURIComponent(project.id)}`)}">${TEXT.details}</a>
        </div>
      </div>
    </article>`;
}

function demoReelHtml(site) {
  const snapshotRows = (DATA.snapshot || []).map(item => `
    <div><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.value)}</span></div>`).join("");
  const platform = site.demoReelPlatform || (CURRENT_LANGUAGE === "zh" ? "Bilibili" : "YouTube");

  const reelEmbedUrl = automaticEmbedUrl(site.demoReelEmbed, site.demoReelLink);

  if (reelEmbedUrl) {
    return `
      <div class="reel-header">
        <div>
          <p class="section-kicker">${TEXT.demoReel}</p>
          <h3>${TEXT.montageTitle}</h3>
          <p>${TEXT.montageText}</p>
        </div>
        <span class="reel-status">${escapeHtml(platform)}</span>
      </div>
      ${embeddedMediaHtml(reelEmbedUrl, `${site.name} ${TEXT.demoReel}`)}
      ${isRealLink(site.demoReelLink) ? `<div class="project-actions reel-actions"><a class="button secondary" href="${escapeHtml(site.demoReelLink)}" target="_blank" rel="noreferrer">${TEXT.openDemoReel}</a></div>` : ""}
      <div class="snapshot-mini">${snapshotRows}</div>`;
  }

  const cover = site.demoReelCoverImage
    ? `<img class="cover-image" src="${escapeHtml(site.demoReelCoverImage)}" alt="${escapeHtml(TEXT.demoReel)}">`
    : `<div class="video-placeholder"><div><div class="play-circle">▶</div><div class="placeholder-kicker">${TEXT.futureMontage}</div><div class="placeholder-title">${TEXT.montageTypes}</div><p class="placeholder-note">${TEXT.youtubeNote}</p></div></div>`;

  return `
    <div class="reel-header">
      <div>
        <p class="section-kicker">${TEXT.demoReel}</p>
        <h3>${TEXT.montageSlot}</h3>
        <p>${TEXT.montageSlotText}</p>
      </div>
      <span class="reel-status">${TEXT.placeholder}</span>
    </div>
    <div class="video-box">${cover}</div>
    <div class="snapshot-mini">${snapshotRows}</div>`;
}

const resumeAvailabilityCache = new Map();

async function resumeFileExists(url) {
  if (!isRealLink(url)) return false;
  if (resumeAvailabilityCache.has(url)) return resumeAvailabilityCache.get(url);
  const request = fetch(url, { method: "HEAD", cache: "no-store" })
    .then(response => response.ok)
    .catch(() => false);
  resumeAvailabilityCache.set(url, request);
  return request;
}

function setResumeButtonState(button, url, available) {
  if (!button) return;
  if (available) {
    button.href = url;
    button.classList.remove("disabled");
    button.removeAttribute("aria-disabled");
    button.onclick = null;
  } else {
    button.href = "#";
    button.classList.add("disabled");
    button.setAttribute("aria-disabled", "true");
    button.textContent = TEXT.resumeUnavailable;
    button.onclick = event => event.preventDefault();
  }
}

async function configureResumeAssets(url, frame, panel, buttons = []) {
  const available = await resumeFileExists(url);
  buttons.forEach(button => setResumeButtonState(button, url, available));
  if (!frame || !panel) return;
  if (available) {
    frame.src = url;
    return;
  }
  panel.innerHTML = `
    <div class="resume-missing">
      <strong>${escapeHtml(TEXT.resumeMissingTitle)}</strong>
      <p>${escapeHtml(TEXT.resumeMissingText)}</p>
    </div>
    <div class="resume-fallback">${TEXT.resumeFallback}</div>`;
}

function renderContactLinks() {
  const site = DATA.site || {};
  const contactGrid = $("#contact-grid");
  if (!contactGrid) return;
  const links = [
    { type: "email", label: TEXT.email, value: site.email, href: `mailto:${site.email}` },
    { type: "resume", label: TEXT.resume, value: TEXT.contactDownloadPdf, href: site.resumeUrl },
    { type: "github", label: TEXT.github, value: "RuiQiqq", href: site.github },
    { type: "linkedin", label: TEXT.linkedin, value: site.linkedin && site.linkedin !== "#" ? TEXT.openProfile : TEXT.addLinkLater, href: site.linkedin || "#" }
  ];
  contactGrid.innerHTML = links.map(link => `
    <a class="contact-link" data-contact-type="${escapeHtml(link.type)}" href="${escapeHtml(link.href)}" ${link.href !== "#" ? 'target="_blank" rel="noreferrer"' : ""}>
      <div><strong>${escapeHtml(link.label)}</strong><span>${escapeHtml(link.value || "")}</span></div><span>→</span>
    </a>`).join("");

  const resumeLink = contactGrid.querySelector('[data-contact-type="resume"]');
  if (resumeLink) {
    resumeFileExists(site.resumeUrl).then(available => {
      if (available) return;
      resumeLink.href = "#";
      resumeLink.classList.add("disabled");
      resumeLink.removeAttribute("target");
      resumeLink.removeAttribute("rel");
      const value = resumeLink.querySelector("span");
      if (value) value.textContent = TEXT.resumeUnavailable;
      resumeLink.addEventListener("click", event => event.preventDefault());
    });
  }
}

function renderHome() {
  const site = DATA.site || {};
  if ($("#home-eyebrow")) $("#home-eyebrow").textContent = safeText(site.eyebrow, "Portfolio");
  if ($("#home-name")) $("#home-name").textContent = safeText(site.name, "Rui Qi");
  if ($("#home-title")) $("#home-title").textContent = safeText(site.title);
  if ($("#home-subtitle")) $("#home-subtitle").textContent = safeText(site.subtitle);
  if ($("#home-intro")) $("#home-intro").textContent = safeText(site.intro);
  configureResumeAssets(
    safeText(site.resumeUrl),
    $("#resume-preview-frame"),
    $("#resume-preview-panel"),
    [$("#home-resume-button"), $("#resume-download-main")].filter(Boolean)
  );
  if ($("#home-reel")) $("#home-reel").innerHTML = demoReelHtml(site);
  if ($("#featured-projects")) {
    // One project area only: anything checked as featured in Pages CMS appears here.
    // Compact cards keep the homepage scannable even when more projects are enabled.
    $("#featured-projects").innerHTML = projects.filter(p => p.featured).map(libraryProjectCard).join("");
  }
  if ($("#focus-areas")) {
    $("#focus-areas").innerHTML = (DATA.focusAreas || []).map(area => `<article class="focus-card"><h3>${escapeHtml(area.title)}</h3><p>${escapeHtml(area.text)}</p></article>`).join("");
  }
  renderContactLinks();
  updatePageMetadata(`${safeText(site.name, "Rui Qi")} | ${safeText(site.title, TEXT.footerRole)}`, safeText(site.subtitle));
}

function renderProjectsPage() {
  const grid = $("#all-projects-grid");
  if (!grid) return;
  const library = projects.filter(p => p.library);
  grid.innerHTML = library.map(libraryProjectCard).join("");
  const tagFilter = $("#tag-filter");
  if (tagFilter) {
    const usedTags = Array.from(new Set(library.flatMap(p => p.tags || [])));
    tagFilter.innerHTML = `<button class="filter-button active" data-filter="all">${TEXT.all}</button>` + usedTags.map(tag => `<button class="filter-button" data-filter="${escapeHtml(tag)}">${escapeHtml(tagLabel(tag))}</button>`).join("");
    tagFilter.addEventListener("click", event => {
      const button = event.target.closest("button");
      if (!button) return;
      document.querySelectorAll(".filter-button").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll(".library-card").forEach(card => {
        const tags = card.dataset.tags || "";
        card.style.display = filter === "all" || tags.split(" ").includes(filter) ? "flex" : "none";
      });
    });
  }
  updatePageMetadata(`${TEXT.projectsPageTitle} | ${safeText(DATA.site?.name, "Rui Qi")}`, TEXT.projectsPageText);
}

function breakdownMediaItemHtml(media, project, itemLabel) {
  if (!media || typeof media !== "object") return "";
  const type = media.type || (media.src ? "image" : "video");
  const alt = safeText(media.alt, itemLabel || project.title);
  const note = safeText(media.note);

  if (type === "image" && isRealLink(media.src)) {
    return `<figure class="breakdown-media-item breakdown-media-item--image">
      <button class="breakdown-media-zoom" type="button" data-lightbox-src="${escapeHtml(media.src)}" data-lightbox-alt="${escapeHtml(alt)}" aria-label="${escapeHtml(alt)}">
        <img src="${escapeHtml(media.src)}" alt="${escapeHtml(alt)}" loading="lazy">
      </button>
      ${note ? `<figcaption>${escapeHtml(note)}</figcaption>` : ""}
    </figure>`;
  }

  if (type === "video") {
    if (isRealLink(media.file)) {
      const posterAttr = isRealLink(media.poster) ? ` poster="${escapeHtml(media.poster)}"` : "";
      return `<figure class="breakdown-media-item breakdown-media-item--video">
        <video class="breakdown-local-video" controls muted loop playsinline preload="metadata"${posterAttr}>
          <source src="${escapeHtml(media.file)}">
        </video>
        ${note ? `<figcaption>${escapeHtml(note)}</figcaption>` : ""}
      </figure>`;
    }
    const embedUrl = automaticEmbedUrl(media.embed, media.link);
    const poster = media.poster || "";
    if (embedUrl) {
      const posterHtml = isRealLink(poster)
        ? `<img class="inline-video-backdrop" src="${escapeHtml(poster)}" alt="" aria-hidden="true"><img class="inline-video-poster" src="${escapeHtml(poster)}" alt="${escapeHtml(alt)}" loading="lazy">`
        : `<div class="gallery-video-placeholder"><span>▶</span></div>`;
      return `<figure class="breakdown-media-item breakdown-media-item--video">
        <div class="inline-video-preview breakdown-inline-video" data-inline-video-preview data-embed-url="${escapeHtml(embedUrl)}" data-video-title="${escapeHtml(alt)}">
          <div class="inline-video-frame">
            ${posterHtml}
            <button class="inline-video-play" type="button" data-inline-video-play aria-label="${escapeHtml(TEXT.playHere)}: ${escapeHtml(alt)}">
              <span class="inline-video-play-icon">▶</span><span class="inline-video-play-label">${escapeHtml(TEXT.playHere)}</span>
            </button>
          </div>
        </div>
        ${note ? `<figcaption>${escapeHtml(note)}</figcaption>` : ""}
      </figure>`;
    }
  }

  return "";
}

function normalizedBreakdownMedia(item) {
  const media = Array.isArray(item?.media) ? item.media.filter(Boolean) : [];
  // Backward compatibility for older single-image data.
  if (!media.length && isRealLink(item?.image)) {
    media.push({ type: "image", src: item.image, alt: item.imageAlt || item.label || "" });
  }
  return media;
}

function systemBreakdownSectionHtml(project, detail) {
  const items = Array.isArray(detail.breakdown) ? detail.breakdown : [];
  if (!items.length) return "";

  const richItems = [];
  const textOnlyItems = [];

  items.forEach(item => {
    const media = normalizedBreakdownMedia(item);
    if (media.some(m => (m.type === "image" && isRealLink(m.src)) || (m.type === "video" && (isRealLink(m.file) || automaticEmbedUrl(m.embed, m.link))))) {
      richItems.push({ item, media });
    } else {
      textOnlyItems.push(item);
    }
  });

  const richHtml = richItems.map(({ item, media }) => {
    const renderedMedia = media.map(m => breakdownMediaItemHtml(m, project, item.label)).filter(Boolean);
    const mediaClass = renderedMedia.length === 1 ? "is-single" : renderedMedia.length === 2 ? "is-two" : "is-many";
    return `<article class="breakdown-case">
      <div class="breakdown-case-copy">
        <h3>${escapeHtml(item.label)}</h3>
        ${item.text ? `<p>${escapeHtml(item.text)}</p>` : ""}
        ${(item.bullets || []).length ? `<ul>${item.bullets.map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ul>` : ""}
      </div>
      ${renderedMedia.length ? `<div class="breakdown-case-media ${mediaClass}">${renderedMedia.join("")}</div>` : ""}
    </article>`;
  }).join("");

  const notesHtml = textOnlyItems.map(item => `
    <article class="breakdown-note-card">
      <h3>${escapeHtml(item.label)}</h3>
      ${item.text ? `<p>${escapeHtml(item.text)}</p>` : ""}
      ${(item.bullets || []).length ? `<ul>${item.bullets.map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ul>` : ""}
    </article>`).join("");

  return `<section class="detail-section container system-breakdown-section">
    <h2>${TEXT.systemBreakdown}</h2>
    ${richHtml ? `<div class="breakdown-case-list">${richHtml}</div>` : ""}
    ${notesHtml ? `<div class="breakdown-notes-grid">${notesHtml}</div>` : ""}
  </section>`;
}

function bindBreakdownLightbox() {
  const buttons = document.querySelectorAll("[data-lightbox-src]");
  if (!buttons.length) return;

  let lightbox = document.querySelector(".media-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.className = "media-lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.innerHTML = `<button class="media-lightbox-close" type="button" aria-label="Close">×</button><div class="media-lightbox-inner"><img alt=""><div class="media-lightbox-caption"></div></div>`;
    document.body.appendChild(lightbox);
  }

  const img = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".media-lightbox-caption");
  const closeButton = lightbox.querySelector(".media-lightbox-close");

  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    img.removeAttribute("src");
  };

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      img.src = button.dataset.lightboxSrc;
      img.alt = button.dataset.lightboxAlt || "";
      caption.textContent = button.dataset.lightboxAlt || "";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", close);
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !lightbox.hidden) close();
  });
}

function renderDetailPage() {
  const root = $("#project-detail-root");
  if (!root) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const project = projects.find(p => p.id === id) || (id ? null : projects[0]);
  if (!project) {
    root.innerHTML = `<section class="page-hero container"><h1>${TEXT.projectNotFound}</h1><p>${TEXT.projectNotFoundText}</p></section>`;
    updatePageMetadata(`${TEXT.projectNotFound} | ${safeText(DATA.site?.name, "Rui Qi")}`, TEXT.projectNotFoundText);
    return;
  }
  const detail = project.detail || {};
  root.innerHTML = `
    <section class="project-detail-hero container">
      <div class="project-detail-grid">
        <div class="detail-title">
          <p class="eyebrow">${TEXT.projectBreakdown}</p>
          <h1>${escapeHtml(project.title)}</h1>
          <p>${escapeHtml(project.summary)}</p>
          ${tagsHtml(project.tags)}
          <div class="project-actions detail-hero-actions">
            ${projectExtraLinksHtml(project)}
          </div>
        </div>
        <div class="snapshot-card">${mediaHtml(project)}</div>
      </div>
    </section>
    <section class="detail-section container">
      <h2>${TEXT.overview}</h2>
      <p>${escapeHtml(safeText(detail.overview, project.summary))}</p>
      <div class="detail-list" style="margin-top: 22px;">
        <div><strong>${TEXT.role}</strong><span>${escapeHtml(project.role)}</span></div>
        <div><strong>${TEXT.tools}</strong><span>${escapeHtml(project.tools)}</span></div>
        <div><strong>${TEXT.category}</strong><span>${escapeHtml(project.category)}</span></div>
      </div>
    </section>
    <section class="detail-section container"><h2>${TEXT.whatIBuilt}</h2><ul>${(detail.whatIBuilt || []).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
    ${systemBreakdownSectionHtml(project, detail)}
    <section class="detail-section container"><h2>${TEXT.challenges}</h2><ul>${(detail.challenges || []).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
    <section class="detail-section container"><h2>${TEXT.workflowNotes}</h2><p>${escapeHtml(safeText(detail.workflowNotes))}</p></section>`;
  bindInlineVideoPreviews();
  bindBreakdownLightbox();
  updatePageMetadata(`${project.title} | ${safeText(DATA.site?.name, "Rui Qi")}`, project.summary);
}

function renderContactPage() {
  const site = DATA.site || {};
  if ($("#resume-contact-name")) $("#resume-contact-name").textContent = safeText(site.name, "Rui Qi");
  if ($("#resume-skill-list")) {
    $("#resume-skill-list").innerHTML = (DATA.resumeSkills || []).map(item => `<div><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.value)}</span></div>`).join("");
  }
  configureResumeAssets(
    safeText(site.resumeUrl),
    null,
    null,
    [$("#resume-download-main")].filter(Boolean)
  );
  renderContactLinks();
  updatePageMetadata(`${TEXT.resumeContactKicker} | ${safeText(site.name, "Rui Qi")}`, TEXT.resumeContactText);
}

function renderResumeViewer() {
  const site = DATA.site || {};
  configureResumeAssets(
    safeText(site.resumeUrl),
    $("#resume-full-frame"),
    $("#resume-full-panel"),
    [$("#resume-viewer-download")].filter(Boolean)
  );
  updatePageMetadata(`${TEXT.resumeViewerKicker} | ${safeText(site.name, CURRENT_LANGUAGE === "zh" ? "祁睿" : "Rui Qi")}`, TEXT.resumeViewerText);
}

function setYear() {
  document.querySelectorAll("#year").forEach(element => { element.textContent = new Date().getFullYear(); });
}

function init() {
  applyLanguageControls();
  applyStaticTranslations();
  setYear();
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "projects") renderProjectsPage();
  if (page === "detail") renderDetailPage();
  if (page === "contact") renderContactPage();
  if (page === "resume") renderResumeViewer();
  localizeInternalLinks();
}

init();
