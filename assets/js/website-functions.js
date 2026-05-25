(function () {
  const DATA = window.PORTFOLIO_CONTENT;
  if (!DATA) {
    document.body.innerHTML = "<p style='color:white;padding:40px'>Missing EDIT-ME-content.js</p>";
    return;
  }

  const { SITE, TAGS, PROJECTS, TECHNICAL_FOCUS, SKILLS } = DATA;
  const page = document.body.dataset.page;
  const app = document.querySelector("#app");

  const sortProjects = () => [...PROJECTS].sort((a, b) => Number(a.order || 999) - Number(b.order || 999));
  const featuredProjects = () => sortProjects().filter(p => p.featured).slice(0, 3);
  const libraryProjects = () => sortProjects().filter(p => !p.featured);
  const label = (tagKey) => TAGS[tagKey]?.label || tagKey;
  const emailHref = `mailto:${SITE.email}`;

  function tagHTML(tags = [], hot = false) {
    return `<div class="tagList">${tags.map(t => `<span class="tag ${hot ? "hot" : ""}">${label(t)}</span>`).join("")}</div>`;
  }

  function videoHTML(projectOrSite, title = "Video") {
    const embed = projectOrSite.videoEmbed || projectOrSite.demoReelEmbed || "";
    const cover = projectOrSite.coverImage || "";

    if (embed && embed.trim() !== "") {
      return `
        <div class="videoFrame">
          <iframe src="${embed}" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      `;
    }

    if (cover && cover.trim() !== "") {
      return `
        <div class="videoFrame">
          <img src="${cover}" alt="${title}" style="width:100%;height:100%;object-fit:cover;" />
        </div>
      `;
    }

    return `
      <div class="videoFrame">
        <div class="videoPlaceholder">
          <div>
            <div class="playDot">▶</div>
            <strong>${title}</strong>
            <p class="note" style="margin:8px 0 0;">Add videoEmbed or coverImage in EDIT-ME-content.js</p>
          </div>
        </div>
      </div>
    `;
  }

  function navHTML() {
    const isProjects = page === "projects" || page === "project-detail";
    const isResume = page === "resume-contact";
    return `
      <nav class="nav">
        <div class="wrap navInner">
          <a class="brand" href="index.html" aria-label="Rui Qi Home">
            <span>${SITE.name}</span>
          </a>
          <div class="navLinks">
            <a class="${isProjects ? "activeLink" : ""}" href="all-projects.html">Projects</a>
            <a class="${isResume ? "activeLink" : ""}" href="resume-contact.html#resume">Resume</a>
            <a href="resume-contact.html#contact">Contact</a>
          </div>
          <div class="navCta">
            <a class="btn small secondary" href="${SITE.resume}" target="_blank" rel="noreferrer">Resume</a>
            <a class="btn small primary" href="resume-contact.html#contact">Contact</a>
          </div>
        </div>
      </nav>
    `;
  }

  function footerHTML() {
    return `
      <footer class="footer">
        <div class="wrap">
          © ${new Date().getFullYear()} ${SITE.name}. ${SITE.footerNote || "Portfolio"}.
        </div>
      </footer>
    `;
  }

  function projectCard(project, index = 1) {
    return `
      <article class="projectCard">
        <div class="projectMedia">${videoHTML(project, project.title)}</div>
        <div class="projectBody">
          <div>
            <div class="projectTop"><span>${project.category}</span><span>${String(index).padStart(2, "0")}</span></div>
            <h3>${project.title}</h3>
            <p class="projectSummary">${project.summary}</p>
            <div class="metaRows">
              <div class="metaRow"><strong>Role</strong><span>${project.role}</span></div>
              <div class="metaRow"><strong>Tools</strong><span>${project.tools}</span></div>
              <div class="metaRow"><strong>Status</strong><span>${project.status}</span></div>
            </div>
            ${tagHTML(project.tags, true)}
          </div>
          <div class="projectActions">
            <a class="btn primary" href="${project.detailLink}">Project Breakdown</a>
            <a class="btn secondary" href="${project.videoLink || "#"}" target="_blank" rel="noreferrer">Open Video</a>
          </div>
        </div>
      </article>
    `;
  }

  function miniCard(project) {
    return `
      <article class="miniCard" data-tags="${(project.tags || []).join(" ")}">
        <div class="miniMeta">${project.category}</div>
        <h3>${project.title}</h3>
        <p>${project.subtitle || project.summary}</p>
        ${tagHTML(project.tags)}
        <div class="projectActions" style="margin-top:18px;">
          <a class="btn small primary" href="${project.detailLink}">Details</a>
          <a class="btn small secondary" href="${project.videoLink || "#"}" target="_blank" rel="noreferrer">Video</a>
        </div>
      </article>
    `;
  }

  function contactCTA() {
    return `
      <section id="contact">
        <div class="wrap">
          <div class="contactCard">
            <div>
              <div class="kicker">Contact</div>
              <h2>Resume, email, and professional links.</h2>
              <p class="lead">For recruiting, collaboration, or project questions, email is the fastest way to reach me.</p>
            </div>
            <div class="contactLinks">
              <a href="${emailHref}">Email <span>${SITE.email} →</span></a>
              <a href="${SITE.resume}" target="_blank" rel="noreferrer">Resume <span>PDF →</span></a>
              <a href="${SITE.github}" target="_blank" rel="noreferrer">GitHub <span>Code / projects →</span></a>
              <a href="${SITE.linkedin}" target="_blank" rel="noreferrer">LinkedIn <span>Add your link →</span></a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderHome() {
    const featured = featuredProjects();
    const library = libraryProjects().slice(0, 6);
    const preview = featured[0];

    app.innerHTML = `
      <header class="hero">
        <div class="wrap heroGrid">
          <div>
            <div class="eyebrow">Portfolio</div>
            <h1>${SITE.name}</h1>
            <p class="heroRole">${SITE.role}</p>
            <p class="heroTitle">${SITE.heroTitle}</p>
            <p class="heroCopy">${SITE.description}</p>
            <div class="heroActions">
              <a class="btn primary" href="all-projects.html">View Projects</a>
              <a class="btn secondary" href="${SITE.resume}" target="_blank" rel="noreferrer">Download Resume</a>
              <a class="btn red" href="resume-contact.html#contact">Contact</a>
            </div>
          </div>
          <aside class="heroPanel" aria-label="Featured project preview">
            <div class="previewContent">
              ${SITE.demoReelEmbed ? videoHTML(SITE, "Demo Reel") : videoHTML(preview || SITE, preview?.title || "Featured Project Preview")}
              <div class="previewMeta">
                <h3>${SITE.demoReelEmbed ? "Demo Reel" : (preview?.title || "Featured Project Preview")}</h3>
                <p>${SITE.demoReelEmbed ? "30–60 second reel for quick screening." : (preview?.subtitle || "Put your strongest project or demo reel here later.")}</p>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <section id="featured">
        <div class="wrap">
          <div class="sectionHead">
            <div>
              <div class="kicker">Featured Projects</div>
              <h2>Best work first.</h2>
            </div>
            <p>Only the strongest projects are expanded here. Smaller experiments stay in the project library so the homepage remains fast to read.</p>
          </div>
          <div class="grid">${featured.map((p, i) => projectCard(p, i + 1)).join("")}</div>
        </div>
      </section>

      <section id="library-preview">
        <div class="wrap">
          <div class="sectionHead">
            <div>
              <div class="kicker">Prototype Library</div>
              <h2>More projects, compact view.</h2>
            </div>
            <p>Smaller or less important projects are grouped into compact cards. Click into a project only when you want the breakdown.</p>
          </div>
          <div class="grid cols3">${library.length ? library.map(miniCard).join("") : `<div class="emptyState">Add non-featured projects in EDIT-ME-content.js to show them here.</div>`}</div>
          <div style="margin-top:22px;"><a class="btn secondary" href="all-projects.html">See All Projects</a></div>
        </div>
      </section>

      <section id="focus">
        <div class="wrap">
          <div class="sectionHead">
            <div>
              <div class="kicker">Technical Design Focus</div>
              <h2>What I build.</h2>
            </div>
            <p>These categories help interviewers understand my design and implementation direction without reading every project page.</p>
          </div>
          <div class="grid cols4">
            ${TECHNICAL_FOCUS.map(item => `<article class="infoCard"><h3>${item.title}</h3><p>${item.text}</p></article>`).join("")}
          </div>
        </div>
      </section>

      ${contactCTA()}
    `;
  }

  function renderProjects() {
    const projects = sortProjects();
    const tagsUsed = [...new Set(projects.flatMap(p => p.tags || []))];
    app.innerHTML = `
      <header class="hero" style="padding-bottom:30px;">
        <div class="wrap">
          <div class="eyebrow">Projects</div>
          <h1 style="max-width:920px;">Project Library</h1>
          <p class="heroTitle" style="max-width:920px;">All gameplay systems, prototypes, interaction experiments, and technical design work in one place.</p>
        </div>
      </header>

      <section style="padding-top:20px;">
        <div class="wrap">
          <div class="filterBar" id="filters">
            <button class="filterButton active" data-filter="all">All</button>
            <button class="filterButton" data-filter="featured">Featured</button>
            ${tagsUsed.map(t => `<button class="filterButton" data-filter="${t}">${label(t)}</button>`).join("")}
          </div>
          <div class="grid cols3" id="projectGrid">
            ${projects.map(miniCard).join("")}
          </div>
        </div>
      </section>
    `;

    const buttons = [...document.querySelectorAll(".filterButton")];
    const cards = [...document.querySelectorAll(".miniCard")];
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        cards.forEach(card => {
          const id = card.querySelector("a")?.getAttribute("href")?.split("id=")[1];
          const p = projects.find(x => x.id === id);
          const visible = filter === "all" || (filter === "featured" && p?.featured) || card.dataset.tags.split(" ").includes(filter);
          card.style.display = visible ? "block" : "none";
        });
      });
    });
  }

  function renderProjectDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const p = PROJECTS.find(project => project.id === id) || sortProjects()[0];

    if (!p) {
      app.innerHTML = `<div class="wrap" style="padding:80px 0;"><div class="emptyState">No projects found. Add projects in EDIT-ME-content.js.</div></div>`;
      return;
    }

    app.innerHTML = `
      <header class="detailHero">
        <div class="wrap">
          <div class="eyebrow">Project Breakdown</div>
          <h1 class="detailTitle">${p.title}</h1>
          <p class="heroTitle" style="max-width:900px;">${p.subtitle}</p>
          ${tagHTML(p.tags, true)}
          <div class="heroActions" style="margin-top:24px;">
            <a class="btn secondary" href="all-projects.html">Back to Projects</a>
            <a class="btn primary" href="${p.videoLink || "#"}" target="_blank" rel="noreferrer">Open Video</a>
          </div>
        </div>
      </header>

      <section style="padding-top:20px;">
        <div class="wrap detailLayout">
          <div class="grid">
            <div class="detailPanel">${videoHTML(p, p.title)}</div>
            <div class="detailPanel"><h3>Overview</h3><p>${p.overview}</p></div>
            <div class="detailPanel"><h3>What I Built</h3><ul>${(p.contributions || []).map(x => `<li>${x}</li>`).join("")}</ul></div>
            <div class="detailPanel">
              <h3>System Breakdown</h3>
              <div class="breakdownGrid">
                <div class="breakdownItem"><strong>Input</strong><span>${p.breakdown?.input || ""}</span></div>
                <div class="breakdownItem"><strong>Logic</strong><span>${p.breakdown?.logic || ""}</span></div>
                <div class="breakdownItem"><strong>Feedback</strong><span>${p.breakdown?.feedback || ""}</span></div>
                <div class="breakdownItem"><strong>Iteration</strong><span>${p.breakdown?.iteration || ""}</span></div>
              </div>
            </div>
            <div class="detailPanel"><h3>Challenges & Solutions</h3>${(p.challenges || []).length ? (p.challenges || []).map(c => `<p><strong style="color:var(--text)">${c.title}</strong><br>${c.text}</p>`).join("") : `<p class="note">Add challenges in EDIT-ME-content.js.</p>`}</div>
            <div class="detailPanel"><h3>What I Would Improve</h3><ul>${(p.improvements || []).map(x => `<li>${x}</li>`).join("")}</ul></div>
          </div>
          <aside class="grid">
            <div class="detailPanel">
              <h3>Project Info</h3>
              <div class="metaRows">
                <div class="metaRow"><strong>Role</strong><span>${p.role}</span></div>
                <div class="metaRow"><strong>Tools</strong><span>${p.tools}</span></div>
                <div class="metaRow"><strong>Status</strong><span>${p.status}</span></div>
                <div class="metaRow"><strong>Duration</strong><span>${p.duration}</span></div>
                <div class="metaRow"><strong>Team</strong><span>${p.team}</span></div>
              </div>
            </div>
            <div class="detailPanel"><h3>Workflow Notes</h3><p>${p.workflowNotes || ""}</p></div>
            <div class="detailPanel"><h3>Contact</h3><p class="note">Interested in this project or my process?</p><a class="btn primary" href="resume-contact.html#contact">Contact</a></div>
          </aside>
        </div>
      </section>
    `;
  }

  function renderResumeContact() {
    app.innerHTML = `
      <header class="hero" id="resume">
        <div class="wrap heroGrid">
          <div>
            <div class="eyebrow">Resume & Contact</div>
            <h1>${SITE.name}</h1>
            <p class="heroRole">${SITE.role}</p>
            <p class="heroTitle">${SITE.heroTitle}</p>
            <p class="heroCopy">${SITE.description}</p>
            <div class="heroActions">
              <a class="btn primary" href="${SITE.resume}" target="_blank" rel="noreferrer">Download Resume</a>
              <a class="btn red" href="resume-contact.html#contact">Contact</a>
              <a class="btn secondary" href="all-projects.html">View Projects</a>
            </div>
          </div>
          <div class="contactCard" style="display:block;">
            <div class="kicker">Quick Links</div>
            <div class="contactLinks" style="margin-top:18px;">
              <a href="${emailHref}">Email <span>${SITE.email} →</span></a>
              <a href="${SITE.resume}" target="_blank" rel="noreferrer">Resume <span>PDF →</span></a>
              <a href="${SITE.github}" target="_blank" rel="noreferrer">GitHub <span>Open →</span></a>
              <a href="${SITE.linkedin}" target="_blank" rel="noreferrer">LinkedIn <span>Add link →</span></a>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div class="wrap">
          <div class="sectionHead">
            <div>
              <div class="kicker">Skills</div>
              <h2>Tools and focus areas.</h2>
            </div>
            <p>Keep this page practical: recruiter-friendly skills, resume link, and contact information.</p>
          </div>
          <div class="grid cols4">
            ${SKILLS.map(group => `<article class="infoCard"><h3>${group.title}</h3><ul>${group.items.map(item => `<li>${item}</li>`).join("")}</ul></article>`).join("")}
          </div>
        </div>
      </section>

      <section>
        <div class="wrap">
          <div class="sectionHead">
            <div>
              <div class="kicker">Modern Workflow</div>
              <h2>AI as an efficiency tool.</h2>
            </div>
            <p>I use AI-assisted workflows for debugging support, implementation research, documentation organization, and faster iteration. Final design decisions, in-engine testing, and tuning stay under my control.</p>
          </div>
        </div>
      </section>

      ${contactCTA()}
    `;
  }

  document.querySelector("#site-nav").innerHTML = navHTML();
  document.querySelector("#site-footer").innerHTML = footerHTML();

  if (page === "home") renderHome();
  if (page === "projects") renderProjects();
  if (page === "project-detail") renderProjectDetail();
  if (page === "resume-contact") renderResumeContact();
})();
