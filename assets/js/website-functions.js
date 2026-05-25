function tagLabel(tagId) {
  return (TAGS[tagId] && TAGS[tagId].label) || tagId;
}

function sortedProjects() {
  return [...PROJECTS].sort((a, b) => (a.order || 999) - (b.order || 999));
}

function featuredProjects() {
  return sortedProjects().filter(project => project.featured);
}

function libraryProjects() {
  return sortedProjects().filter(project => !project.featured);
}

function safeLink(link) {
  return link && link !== "#" ? link : "#";
}

function nav(active) {
  const links = [
    ["index.html", "Home", "home"],
    ["all-projects.html", "Projects", "projects"],
    ["about-contact.html", "About", "about"]
  ];
  return `
    <nav class="nav">
      <div class="wrap navInner">
        <a class="brand" href="index.html">
          <span class="brandMark">RQ</span>
          <span>${SITE.brand}</span>
        </a>
        <div class="navLinks">
          ${links.map(([href, label, key]) => `<a class="${active === key ? "activeLink" : ""}" href="${href}">${label}</a>`).join("")}
          <a href="${SITE.resume}" target="_blank" rel="noreferrer">Resume</a>
          <a href="mailto:${SITE.email}">Contact</a>
        </div>
      </div>
    </nav>
  `;
}

function footer() {
  return `
    <footer>
      <div class="wrap">© <span id="year"></span> ${SITE.name}. ${SITE.footerNote}</div>
    </footer>
  `;
}

function placeholder(title) {
  return `
    <div class="placeholder">
      <div>
        <div class="playDot">▶</div>
        <strong>${title}</strong>
        <p style="color: var(--muted); margin: 8px 0 0;">Add cover image or video later</p>
      </div>
    </div>
  `;
}

function mediaFrame(project, mode = "cover") {
  if (mode === "video" && project.videoEmbed) {
    return `
      <div class="videoFrame">
        <iframe src="${project.videoEmbed}" title="${project.title} video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    `;
  }

  if (project.coverImage) {
    return `
      <div class="coverFrame">
        <img src="${project.coverImage}" alt="${project.title} cover" style="width:100%; height:100%; object-fit:cover;">
      </div>
    `;
  }

  return `<div class="coverFrame">${placeholder(project.title)}</div>`;
}

function tagsMarkup(project) {
  return `<div class="tags">${(project.tags || []).map(tag => `<span class="tag">${tagLabel(tag)}</span>`).join("")}</div>`;
}

function projectCard(project, compact = false) {
  return `
    <article class="projectCard ${compact ? "compact" : ""}" data-tags="${(project.tags || []).join(" ")}">
      <div class="projectMedia">${mediaFrame(project)}</div>
      <div class="projectBody">
        <div>
          <div class="topline"><span>${project.category}</span><span>${String(project.order).padStart(2, "0")}</span></div>
          <h3>${project.title}</h3>
          <p class="summary">${project.summary}</p>
        </div>
        ${!compact ? `
          <div class="metaRows">
            <div><strong>Role:</strong> ${project.role}</div>
            <div><strong>Tools:</strong> ${project.tools}</div>
          </div>
        ` : ""}
        ${tagsMarkup(project)}
        <div class="projectActions">
          <a class="btn small primary" href="${project.detailLink}">Project Breakdown</a>
          ${project.videoLink && project.videoLink !== "#" ? `<a class="btn small" href="${project.videoLink}" target="_blank" rel="noreferrer">Watch Video</a>` : ""}
        </div>
      </div>
    </article>
  `;
}

function contactBlock() {
  return `
    <section>
      <div class="wrap">
        <div class="contactPanel card">
          <div>
            <div class="kicker">Contact</div>
            <h2>Resume, links, and contact.</h2>
            <p class="lede" style="margin-top:12px;">For recruiting, collaboration, or project questions, email is the best way to reach me.</p>
          </div>
          <div class="linkList">
            <a href="mailto:${SITE.email}">Email <span>${SITE.email} →</span></a>
            <a href="${SITE.resume}" target="_blank" rel="noreferrer">Resume <span>PDF →</span></a>
            <a href="${SITE.github}" target="_blank" rel="noreferrer">GitHub <span>@RuiQiqq →</span></a>
            <a href="${SITE.linkedin}" target="_blank" rel="noreferrer">LinkedIn <span>Add link →</span></a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderHome() {
  document.body.insertAdjacentHTML("afterbegin", nav("home"));
  document.querySelector("main").innerHTML = `
    <header class="hero">
      <div class="wrap heroGrid">
        <div>
          <div class="eyebrow">${SITE.role}</div>
          <h1>${SITE.brand}</h1>
          <p class="lede"><strong style="color:var(--text);">${SITE.heroTitle}</strong></p>
          <p class="lede">${SITE.description}</p>
          <div class="heroActions">
            <a class="btn primary" href="all-projects.html">View Projects</a>
            ${SITE.demoReelLink && SITE.demoReelLink !== "#" ? `<a class="btn" href="${SITE.demoReelLink}" target="_blank" rel="noreferrer">Watch Demo Reel</a>` : ""}
            <a class="btn" href="${SITE.resume}" target="_blank" rel="noreferrer">Download Resume</a>
            <a class="btn" href="mailto:${SITE.email}">Email Me</a>
          </div>
        </div>
        <aside class="heroPanel">
          <div class="videoFrame">
            ${SITE.demoReelEmbed ? `<iframe src="${SITE.demoReelEmbed}" title="Demo Reel" allowfullscreen></iframe>` : placeholder("Demo Reel / Featured Project Preview")}
          </div>
          <div class="panelCaption"><span>Gameplay systems · Prototypes · Technical Design</span><span>${SITE.location}</span></div>
        </aside>
      </div>
    </header>

    <section>
      <div class="wrap">
        <div class="sectionHead">
          <div><div class="kicker">Featured Work</div><h2>Featured Projects</h2></div>
          <p>These are the projects that should represent the portfolio first. Change <strong>featured: true</strong> and <strong>order</strong> in <code>EDIT-ME-content.js</code> to control this section.</p>
        </div>
        <div class="projectsGrid">${featuredProjects().slice(0, 3).map(p => projectCard(p)).join("")}</div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sectionHead">
          <div><div class="kicker">Prototype Library</div><h2>More Projects</h2></div>
          <p>Smaller prototypes and experiments stay here so the homepage stays readable. View the full project list for all work.</p>
        </div>
        <div class="libraryGrid">${libraryProjects().slice(0, 8).map(p => projectCard(p, true)).join("")}</div>
        <div style="margin-top:22px;"><a class="btn primary" href="all-projects.html">Open Full Project Library</a></div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sectionHead">
          <div><div class="kicker">Technical Design Focus</div><h2>What I Build</h2></div>
          <p>Clear categories help interviewers understand your TD direction quickly without reading every project page.</p>
        </div>
        <div class="grid4">${TECHNICAL_FOCUS.map(item => `<article class="card"><h3>${item.title}</h3><p>${item.text}</p></article>`).join("")}</div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sectionHead">
          <div><div class="kicker">Systems Lab</div><h2>Design Notes</h2></div>
          <p>A small personal section that gives the site some identity without blocking the recruiter reading path.</p>
        </div>
        <div class="grid3">${LAB_NOTES.map(item => `<article class="card"><h3>${item.title}</h3><p>${item.text}</p></article>`).join("")}</div>
      </div>
    </section>

    ${contactBlock()}
  `;
  document.body.insertAdjacentHTML("beforeend", footer());
}

function renderProjectsPage() {
  document.body.insertAdjacentHTML("afterbegin", nav("projects"));
  const allTags = [...new Set(sortedProjects().flatMap(p => p.tags || []))];
  document.querySelector("main").innerHTML = `
    <header class="detailHero">
      <div class="wrap">
        <div class="eyebrow">Project Library</div>
        <h1>Projects</h1>
        <p class="lede">All gameplay systems, prototypes, UI/economy work, interaction experiments, and technical design pieces. Use filters to scan by tool or system type.</p>
      </div>
    </header>
    <section style="padding-top:0;">
      <div class="wrap">
        <div class="filterBar">
          <button class="btn small filterBtn active" data-filter="all">All</button>
          <button class="btn small filterBtn" data-filter="featured">Featured</button>
          ${allTags.map(tag => `<button class="btn small filterBtn" data-filter="${tag}">${tagLabel(tag)}</button>`).join("")}
        </div>
        <div id="projectGrid" class="projectsGrid">${sortedProjects().map(p => projectCard(p)).join("")}</div>
      </div>
    </section>
  `;
  document.body.insertAdjacentHTML("beforeend", footer());

  document.querySelectorAll(".filterBtn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filterBtn").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll(".projectCard").forEach(card => {
        const title = card.querySelector("h3").textContent;
        const project = PROJECTS.find(p => p.title === title);
        const show = filter === "all" || (filter === "featured" && project.featured) || (project.tags || []).includes(filter);
        card.style.display = show ? "flex" : "none";
      });
    });
  });
}

function renderDetailPage() {
  document.body.insertAdjacentHTML("afterbegin", nav("projects"));
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    document.querySelector("main").innerHTML = `
      <header class="detailHero"><div class="wrap"><h1>Project not found</h1><p class="lede">Choose a project from the library.</p><a class="btn primary" href="all-projects.html">Back to Projects</a></div></header>
    `;
    document.body.insertAdjacentHTML("beforeend", footer());
    return;
  }

  document.title = `${project.title} | ${SITE.name}`;

  document.querySelector("main").innerHTML = `
    <header class="detailHero">
      <div class="wrap detailGrid">
        <div>
          <div class="eyebrow">${project.category}</div>
          <h1>${project.title}</h1>
          <p class="lede">${project.subtitle}</p>
          <div class="heroActions">
            ${project.videoLink && project.videoLink !== "#" ? `<a class="btn primary" href="${project.videoLink}" target="_blank" rel="noreferrer">Watch Video</a>` : ""}
            <a class="btn" href="all-projects.html">Back to Projects</a>
          </div>
        </div>
        <div class="heroPanel">
          ${mediaFrame(project, "video")}
          <div class="panelCaption"><span>${project.status}</span><span>${project.role}</span></div>
        </div>
      </div>
    </header>

    <section style="padding-top:18px;">
      <div class="wrap detailGrid">
        <article class="detailPanel">
          <h3>Overview</h3>
          <p>${project.overview}</p>
          ${tagsMarkup(project)}
        </article>
        <article class="detailPanel">
          <h3>Project Info</h3>
          <div class="detailMeta"><strong>Role</strong><span>${project.role}</span></div>
          <div class="detailMeta"><strong>Tools</strong><span>${project.tools}</span></div>
          <div class="detailMeta"><strong>Status</strong><span>${project.status}</span></div>
          <div class="detailMeta"><strong>Duration</strong><span>${project.duration}</span></div>
          <div class="detailMeta"><strong>Team</strong><span>${project.team}</span></div>
        </article>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sectionHead">
          <div><div class="kicker">Contribution</div><h2>What I Built</h2></div>
          <p>Use this section to make your personal contribution impossible to miss.</p>
        </div>
        <article class="detailPanel">
          <ul class="detailList">${(project.contributions || []).map(item => `<li>${item}</li>`).join("")}</ul>
        </article>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sectionHead">
          <div><div class="kicker">System Breakdown</div><h2>Input · Logic · Feedback · Iteration</h2></div>
          <p>This structure keeps TD project pages concrete and easy to scan.</p>
        </div>
        <div class="breakdownGrid">
          ${["input", "logic", "feedback", "iteration"].map(key => `<div class="breakdownItem"><h3>${key[0].toUpperCase() + key.slice(1)}</h3><p>${project.breakdown?.[key] || "Add content."}</p></div>`).join("")}
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sectionHead">
          <div><div class="kicker">Process</div><h2>Challenges & Improvements</h2></div>
          <p>This is where student and prototype projects can honestly show design judgment without sounding self-negative.</p>
        </div>
        <div class="challengeGrid">
          ${(project.challenges || []).length ? project.challenges.map(c => `<article class="detailPanel"><h3>${c.title}</h3><p>${c.text}</p></article>`).join("") : `<article class="detailPanel"><h3>Challenge</h3><p>Add one challenge you solved or learned from.</p></article>`}
          <article class="detailPanel">
            <h3>What I Would Improve</h3>
            <ul class="detailList">${(project.improvements || []).map(item => `<li>${item}</li>`).join("")}</ul>
          </article>
        </div>
      </div>
    </section>

    ${project.workflowNotes ? `<section><div class="wrap"><div class="notice"><strong>Workflow Notes:</strong> ${project.workflowNotes}</div></div></section>` : ""}
    ${contactBlock()}
  `;
  document.body.insertAdjacentHTML("beforeend", footer());
}

function renderAboutPage() {
  document.body.insertAdjacentHTML("afterbegin", nav("about"));
  document.querySelector("main").innerHTML = `
    <header class="detailHero">
      <div class="wrap">
        <div class="eyebrow">About</div>
        <h1>${SITE.name}</h1>
        <p class="lede">Technical designer focused on gameplay systems, rapid prototyping, interaction design, and playable system implementation.</p>
      </div>
    </header>

    <section style="padding-top:0;">
      <div class="wrap detailGrid">
        <article class="detailPanel">
          <h3>Profile</h3>
          <p>I work on gameplay systems, combat prototypes, UI/economy loops, and interaction experiments. My portfolio is organized around technical design work: what the player does, how the system responds, and how feedback makes the mechanic readable.</p>
        </article>
        <article class="detailPanel">
          <h3>Modern Workflow</h3>
          <p>I use AI-assisted workflows to speed up prototyping, debugging, documentation, and implementation research, while keeping final design decisions, in-engine testing, and system tuning under my own control.</p>
        </article>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sectionHead">
          <div><div class="kicker">Skills</div><h2>Tools & Focus</h2></div>
          <p>Keep this practical. Recruiters should quickly understand your engine exposure and TD direction.</p>
        </div>
        <div class="grid4">${TECHNICAL_FOCUS.map(item => `<article class="card"><h3>${item.title}</h3><p>${item.text}</p></article>`).join("")}</div>
      </div>
    </section>

    ${contactBlock()}
  `;
  document.body.insertAdjacentHTML("beforeend", footer());
}

function init() {
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "projects") renderProjectsPage();
  if (page === "project") renderDetailPage();
  if (page === "about") renderAboutPage();
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
}

init();
