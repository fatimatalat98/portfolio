const allProjects = window.PORTFOLIO_PROJECTS || [];
const root = document.documentElement;
const page = document.getElementById("projectPage");
const themeButton = document.getElementById("themeButton");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
root.dataset.theme = savedTheme || root.dataset.theme || preferredTheme;
updateThemeIcon();

themeButton?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", root.dataset.theme);
  updateThemeIcon();
});

function updateThemeIcon() {
  const isDark = root.dataset.theme === "dark";
  if (themeIcon) themeIcon.textContent = isDark ? "☀" : "◐";
  themeButton?.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeButton?.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    isDark ? "#100f0d" : "#f3eee5"
  );
}

const id = new URLSearchParams(window.location.search).get("id");
const project = allProjects.find((item) => item.id === id);

if (!project) {
  page.innerHTML = `
    <section class="case-error">
      <div>
        <span>PROJECT NOT FOUND</span>
        <h1>This project could not be loaded.</h1>
        <p>Return to the work section to choose another project.</p>
        <a class="button button-dark" href="index.html#projects">Back to projects</a>
      </div>
    </section>`;
} else {
  document.title = `${project.title} | Fatima Talat`;

  const index = allProjects.findIndex((item) => item.id === project.id);
  const previousProject = allProjects[(index - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(index + 1) % allProjects.length];
  const projectNumber = String(index + 1).padStart(2, "0");
  const totalNumber = String(allProjects.length).padStart(2, "0");

  page.innerHTML = `
    <section class="case-hero">
      <div class="case-hero-inner">
        <div class="case-meta-line">
          <span>PROJECT ${projectNumber} / ${totalNumber}</span>
          <span>${escapeHTML(project.type || "Project")}</span>
          ${project.year ? `<span>${escapeHTML(project.year)}</span>` : ""}
        </div>

        <h1>${escapeHTML(project.title)}</h1>
        <p class="case-subtitle">${escapeHTML(project.subtitle || "")}</p>
        <p class="case-intro">${escapeHTML(project.summary || "")}</p>

        <div class="case-actions">
          ${project.repo ? `<a class="button button-dark" href="${escapeAttr(project.repo)}" target="_blank" rel="noopener noreferrer">View GitHub <span>↗</span></a>` : ""}
          <a class="button button-link" href="index.html#projects">All Projects</a>
        </div>
      </div>
    </section>

    ${detailNavigation(project)}

    <section class="case-overview" id="overview">
      <div class="case-summary">
        <span>OVERVIEW</span>
        <p>${escapeHTML(project.summary || "")}</p>
      </div>

      <div class="case-facts">
        <div class="case-fact"><span>Role</span><strong>${escapeHTML(project.role || "Developer")}</strong></div>
        <div class="case-fact"><span>Type</span><strong>${escapeHTML(project.type || "Project")}</strong></div>
        <div class="case-fact"><span>Year</span><strong>${escapeHTML(project.year || "Not specified")}</strong></div>
        <div class="case-fact"><span>Stack</span><strong>${escapeHTML((project.tech || []).join(" · "))}</strong></div>
      </div>
    </section>

    ${projectVisual(project)}
    ${journeySection(project)}
    ${listSection("features", "02 / FEATURES", "Key features", project.features)}
    ${listSection("implementation", "03 / IMPLEMENTATION", "How it is structured", project.architecture)}
    ${textSection("contribution", "04 / CONTRIBUTION", "What I worked on", project.contribution)}
    ${textSection("learning", "05 / LEARNING", "What I learned", project.learning)}

    <section class="case-project-nav" aria-label="Project navigation">
      <a href="project.html?id=${encodeURIComponent(previousProject.id)}" class="case-project-nav-link previous">
        <span>← Previous project</span>
        <strong>${escapeHTML(previousProject.title)}</strong>
      </a>
      <a href="project.html?id=${encodeURIComponent(nextProject.id)}" class="case-project-nav-link next">
        <span>Next project →</span>
        <strong>${escapeHTML(nextProject.title)}</strong>
      </a>
    </section>`;
}

function detailNavigation(project) {
  const links = [
    ["overview", "Overview", true],
    ["journey", "Journey", Boolean(project.challenge || project.summary || project.contribution || project.learning)],
    ["features", "Features", Boolean(project.features?.length)],
    ["implementation", "Implementation", Boolean(project.architecture?.length)],
    ["contribution", "Contribution", Boolean(project.contribution)],
    ["learning", "Learning", Boolean(project.learning)]
  ].filter(([, , visible]) => visible);

  return `
    <nav class="case-section-nav" aria-label="Project detail sections">
      ${links.map(([href, label]) => `<a href="#${href}">${label}</a>`).join("")}
    </nav>`;
}

function projectVisual(project) {
  const initials = project.title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const featureLabels = (project.features || []).slice(0, 4);
  const techLabels = (project.tech || []).slice(0, 5);

  return `
    <section class="case-visual-wrap" aria-label="Visual project summary">
      <div class="case-visual case-visual-${escapeAttr(project.id)}">
        <div class="case-visual-grid" aria-hidden="true"></div>
        <div class="case-visual-top">
          <span>PROJECT SYSTEM / ${escapeHTML(project.type || "BUILD")}</span>
          <span>${escapeHTML(project.role || "Developer")}</span>
        </div>
        <div class="case-visual-main">
          <div class="case-visual-mark">${escapeHTML(initials)}</div>
          <div class="case-visual-copy">
            <span>PROJECT SNAPSHOT</span>
            <h2>${escapeHTML(project.title)}</h2>
            <div class="case-visual-features">
              ${featureLabels.map((feature) => `<span>${escapeHTML(feature)}</span>`).join("") || `<span>${escapeHTML(project.summary || "Project build")}</span>`}
            </div>
          </div>
        </div>
        <div class="case-visual-stack">
          ${techLabels.map((tech) => `<span>${escapeHTML(tech)}</span>`).join("")}
        </div>
      </div>
    </section>`;
}

function journeySection(project) {
  const stages = [
    {
      number: "01",
      label: "CHALLENGE",
      title: "What needed attention",
      text: project.challenge || project.summary || ""
    },
    {
      number: "02",
      label: "BUILD",
      title: "How it was approached",
      text: (project.architecture || [])[0] || project.summary || ""
    },
    {
      number: "03",
      label: "CONTRIBUTION",
      title: "My part in the project",
      text: project.contribution || ""
    },
    {
      number: "04",
      label: "LEARNING",
      title: "What the project taught me",
      text: project.learning || ""
    }
  ].filter((stage) => stage.text);

  if (!stages.length) return "";

  return `
    <section class="case-journey-section" id="journey">
      <div class="case-journey-heading">
        <span>01 / PROJECT JOURNEY</span>
        <h2>From challenge to <em>working build.</em></h2>
        <p>A structured view of the challenge, implementation, contribution and learning recorded for this project.</p>
      </div>

      <div class="case-journey-grid">
        ${stages.map((stage) => `
          <article class="case-journey-step">
            <div class="case-journey-number">${stage.number}</div>
            <div class="case-journey-copy">
              <span>${stage.label}</span>
              <h3>${escapeHTML(stage.title)}</h3>
              <p>${escapeHTML(stage.text)}</p>
            </div>
          </article>`).join("")}
      </div>
    </section>`;
}

function textSection(id, label, heading, text) {
  if (!text) return "";
  return `
    <section class="case-section" id="${id}">
      <div class="case-section-grid">
        <div class="case-section-label">${label}</div>
        <div class="case-section-content">
          <h2>${heading}</h2>
          <p>${escapeHTML(text)}</p>
        </div>
      </div>
    </section>`;
}

function listSection(id, label, heading, items) {
  if (!items?.length) return "";
  return `
    <section class="case-section" id="${id}">
      <div class="case-section-grid">
        <div class="case-section-label">${label}</div>
        <div class="case-section-content">
          <h2>${heading}</h2>
          <ul class="case-list">
            ${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </section>`;
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function escapeAttr(value = "") {
  return escapeHTML(value);
}
