const projects =
    window.PORTFOLIO_PROJECTS || [];


/* ==========================================================
   ELEMENTS
========================================================== */

const root =
    document.documentElement;

const themeButton =
    document.getElementById("themeButton");

const themeIcon =
    document.getElementById("themeIcon");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const navMenu =
    document.getElementById("navMenu");

const siteHeader =
    document.getElementById("siteHeader");

const scrollProgress =
    document.getElementById("scrollProgress");

const backToTop =
    document.getElementById("backToTop");

const projectGrid =
    document.getElementById("projectGrid");

const projectSearch =
    document.getElementById("projectSearch");


/* ==========================================================
   PROJECT ORDER

   This is the permanent order of your portfolio projects.

   The numbering will always remain:

   01 / 14
   02 / 14
   ...
   14 / 14

   Filtering/searching will NOT change the original number.
========================================================== */

const PROJECT_DISPLAY_ORDER = [

    "multi-cloud-db-ecommerce",

    "sentriquiz",

    "virtual-pet-simulator",

    "school-management-system",

    "toy-store",

    "quiz-project",

    "theme-switcher",

    "github-repository",

    "team-git-practice",

    "pomodoro-timer",

    "story-clone",

    "weather-check",

    "custom-dropdown",

    "task-tracker",

    "temperature-system"

];


/* ==========================================================
   ORDER PROJECT DATA
========================================================== */

const orderedProjects = [

    ...PROJECT_DISPLAY_ORDER
        .map((id) =>
            projects.find(
                (project) =>
                    project.id === id
            )
        )
        .filter(Boolean),

    ...projects.filter(
        (project) =>
            !PROJECT_DISPLAY_ORDER.includes(
                project.id
            )
    )

];


let activeFilter = "all";


/* ==========================================================
   THEME
========================================================== */

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


const preferredTheme =
    window.matchMedia?.(
        "(prefers-color-scheme: dark)"
    ).matches
        ? "dark"
        : "light";


root.dataset.theme =
    savedTheme ||
    root.dataset.theme ||
    preferredTheme;


updateThemeIcon();


themeButton?.addEventListener(
    "click",
    () => {

        const nextTheme =
            root.dataset.theme === "dark"
                ? "light"
                : "dark";

        root.dataset.theme =
            nextTheme;

        localStorage.setItem(
            "portfolio-theme",
            nextTheme
        );

        updateThemeIcon();

    }
);


/* ==========================================================
   UPDATE THEME ICON
========================================================== */

function updateThemeIcon() {

    if (!themeIcon) {
        return;
    }


    const isDark =
        root.dataset.theme === "dark";


    themeIcon.textContent =
        isDark
            ? "☀"
            : "◐";


    themeButton?.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
    );


    themeButton?.setAttribute(
        "title",
        isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
    );


    document
        .querySelector(
            'meta[name="theme-color"]'
        )
        ?.setAttribute(

            "content",

            isDark
                ? "#100f0d"
                : "#f3eee5"

        );

}


/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

mobileMenuButton?.addEventListener(
    "click",
    () => {

        const open =
            navMenu?.classList.toggle(
                "open"
            );


        mobileMenuButton.classList.toggle(
            "open",
            Boolean(open)
        );


        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(Boolean(open))
        );


        mobileMenuButton.setAttribute(
            "aria-label",
            open
                ? "Close navigation"
                : "Open navigation"
        );


        document.body.classList.toggle(
            "menu-open",
            Boolean(open)
        );

    }
);


/* Close mobile menu after clicking a nav link */

document
    .querySelectorAll(".nav-link")
    .forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


function closeMenu() {

    navMenu?.classList.remove(
        "open"
    );


    mobileMenuButton?.classList.remove(
        "open"
    );


    mobileMenuButton?.setAttribute(
        "aria-expanded",
        "false"
    );


    mobileMenuButton?.setAttribute(
        "aria-label",
        "Open navigation"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


/* ==========================================================
   PROJECTS
========================================================== */

function renderProjects() {

    if (!projectGrid) {
        return;
    }


    const query =
        projectSearch
            ?.value
            .trim()
            .toLowerCase() || "";


    /* ------------------------------------------------------
       FILTER PROJECTS
    ------------------------------------------------------ */

    const visibleProjects =
        orderedProjects.filter(
            (project) => {

                const categoryMatch =
                    activeFilter === "all" ||
                    project.category ===
                        activeFilter;


                const searchableText = [

                    project.title,

                    project.subtitle,

                    project.summary,

                    project.type,

                    project.role,

                    ...(project.tech || []),

                    ...(project.features || [])

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                const searchMatch =
                    !query ||
                    searchableText.includes(
                        query
                    );


                return (
                    categoryMatch &&
                    searchMatch
                );

            }
        );


    /* ------------------------------------------------------
       EMPTY RESULT
    ------------------------------------------------------ */

    if (!visibleProjects.length) {

        projectGrid.innerHTML = `

            <div class="empty-projects">

                <strong>
                    No projects found.
                </strong>

                <p>
                    Try another project name,
                    technology or category.
                </p>

            </div>

        `;

        return;

    }


    /* ------------------------------------------------------
       SHOW ALL PROJECTS

       Only project 01 gets the large featured layout.
       Every other project uses the standard layout.
    ------------------------------------------------------ */

    projectGrid.innerHTML =

        visibleProjects

            .map(
                (project) => {

                    const realIndex =
                        orderedProjects.findIndex(
                            (item) =>
                                item.id ===
                                project.id
                        );


                    const layoutClass =
                        realIndex === 0 &&
                        activeFilter ===
                            "all" &&
                        !query

                            ? "featured-primary"

                            : "project-standard";


                    return projectCardMarkup(
                        project,
                        layoutClass
                    );

                }
            )

            .join("");


    initializeReveal();

}


/* ==========================================================
   PROJECT CARD
========================================================== */

function projectCardMarkup(project, layoutClass) {

    const originalIndex =
        projects.findIndex(
            (item) =>
                item.id === project.id
        );

    const projectNumber =
        String(originalIndex + 1)
            .padStart(2, "0");

    const totalProjects =
        String(projects.length)
            .padStart(2, "0");

    const tech =
        (project.tech || []).slice(
            0,
            layoutClass === "featured-primary"
                ? 7
                : 5
        );

    const firstFeature =
        (project.features || [])[0] ||
        "Project implementation";

    const detailsUrl =
        `project.html?id=${encodeURIComponent(project.id)}`;

    return `
        <article
            class="project-card reveal ${layoutClass}"
        >

            <!-- ===============================
                 PROJECT HEADER
            ================================ -->

            <div class="project-card-header">

                <div class="project-index">
                    PROJECT ${projectNumber} / ${totalProjects}
                </div>

                <div>

                    <span class="project-kind">
                        ${escapeHTML(
                            project.type || "Project"
                        )}
                    </span>

                    ${
                        project.year
                            ? `
                            <span class="project-year">
                                · ${escapeHTML(project.year)}
                            </span>
                            `
                            : ""
                    }

                </div>

            </div>


            <!-- ===============================
                 PROJECT CONTENT
            ================================ -->

            <div class="project-card-body">

                <div class="project-copy">

                    <h3>
                        ${escapeHTML(project.title)}
                    </h3>

                    <p class="project-subtitle">
                        ${escapeHTML(
                            project.subtitle || ""
                        )}
                    </p>


                    <!-- =========================
                         NEW VISIBLE DETAILS BUTTON
                    ========================== -->

                    <a
                        class="project-details-button"
                        href="${detailsUrl}"
                    >
                        View Project Details

                        <span>
                            ↗
                        </span>
                    </a>


                    <p class="project-summary">
                        ${escapeHTML(
                            project.summary || ""
                        )}
                    </p>


                    <!-- =========================
                         ROLE + FEATURE
                    ========================== -->

                    <div class="project-quick-details">

                        <div>

                            <span>
                                ROLE
                            </span>

                            <strong>
                                ${escapeHTML(
                                    project.role ||
                                    "Developer"
                                )}
                            </strong>

                        </div>


                        <div>

                            <span>
                                KEY FEATURE
                            </span>

                            <strong>
                                ${escapeHTML(
                                    firstFeature
                                )}
                            </strong>

                        </div>

                    </div>


                    <!-- =========================
                         TECHNOLOGIES
                    ========================== -->

                    <div class="project-tech">

                        ${tech
                            .map(
                                (item) => `
                                    <span class="tech-pill">
                                        ${escapeHTML(item)}
                                    </span>
                                `
                            )
                            .join("")}

                    </div>

                </div>


                <!-- ===============================
                     KEEP ORIGINAL PREVIEW
                ================================ -->

                ${previewMarkup(project)}

            </div>


            <!-- ===============================
                 KEEP ORIGINAL FOOTER
            ================================ -->

            <div class="project-card-footer">

                <a
                    class="project-link"
                    href="${detailsUrl}"
                >
                    View Project Details

                    <span>
                        ↗
                    </span>
                </a>


                ${
                    project.repo
                        ? `
                        <a
                            class="github-link"
                            href="${escapeAttribute(
                                project.repo
                            )}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub

                            <span>
                                ↗
                            </span>
                        </a>
                        `
                        : ""
                }

            </div>

        </article>
    `;
}


/* ==========================================================
   PROJECT PREVIEWS
========================================================== */

function previewMarkup(project) {


    /* ------------------------------------------------------
       PREVIEW WINDOW START
    ------------------------------------------------------ */

    const shellStart =
        (
            className,
            label
        ) => `

        <div
            class="
                project-preview
                ${className}
            "
            aria-label="Illustrative interface preview for ${escapeAttribute(
                project.title
            )}"
        >

            <div class="preview-window">

                <div class="preview-topbar">

                    <i></i>

                    <i></i>

                    <i></i>

                    <span>
                        ${label}
                    </span>

                </div>

    `;


    /* ------------------------------------------------------
       PREVIEW WINDOW END
    ------------------------------------------------------ */

    const shellEnd = `

            </div>

        </div>

    `;



    /* ======================================================
       SENTRIQUIZ
    ====================================================== */

    if (
        project.id ===
        "sentriquiz"
    ) {

        return `

            ${shellStart(
                "preview-sentri",
                "ILLUSTRATIVE UI / SENTRIQUIZ"
            )}


            <div class="preview-body">


                <div class="preview-question">

                    <small>
                        EXAM SESSION /
                        MONITORING
                    </small>


                    <strong>

                        Browser-based
                        examination with
                        proctoring signals.

                    </strong>


                    <div class="preview-option">

                        QUESTION STATE

                        <span></span>

                    </div>


                    <div
                        class="
                            preview-option
                            active
                        "
                    >

                        FACE PRESENCE

                        <span></span>

                    </div>


                    <div class="preview-option">

                        VIOLATION LOG

                        <span></span>

                    </div>


                    <div class="preview-option">

                        EVIDENCE CAPTURE

                        <span></span>

                    </div>

                </div>



                <div class="preview-monitor">

                    <small>
                        MONITORING
                    </small>


                    <div class="preview-camera">

                        CAMERA /
                        ACTIVE

                    </div>


                    <div class="preview-status">

                        <i></i>

                        Face presence

                    </div>


                    <div class="preview-status">

                        <i></i>

                        Fullscreen state

                    </div>


                    <div class="preview-status">

                        <i></i>

                        Evidence workflow

                    </div>

                </div>


            </div>


            ${shellEnd}

        `;

    }



    /* ======================================================
       VIRTUAL PET SIMULATOR
    ====================================================== */

    if (
        project.id ===
        "virtual-pet-simulator"
    ) {

        const petStates = [

            "Health",

            "Happiness",

            "Energy",

            "Hunger"

        ];


        return `

            ${shellStart(
                "preview-pet",
                "ILLUSTRATIVE UI / PET STATE"
            )}


            <div class="preview-body">


                <div class="preview-pet-avatar">

                    VP

                </div>



                <div class="preview-pet-panel">


                    <small>

                        PET STATUS /
                        SYSTEM VIEW

                    </small>


                    ${petStates

                        .map(
                            (
                                label,
                                index
                            ) => `

                            <div class="preview-bar">

                                <label>

                                    <span>
                                        ${label}
                                    </span>

                                    <span>
                                        STATE
                                    </span>

                                </label>

                                <i
                                    class="
                                        bar-${index + 1}
                                    "
                                ></i>

                            </div>

                            `
                        )

                        .join("")}


                </div>


            </div>


            ${shellEnd}

        `;

    }



    /* ======================================================
       SCHOOL MANAGEMENT SYSTEM
    ====================================================== */

    if (
        project.id ===
        "school-management-system"
    ) {

        const systemRows = [

            "Student records",

            "Marks & reports",

            "Notifications",

            "Transport"

        ];


        return `

            ${shellStart(
                "preview-admin",
                "ILLUSTRATIVE UI / SCHOOL SYSTEM"
            )}


            <div class="preview-body">


                <div class="preview-admin-nav">

                    <strong>
                        SMS
                    </strong>

                    <span>
                        Admin
                    </span>

                    <span>
                        Teacher
                    </span>

                    <span>
                        Student
                    </span>

                    <span>
                        Library
                    </span>

                </div>



                <div class="preview-admin-content">


                    ${systemRows

                        .map(
                            (label) => `

                            <div class="preview-admin-row">

                                <strong>

                                    ${label}

                                </strong>

                                <i></i>

                                <i></i>

                            </div>

                            `
                        )

                        .join("")}


                </div>


            </div>


            ${shellEnd}

        `;

    }



    /* ======================================================
       GENERIC PREVIEW
       USED FOR THE OTHER PROJECTS
    ====================================================== */

    const initials =

        String(
            project.title || ""
        )

            .split(/\s+/)

            .filter(Boolean)

            .slice(
                0,
                2
            )

            .map(
                (word) =>
                    word[0]
            )

            .join("")

            .toUpperCase();



    const previewStack =

        (
            project.tech || []
        )

            .slice(
                0,
                3
            )

            .join(
                " · "
            );


    return `

        ${shellStart(

            "preview-generic",

            `PROJECT VISUAL / ${escapeHTML(
                project.type ||
                "BUILD"
            )}`

        )}


        <div class="preview-body">


            <div class="preview-generic-mark">

                <span>

                    ${escapeHTML(
                        initials
                    )}

                </span>

            </div>



            <div class="preview-generic-copy">

                <strong>

                    ${escapeHTML(
                        project.title
                    )}

                </strong>


                <span>

                    ${escapeHTML(
                        previewStack
                    )}

                </span>

            </div>


        </div>


        ${shellEnd}

    `;

}


/* ==========================================================
   PROJECT FILTERS
========================================================== */

document
    .querySelectorAll(
        ".filter-button"
    )
    .forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {


                    document
                        .querySelectorAll(
                            ".filter-button"
                        )
                        .forEach(
                            (item) => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    activeFilter =
                        button.dataset.filter ||
                        "all";


                    renderProjects();

                }
            );

        }
    );


/* ==========================================================
   PROJECT SEARCH
========================================================== */

projectSearch?.addEventListener(
    "input",
    renderProjects
);


/* ==========================================================
   REVEAL ANIMATION
========================================================== */

let revealObserver;


function initializeReveal() {


    const elements =
        document.querySelectorAll(
            ".reveal:not(.visible)"
        );


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        reduceMotion ||
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        elements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );


        return;

    }


    if (!revealObserver) {

        revealObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {


                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },

                {

                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px"

                }

            );

    }


    elements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* ==========================================================
   SCROLL UI
========================================================== */

const sections = [

    ...document.querySelectorAll(
        "main section[id]"
    )

];


function updateScrollUI() {


    const top =
        window.scrollY;


    const available =
        document.documentElement
            .scrollHeight -
        window.innerHeight;


    /* ------------------------------------------------------
       SCROLL PROGRESS
    ------------------------------------------------------ */

    if (
        scrollProgress
    ) {

        const progress =
            available > 0

                ? (
                    top /
                    available
                ) * 100

                : 0;


        scrollProgress.style.width =
            `${progress}%`;

    }


    /* ------------------------------------------------------
       HEADER STATE
    ------------------------------------------------------ */

    siteHeader?.classList.toggle(
        "scrolled",
        top > 18
    );


    /* ------------------------------------------------------
       BACK TO TOP
    ------------------------------------------------------ */

    backToTop?.classList.toggle(
        "visible",
        top > 650
    );


    /* ------------------------------------------------------
       ACTIVE SECTION
    ------------------------------------------------------ */

    const marker =
        top + 180;


    let current =
        sections[0]?.id;


    sections.forEach(
        (section) => {

            if (
                marker >=
                section.offsetTop
            ) {

                current =
                    section.id;

            }

        }
    );


    document
        .querySelectorAll(
            ".nav-link"
        )
        .forEach(
            (link) => {

                link.classList.toggle(

                    "active",

                    link.getAttribute(
                        "href"
                    ) ===
                    `#${current}`

                );

            }
        );

}


/* ==========================================================
   SCROLL LISTENER
========================================================== */

window.addEventListener(

    "scroll",

    updateScrollUI,

    {
        passive: true
    }

);


/* ==========================================================
   RESIZE
========================================================== */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            820
        ) {

            closeMenu();

        }

    }
);


/* ==========================================================
   BACK TO TOP
========================================================== */

backToTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* ==========================================================
   HELPERS
========================================================== */

function escapeHTML(
    value = ""
) {

    return String(value).replace(

        /[&<>"']/g,

        (character) => {

            const entities = {

                "&":
                    "&amp;",

                "<":
                    "&lt;",

                ">":
                    "&gt;",

                '"':
                    "&quot;",

                "'":
                    "&#039;"

            };


            return entities[
                character
            ];

        }

    );

}


function escapeAttribute(
    value = ""
) {

    return escapeHTML(
        value
    );

}


/* ==========================================================
   INITIALIZE
========================================================== */

renderProjects();

initializeReveal();

updateScrollUI();