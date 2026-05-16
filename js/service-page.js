"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", initServicePage);

    function initServicePage() {
        if (!document.body.classList.contains("service-detail-page")) return;

        const config = window.SITE_CONFIG;

        if (!config || !Array.isArray(config.services)) {
            console.error("SITE_CONFIG.services is missing.");
            return;
        }

        const currentService = getCurrentService(config);

        if (!currentService) {
            console.warn("No matching service found for this page.");
            return;
        }

        injectServiceContent(currentService, config);
        renderEvaluationList(currentService);
        renderChoiceFactors(currentService);
        renderHomeownerQuestions(currentService);
        renderEstimateStrip();
        renderRelatedServices(currentService, config);
        renderServiceFaq(currentService);
        initServiceContactLinks(currentService);
        initSectionNavProgress();
        initServicePageGlow();
        initServiceRowObserver();

        document.documentElement.classList.add("service-page-ready");
    }

    /* ==================================================
       HELPERS
    ================================================== */

    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf("/") + 1);
        return page || "index.html";
    }

    function getCurrentService(config) {
        const currentPage = getCurrentPage();

        return config.services.find((service) => {
            return normalizePath(service.href) === normalizePath(currentPage);
        });
    }

    function normalizePath(value) {
        return String(value || "")
            .replace("./", "")
            .replace("/", "")
            .trim();
    }

    function escapeHtml(value) {
        return String(value || "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value || "";
        });
    }

    function setImage(selector, src, alt) {
        document.querySelectorAll(selector).forEach((image) => {
            image.setAttribute("src", src || "");
            image.setAttribute("alt", alt || "");
        });
    }

    /* ==================================================
       SERVICE CONTENT INJECTION
    ================================================== */

    function injectServiceContent(service, config) {
        setText("[data-service-title]", service.title);
        setText("[data-service-short-title]", service.shortTitle);
        setText("[data-service-kicker]", service.kicker);
        setText("[data-service-summary]", service.summary);
        setText("[data-service-card-text]", service.cardText);
        setText("[data-service-hero-title]", service.heroTitle);
        setText("[data-service-hero-text]", service.heroText);
        setText("[data-service-overview]", service.overview);

        setImage("[data-service-image]", service.image, service.title);
        setImage("[data-service-hero-image]", service.heroImage, service.title);

        document.querySelectorAll("[data-service-background]").forEach((element) => {
            element.style.setProperty("--service-image", `url("${service.image}")`);
        });

        document.querySelectorAll("[data-service-hero-background]").forEach((element) => {
            element.style.setProperty("--service-hero-image", `url("${service.heroImage}")`);
        });

        document.querySelectorAll("[data-service-meta]").forEach((mount) => {
            mount.innerHTML = `
        <span>${escapeHtml(service.kicker)}</span>
        <span>Independent providers</span>
        <span>${escapeHtml(config.serviceArea)}</span>
      `;
        });
    }

    /* ==================================================
       PROVIDER EVALUATION
    ================================================== */

    function renderEvaluationList(service) {
        const mounts = document.querySelectorAll("[data-service-evaluation-list]");
        if (!mounts.length) return;

        const items = Array.isArray(service.evaluationPoints) ? service.evaluationPoints : [];

        mounts.forEach((mount) => {
            mount.innerHTML = items
                .map(
                    (item, index) => `
            <article class="evaluation-row" data-service-row>
              <span class="evaluation-row__number">${String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>${getEvaluationTitle(index)}</h3>
                <p>${escapeHtml(item)}</p>
              </div>
              <span class="evaluation-row__line" aria-hidden="true"></span>
            </article>
          `
                )
                .join("");
        });
    }

    function getEvaluationTitle(index) {
        const titles = [
            "Provider experience",
            "Estimate clarity",
            "Verification details",
            "Communication fit"
        ];

        return titles[index] || "Comparison detail";
    }

    /* ==================================================
       CHOICE FACTORS
    ================================================== */

    function renderChoiceFactors(service) {
        const mounts = document.querySelectorAll("[data-service-choice-factors]");
        if (!mounts.length) return;

        const items = Array.isArray(service.choiceFactors) ? service.choiceFactors : [];

        mounts.forEach((mount) => {
            mount.innerHTML = items
                .map(
                    (item, index) => `
            <article class="choice-factor">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <h3>${escapeHtml(item)}</h3>
              <p>${getChoiceFactorText(item)}</p>
            </article>
          `
                )
                .join("");
        });
    }

    function getChoiceFactorText(title) {
        const lower = String(title || "").toLowerCase();

        if (lower.includes("material")) {
            return "Compare how each provider explains siding materials, finish direction, trim details, and exterior fit.";
        }

        if (lower.includes("timeline") || lower.includes("availability")) {
            return "Ask each provider about availability, scheduling expectations, project phases, and communication rhythm.";
        }

        if (lower.includes("warranty")) {
            return "Review material and labor warranty information directly with each independent provider.";
        }

        if (lower.includes("disposal") || lower.includes("removal")) {
            return "Confirm whether removal, disposal, cleanup, and preparation items are separated in the estimate.";
        }

        if (lower.includes("damage") || lower.includes("moisture")) {
            return "Ask how visible issues, moisture concerns, loose panels, or damaged areas are evaluated.";
        }

        if (lower.includes("consult") || lower.includes("scope") || lower.includes("clarity")) {
            return "Compare how clearly each company explains scope, options, next steps, and estimate expectations.";
        }

        return "Compare this detail across providers before deciding which company feels like the best fit.";
    }

    /* ==================================================
       ESTIMATE STRIP
    ================================================== */

    function renderEstimateStrip() {
        const mounts = document.querySelectorAll("[data-service-estimate-strip]");
        if (!mounts.length) return;

        const items = [
            {
                title: "Scope",
                text: "Ask what work, areas, prep, trim, and project boundaries are included."
            },
            {
                title: "Materials",
                text: "Compare siding type, finish, profile, accessories, and related exterior pieces."
            },
            {
                title: "Labor",
                text: "Review how labor, removal, disposal, repairs, and possible extras are listed."
            },
            {
                title: "Warranty",
                text: "Verify material and labor warranty details directly with each provider."
            }
        ];

        mounts.forEach((mount) => {
            mount.innerHTML = items
                .map(
                    (item) => `
            <article class="estimate-strip__item" tabindex="0">
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </article>
          `
                )
                .join("");
        });
    }

    /* ==================================================
       HOMEOWNER QUESTIONS
    ================================================== */

    function renderHomeownerQuestions(service) {
        const mounts = document.querySelectorAll("[data-service-questions]");
        if (!mounts.length) return;

        const items = Array.isArray(service.questions) ? service.questions : [];

        mounts.forEach((mount) => {
            mount.innerHTML = items
                .map(
                    (item, index) => `
            <article class="service-question-row" data-service-row>
              <span class="service-question-row__number">${String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>${escapeHtml(item)}</h3>
                <p>${getQuestionSupportText(item)}</p>
              </div>
              <span class="service-question-row__line" aria-hidden="true"></span>
            </article>
          `
                )
                .join("");
        });
    }

    function getQuestionSupportText(question) {
        const lower = String(question || "").toLowerCase();

        if (lower.includes("estimate")) {
            return "Itemized estimates make provider comparison easier and reduce confusion around scope.";
        }

        if (lower.includes("materials")) {
            return "Material details can affect exterior appearance, durability expectations, and warranty terms.";
        }

        if (lower.includes("warranty")) {
            return "Warranty terms should be reviewed directly with the independent provider before choosing.";
        }

        if (lower.includes("permit")) {
            return "Permit requirements vary by location, project type, and provider process.";
        }

        if (lower.includes("damage") || lower.includes("moisture")) {
            return "Visible or hidden exterior concerns should be discussed clearly before any work begins.";
        }

        if (lower.includes("fee")) {
            return "Any estimate, visit, or consultation fee should be confirmed directly before scheduling.";
        }

        return "Ask this directly so each provider can explain their own process, availability, and scope.";
    }

    /* ==================================================
       RELATED SERVICES
    ================================================== */

    function renderRelatedServices(currentService, config) {
        const mounts = document.querySelectorAll("[data-related-services]");
        if (!mounts.length) return;

        const related = config.services.filter((service) => service.id !== currentService.id);

        mounts.forEach((mount) => {
            mount.innerHTML = related
                .map(
                    (service) => `
            <article class="service-photo-card">
              <a href="${escapeHtml(service.href)}" class="service-photo-card__link">
                <img src="${escapeHtml(service.image)}" alt="${escapeHtml(service.title)}" loading="lazy">
                <span class="service-photo-card__shade" aria-hidden="true"></span>
                <span class="service-photo-card__content">
                  <span class="service-photo-card__kicker">${escapeHtml(service.kicker)}</span>
                  <span class="service-photo-card__title">${escapeHtml(service.title)}</span>
                  <span class="service-photo-card__text">${escapeHtml(service.cardText || service.summary)}</span>
                  <span class="service-photo-card__cta">
                    Compare options
                    <span aria-hidden="true">→</span>
                  </span>
                </span>
              </a>
            </article>
          `
                )
                .join("");
        });
    }

    /* ==================================================
       SERVICE FAQ
    ================================================== */

    function renderServiceFaq(service) {
        const mounts = document.querySelectorAll("[data-service-faq-list]");
        if (!mounts.length) return;

        const items = [
            {
                question: `Does Paneli provide ${service.shortTitle.toLowerCase()} directly?`,
                answer:
                    "No. Paneli is an independent provider-matching platform. Paneli does not perform siding work directly."
            },
            {
                question: `How can I compare providers for ${service.title.toLowerCase()}?`,
                answer:
                    "Compare estimate detail, siding experience, licensing, insurance, timeline, communication, availability, and warranty information directly with each provider."
            },
            {
                question: "Should I verify licensing and insurance?",
                answer:
                    "Yes. Homeowners should verify licensing, insurance, estimates, timelines, warranties, and project details directly with any provider they choose."
            },
            {
                question: "Does submitting a request hire a provider?",
                answer:
                    "No. Submitting a request does not hire any company. Homeowners choose whether to contact, compare, or hire any independent provider."
            }
        ];

        mounts.forEach((mount) => {
            mount.innerHTML = items
                .map(
                    (item, index) => `
            <article class="faq-item">
              <h3 class="faq-item__heading">
                <button
                  class="faq-button"
                  type="button"
                  aria-expanded="false"
                  aria-controls="service-faq-panel-${index}"
                >
                  <span class="faq-button__number">${String(index + 1).padStart(2, "0")}</span>
                  <span class="faq-button__text">${escapeHtml(item.question)}</span>
                  <span class="faq-button__icon" aria-hidden="true">+</span>
                </button>
              </h3>

              <div class="faq-panel" id="service-faq-panel-${index}" hidden>
                <p>${escapeHtml(item.answer)}</p>
              </div>
            </article>
          `
                )
                .join("");

            renderServiceFaqSchema(mount, items);
            bindServiceFaqButtons(mount);
        });
    }

    function bindServiceFaqButtons(scope) {
        scope.querySelectorAll(".faq-button").forEach((button) => {
            button.addEventListener("click", () => {
                const panelId = button.getAttribute("aria-controls");
                const panel = document.getElementById(panelId);

                if (!panel) return;

                const isOpen = button.getAttribute("aria-expanded") === "true";

                button.setAttribute("aria-expanded", String(!isOpen));
                panel.hidden = isOpen;

                const icon = button.querySelector(".faq-button__icon");
                if (icon) {
                    icon.textContent = isOpen ? "+" : "−";
                }
            });
        });
    }

    function renderServiceFaqSchema(scope, items) {
        const mount = document.querySelector("[data-service-faq-schema]");
        if (!mount) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer
                }
            }))
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);

        mount.innerHTML = "";
        mount.appendChild(script);
    }

    /* ==================================================
       CONTACT LINKS
    ================================================== */

    function initServiceContactLinks(service) {
        const href = `contact.html?service=${encodeURIComponent(service.id)}#contact-form`;

        document.querySelectorAll("[data-service-contact-link]").forEach((link) => {
            link.setAttribute("href", href);
        });
    }

    /* ==================================================
       SECTION NAV ACTIVE STATE
    ================================================== */

    function initSectionNavProgress() {
        const nav = document.querySelector("[data-section-nav]");
        if (!nav) return;

        const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
        const sections = links
            .map((link) => {
                const target = document.querySelector(link.getAttribute("href"));
                return target ? { link, target } : null;
            })
            .filter(Boolean);

        if (!sections.length || !("IntersectionObserver" in window)) return;

        const setActive = (activeLink) => {
            links.forEach((link) => {
                link.classList.toggle("is-active", link === activeLink);
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visibleEntry) return;

                const activeItem = sections.find((section) => section.target === visibleEntry.target);
                if (activeItem) setActive(activeItem.link);
            },
            {
                threshold: [0.22, 0.38, 0.58],
                rootMargin: "-18% 0px -58% 0px"
            }
        );

        sections.forEach(({ target }) => observer.observe(target));
    }

    /* ==================================================
       GLOW / OBSERVER
    ================================================== */

    function initServicePageGlow() {
        const elements = document.querySelectorAll(
            [
                ".service-overview__visual",
                ".evaluation-row",
                ".choice-factor",
                ".estimate-strip__item",
                ".service-question-row",
                ".service-photo-card__link"
            ].join(",")
        );

        if (!elements.length || window.matchMedia("(pointer: coarse)").matches) return;

        elements.forEach((element) => {
            element.addEventListener("pointermove", (event) => {
                const rect = element.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;

                element.style.setProperty("--pointer-x", `${x}%`);
                element.style.setProperty("--pointer-y", `${y}%`);
            });

            element.addEventListener("pointerleave", () => {
                element.style.removeProperty("--pointer-x");
                element.style.removeProperty("--pointer-y");
            });
        });
    }

    function initServiceRowObserver() {
        const rows = document.querySelectorAll("[data-service-row]");

        if (!rows.length || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle("is-visible", entry.isIntersecting);
                });
            },
            {
                threshold: 0.32
            }
        );

        rows.forEach((row) => observer.observe(row));
    }
})();