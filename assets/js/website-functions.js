const DATA = window.PORTFOLIO_DATA || {};
const projects = [...(DATA.projects || [])].sort((a, b) => (a.order || 999) - (b.order || 999));
const tagMap = DATA.tags || {};

function $(selector) {
  return document.querySelector(selector);
}

function safeText(value, fallback = "") {
  return value || fallback;
}

function tagLabel(tagId) {
  return tagMap[tagId] || tagId;
}

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
      <div class="project-meta">${safeText(project.category)}</div>
      <h3>${safeText(project.title)}</h3>
      <p>${safeText(project.summary)}</p>
      ${tagsHtml(project.tags)}
      <div class="project-actions">
        <a class="button secondary" href="project-detail.html?id=${project.id}">Details</a>
      </div>
    </article>
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
  if ($("#footer-email-button")) $("#footer-email-button").href = `mailto:${safeText(site.email)}`;

  const snapshot = $("#home-snapshot");
  if (snapshot) {
    if (site.demoReelEmbed) {
      snapshot.innerHTML = `
        <div class="video-box"><iframe src="${site.demoReelEmbed}" title="Rui Qi demo reel" allowfullscreen></iframe></div>
        <div class="snapshot-title">
          <p class="section-kicker">Demo Reel</p>
          <h3>Project Montage</h3>
          <p>A short reel for gameplay systems, prototypes, and interaction work.</p>
        </div>
      `;
    } else {
      snapshot.innerHTML = `
        <div class="snapshot-title">
          <p class="section-kicker">Portfolio Snapshot</p>
          <h3>Fast read for recruiters.</h3>
          <p>This area summarizes my focus until I add a 30–60 second project montage.</p>
        </div>
        <div class="snapshot-list">
          ${(DATA.snapshot || []).map(item => `
            <div class="snapshot-item"><strong>${item.label}</strong><span>${item.value}</span></div>
          `).join("")}
        </div>
      `;
    }
  }

  const featured = projects.filter(p => p.featured);
  if ($("#featured-projects")) $("#featured-projects").innerHTML = featured.map(featuredProjectCard).join("");

  if ($("#focus-areas")) {
    $("#focus-areas").innerHTML = (DATA.focusAreas || []).map(area => `
      <article class="focus-card"><h3>${area.title}</h3><p>${area.text}</p></article>
    `).join("");
  }

  const library = projects.filter(p => p.library);
  if ($("#library-preview-grid")) $("#library-preview-grid").innerHTML = library.map(libraryProjectCard).join("");
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
        <div class="snapshot-card">
          ${mediaHtml(project)}
        </div>
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

    <section class="detail-section container">
      <h2>What I Built</h2>
      <ul>${(detail.whatIBuilt || []).map(item => `<li>${item}</li>`).join("")}</ul>
    </section>

    <section class="detail-section container">
      <h2>System Breakdown</h2>
      <div class="breakdown-grid">
        ${(detail.breakdown || []).map(item => `
          <article class="breakdown-card"><h3>${item.label}</h3><p>${item.text}</p></article>
        `).join("")}
      </div>
    </section>

    <section class="detail-section container">
      <h2>Challenges & Improvements</h2>
      <ul>${(detail.challenges || []).map(item => `<li>${item}</li>`).join("")}</ul>
    </section>

    <section class="detail-section container">
      <h2>Workflow Notes</h2>
      <p>${safeText(detail.workflowNotes, "")}</p>
    </section>
  `;
}

function renderContactPage() {
  const site = DATA.site || {};
  const resumeButton = $("#resume-download-main");
  if (resumeButton) resumeButton.href = safeText(site.resumeUrl, "assets/resume/Rui_Qi_Resume.pdf");

  const contactGrid = $("#contact-grid");
  if (contactGrid) {
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
}

function setYear() {
  document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());
}

function init() {
  setYear();
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "projects") renderProjectsPage();
  if (page === "detail") renderDetailPage();
  if (page === "contact") renderContactPage();
}

init();
