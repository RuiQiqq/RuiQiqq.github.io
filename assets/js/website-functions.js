const DATA = window.PORTFOLIO_DATA || {};
const projects = [...(DATA.projects || [])].sort((a, b) => (a.order || 999) - (b.order || 999));
const tagMap = DATA.tags || {};

function $(selector) { return document.querySelector(selector); }
function safeText(value, fallback = "") { return value || fallback; }
function tagLabel(tagId) { return tagMap[tagId] || tagId; }
function tagsHtml(tags = []) {
  return `<div class="tag-row">${tags.map(tag => `<span class="tag">${tagLabel(tag)}</span>`).join("")}</div>`;
}

function mediaHtml(project) {
  if (project.videoEmbed) {
    return `<div class="video-box"><iframe src="${project.videoEmbed}" title="${project.title} video" allowfullscreen></iframe></div>`;
  }
  if (project.coverImage) {
    return `<img class="cover-image" src="${project.coverImage}" alt="${project.title} cover image">`;
  }
  return `<div class="cover-placeholder"><span>${project.category || "Project Preview"}</span></div>`;
}

function featuredProjectCard(project) {
  return `
    <article class="featured-card">
      <div class="project-media">${mediaHtml(project)}</div>
      <div class="project-body">
        <div>
          <div class="project-meta">${safeText(project.category)}</div>
          <h3>${safeText(project.title)}</h3>
          <p class="project-summary">${safeText(project.summary)}</p>
          <div class="detail-list">
            <div><strong>Role</strong><span>${safeText(project.role)}</span></div>
            <div><strong>Tools</strong><span>${safeText(project.tools)}</span></div>
          </div>
          ${tagsHtml(project.tags)}
        </div>
        <div class="project-actions">
          <a class="button primary" href="project-detail.html?id=${project.id}">Project Breakdown</a>
          ${project.videoLink && project.videoLink !== "#" ? `<a class="button secondary" href="${project.videoLink}" target="_blank" rel="noreferrer">Open Video</a>` : ""}
        </div>
      </div>
    </article>
  `;
}

function libraryProjectCard(project) {
  return `
    <article class="library-card" data-tags="${(project.tags || []).join(" ")}">
      <div>
        <div class="project-meta">${safeText(project.category)}</div>
        <h3>${safeText(project.title)}</h3>
        <p>${safeText(project.summary)}</p>
        ${tagsHtml(project.tags)}
      </div>
      <div class="project-actions">
        <a class="button secondary" href="project-detail.html?id=${project.id}">Details</a>
      </div>
    </article>
  `;
}

function demoReelHtml(site) {
  const snapshotRows = (DATA.snapshot || []).map(item => `
    <div><strong>${item.label}</strong><span>${item.value}</span></div>
  `).join("");

  if (site.demoReelEmbed) {
    return `
      <div class="reel-header">
        <div>
          <p class="section-kicker">Demo Reel</p>
          <h3>Project Montage</h3>
          <p>30–60 second overview of gameplay systems, prototypes, and interaction work.</p>
        </div>
        <span class="reel-status">Video</span>
      </div>
      <div class="video-box"><iframe src="${site.demoReelEmbed}" title="Rui Qi demo reel" allowfullscreen></iframe></div>
      <div class="snapshot-mini">${snapshotRows}</div>
    `;
  }

  return `
    <div class="reel-header">
      <div>
        <p class="section-kicker">Demo Reel</p>
        <h3>Project Montage Slot</h3>
        <p>This area is reserved for a 30–60 second project reel. Until then, it works as a quick portfolio snapshot.</p>
      </div>
      <span class="reel-status">Placeholder</span>
    </div>
    <div class="video-box">
      <div class="video-placeholder">
        <div>
          <div class="play-circle">▶</div>
          <div class="placeholder-kicker">Future montage</div>
          <div class="placeholder-title">Gameplay / UI / Interaction</div>
          <p class="placeholder-note">Add a YouTube embed link in <strong>EDIT-ME-content.js</strong>.</p>
        </div>
      </div>
    </div>
    <div class="snapshot-mini">${snapshotRows}</div>
  `;
}

function renderHome() {
  const site = DATA.site || {};
  if ($("#home-eyebrow")) $("#home-eyebrow").textContent = safeText(site.eyebrow, "Portfolio");
  if ($("#home-name")) $("#home-name").textContent = safeText(site.name, "Rui Qi");
  if ($("#home-title")) $("#home-title").textContent = safeText(site.title, "Gameplay Systems & Technical Design");
  if ($("#home-subtitle")) $("#home-subtitle").textContent = safeText(site.subtitle);
  if ($("#home-intro")) $("#home-intro").textContent = safeText(site.intro);
  if ($("#home-resume-button")) $("#home-resume-button").href = safeText(site.resumeUrl, "assets/resume/Rui_Qi_Resume.pdf");
  if ($("#resume-download-main")) $("#resume-download-main").href = safeText(site.resumeUrl, "assets/resume/Rui_Qi_Resume.pdf");
  if ($("#resume-preview-frame")) $("#resume-preview-frame").src = safeText(site.resumeUrl, "assets/resume/Rui_Qi_Resume.pdf");

  const reel = $("#home-reel");
  if (reel) reel.innerHTML = demoReelHtml(site);

  const featured = projects.filter(p => p.featured);
  if ($("#featured-projects")) $("#featured-projects").innerHTML = featured.map(featuredProjectCard).join("");

  if ($("#focus-areas")) {
    $("#focus-areas").innerHTML = (DATA.focusAreas || []).map(area => `
      <article class="focus-card"><h3>${area.title}</h3><p>${area.text}</p></article>
    `).join("");
  }

  const library = projects.filter(p => p.library);
  if ($("#library-preview-grid")) $("#library-preview-grid").innerHTML = library.map(libraryProjectCard).join("");

  renderContactLinks();
}

function renderProjectsPage() {
  const grid = $("#all-projects-grid");
  if (!grid) return;
  const library = projects.filter(p => p.library);
  grid.innerHTML = library.map(libraryProjectCard).join("");

  const tagFilter = $("#tag-filter");
  if (!tagFilter) return;
  const usedTags = Array.from(new Set(library.flatMap(p => p.tags || [])));
  tagFilter.innerHTML = `<button class="filter-button active" data-filter="all">All</button>` + usedTags.map(tag => `
    <button class="filter-button" data-filter="${tag}">${tagLabel(tag)}</button>
  `).join("");

  tagFilter.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    document.querySelectorAll(".filter-button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".library-card").forEach(card => {
      const tags = card.dataset.tags || "";
      card.style.display = filter === "all" || tags.includes(filter) ? "flex" : "none";
    });
  });
}

function renderDetailPage() {
  const root = $("#project-detail-root");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const project = projects.find(p => p.id === id) || projects[0];
  if (!project) {
    root.innerHTML = `<section class="page-hero container"><h1>Project not found.</h1><p>Please go back to the Projects page.</p></section>`;
    return;
  }
  document.title = `${project.title} | Rui Qi`;
  const detail = project.detail || {};
  root.innerHTML = `
    <section class="project-detail-hero container">
      <div class="project-detail-grid">
        <div class="detail-title">
          <p class="eyebrow">Project Breakdown</p>
          <h1>${project.title}</h1>
          <p>${project.summary}</p>
          ${tagsHtml(project.tags)}
        </div>
        <div class="snapshot-card">${mediaHtml(project)}</div>
      </div>
    </section>
    <section class="detail-section container">
      <h2>Overview</h2>
      <p>${safeText(detail.overview, project.summary)}</p>
      <div class="detail-list" style="margin-top: 22px;">
        <div><strong>Role</strong><span>${project.role}</span></div>
        <div><strong>Tools</strong><span>${project.tools}</span></div>
        <div><strong>Category</strong><span>${project.category}</span></div>
      </div>
    </section>
    <section class="detail-section container"><h2>What I Built</h2><ul>${(detail.whatIBuilt || []).map(item => `<li>${item}</li>`).join("")}</ul></section>
    <section class="detail-section container">
      <h2>System Breakdown</h2>
      <div class="breakdown-grid">${(detail.breakdown || []).map(item => `<article class="breakdown-card"><h3>${item.label}</h3><p>${item.text}</p></article>`).join("")}</div>
    </section>
    <section class="detail-section container"><h2>Challenges & Improvements</h2><ul>${(detail.challenges || []).map(item => `<li>${item}</li>`).join("")}</ul></section>
    <section class="detail-section container"><h2>Workflow Notes</h2><p>${safeText(detail.workflowNotes, "")}</p></section>
  `;
}

function renderContactLinks() {
  const site = DATA.site || {};
  const contactGrid = $("#contact-grid");
  if (!contactGrid) return;
  const links = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Resume", value: "Download PDF", href: site.resumeUrl },
    { label: "GitHub", value: "RuiQiqq", href: site.github },
    { label: "LinkedIn", value: site.linkedin && site.linkedin !== "#" ? "Open Profile" : "Add link later", href: site.linkedin || "#" }
  ];
  contactGrid.innerHTML = links.map(link => `
    <a class="contact-link" href="${link.href}" ${link.href !== "#" ? 'target="_blank" rel="noreferrer"' : ""}>
      <div><strong>${link.label}</strong><span>${link.value || ""}</span></div>
      <span>→</span>
    </a>
  `).join("");
}

function renderResumeViewer() {
  const site = DATA.site || {};
  const frame = $("#resume-full-frame");
  const download = $("#resume-viewer-download");
  if (frame) frame.src = safeText(site.resumeUrl, "assets/resume/Rui_Qi_Resume.pdf");
  if (download) download.href = safeText(site.resumeUrl, "assets/resume/Rui_Qi_Resume.pdf");
}

function setYear() { document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear()); }
function init() {
  setYear();
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "projects") renderProjectsPage();
  if (page === "detail") renderDetailPage();
  if (page === "resume") renderResumeViewer();
}
init();
