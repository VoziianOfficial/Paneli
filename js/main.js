"use strict";

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing. Make sure /js/config.js loads before /js/main.js.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initSite);

    function initSite() {
        applyPageMeta();

        renderHeader();
        renderFooter();

        injectDynamicContent();
        replaceLegacySiteData();

        renderServiceCards();
        renderFaqBlocks();
        renderFaqSchema();
        renderPolicyBanner();

        initHeaderScroll();
        initServicesDropdown();
        initMobileMenu();
        initFaqAccordions();
        initForms();
        initSmoothAnchors();
        initCurrentYear();
        preventEmptyLinks();

        document.documentElement.classList.add("site-ready");
    }

    

    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf("/") + 1);
        return page || "index.html";
    }

    function isHomePage() {
        const page = getCurrentPage();
        return page === "index.html" || page === "";
    }

    function normalizeHref(href) {
        if (!href) return "";
        return href.replace("./", "").replace("/", "");
    }

    function escapeHtml(value) {
        return String(value || "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function applyPageMeta() {
        const page = getCurrentPage();
        const meta = config.pageMeta && config.pageMeta[page];

        if (!meta) {
            console.warn(`No pageMeta found for ${page}.`);
            return;
        }

        if (meta.title) {
            document.title = meta.title;
        }

        if (meta.description) {
            let description = document.querySelector('meta[name="description"]');

            if (!description) {
                description = document.createElement("meta");
                description.setAttribute("name", "description");
                document.head.appendChild(description);
            }

            description.setAttribute("content", meta.description);
        }
    }

    

    function renderHeader() {
        const mount = document.querySelector("[data-site-header]");

        if (!mount) {
            console.warn("Header mount [data-site-header] not found.");
            return;
        }

        const navItems = Array.isArray(config.navigation) ? config.navigation : [];
        const services = Array.isArray(config.services) ? config.services : [];
        const currentPage = getCurrentPage();

        mount.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>

      <header class="site-header" data-header>
        <div class="site-header__inner container">
          <a class="brand-link" href="index.html" aria-label="${escapeHtml(config.brand.logoLabel)}">
            <span class="brand-link__mark" aria-hidden="true">
              <img src="${escapeHtml(config.assets.logo)}" alt="" width="44" height="44">
            </span>
            <span class="brand-link__text">${escapeHtml(config.brand.logoText)}</span>
          </a>

          <nav class="desktop-nav" aria-label="Primary navigation">
            ${navItems
                .map((item) => {
                    const itemHref = normalizeHref(item.href);
                    const isActive =
                        itemHref === currentPage ||
                        (isHomePage() && itemHref === "index.html") ||
                        (item.label === "Services" && currentPage.includes("siding-"));

                    if (item.hasDropdown) {
                        return `
                    <div class="desktop-nav__item desktop-nav__item--dropdown" data-services-dropdown>
                      <a
                        class="desktop-nav__link ${isActive ? "is-active" : ""}"
                        href="${escapeHtml(item.href)}"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-services-dropdown-trigger
                      >
                        ${escapeHtml(item.label)}
                        <span class="desktop-nav__chevron" aria-hidden="true">⌄</span>
                      </a>

                      <div class="services-dropdown" data-services-dropdown-panel>
                        <div class="services-dropdown__inner">
                          ${services
                                .map(
                                    (service) => `
                                <a class="services-dropdown__link" href="${escapeHtml(service.href)}">
                                  <span>${escapeHtml(service.title)}</span>
                                  <span aria-hidden="true">→</span>
                                </a>
                              `
                                )
                                .join("")}
                        </div>
                      </div>
                    </div>
                  `;
                    }

                    return `
                  <a class="desktop-nav__link ${isActive ? "is-active" : ""}" href="${escapeHtml(item.href)}">
                    ${escapeHtml(item.label)}
                  </a>
                `;
                })
                .join("")}
          </nav>

          <div class="site-header__actions">
            <a
              class="header-icon-link header-icon-link--phone"
              href="${escapeHtml(config.phone.href)}"
              aria-label="${escapeHtml(config.phone.label)}"
              data-phone-link
            >
              <span class="header-icon-link__icon" aria-hidden="true">
                ${getIcon("phone")}
              </span>
              <span class="header-icon-link__text" data-phone-text>${escapeHtml(config.phone.number)}</span>
            </a>

            <a
              class="header-icon-link header-icon-link--email"
              href="${escapeHtml(config.email.href)}"
              aria-label="${escapeHtml(config.email.label)}"
              data-email-link
            >
              <span class="header-icon-link__icon" aria-hidden="true">
                ${getIcon("mail")}
              </span>
              <span class="header-icon-link__text">Write</span>
            </a>

            <button
              class="mobile-menu-toggle"
              type="button"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="mobileMenu"
              data-mobile-menu-open
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      ${renderMobileMenu()}
    `;
    }

    function renderMobileMenu() {
        const navItems = Array.isArray(config.navigation) ? config.navigation : [];
        const services = Array.isArray(config.services) ? config.services : [];

        return `
      <div class="mobile-menu-backdrop" data-mobile-menu-backdrop></div>

      <aside
        class="mobile-menu"
        id="mobileMenu"
        aria-label="Mobile navigation"
        aria-modal="true"
        role="dialog"
        data-mobile-menu
        inert
      >
        <div class="mobile-menu__top">
          <a class="brand-link brand-link--menu" href="index.html" aria-label="${escapeHtml(config.brand.logoLabel)}">
            <span class="brand-link__mark" aria-hidden="true">
              <img src="${escapeHtml(config.assets.logo)}" alt="" width="44" height="44">
            </span>
            <span class="brand-link__text">${escapeHtml(config.brand.logoText)}</span>
          </a>

          <button
            class="mobile-menu__close"
            type="button"
            aria-label="Close menu"
            data-mobile-menu-close
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div class="mobile-menu__body">
          <nav class="mobile-nav" aria-label="Mobile primary navigation">
            ${navItems
                .map((item) => {
                    if (item.hasDropdown) {
                        return `
                    <div class="mobile-nav__group">
                      <a class="mobile-nav__link" href="${escapeHtml(item.href)}">
                        <span>${escapeHtml(item.label)}</span>
                        <span aria-hidden="true">→</span>
                      </a>

                      <div class="mobile-nav__services" data-mobile-services-list>
                        ${services
                                .map(
                                    (service) => `
                              <a class="mobile-nav__service" href="${escapeHtml(service.href)}">
                                ${escapeHtml(service.title)}
                              </a>
                            `
                                )
                                .join("")}
                      </div>
                    </div>
                  `;
                    }

                    return `
                  <a class="mobile-nav__link" href="${escapeHtml(item.href)}">
                    <span>${escapeHtml(item.label)}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                `;
                })
                .join("")}
          </nav>

          <div class="mobile-menu__contact">
            <a href="${escapeHtml(config.phone.href)}" data-phone-link>
              <span aria-hidden="true">${getIcon("phone")}</span>
              <span data-phone-text>${escapeHtml(config.phone.number)}</span>
            </a>

            <a href="${escapeHtml(config.email.href)}" data-email-link>
              <span aria-hidden="true">${getIcon("mail")}</span>
              <span data-email-text>${escapeHtml(config.email.value)}</span>
            </a>
          </div>

          <p class="mobile-menu__note" data-legal-notice>
            ${escapeHtml(config.legalNotice)}
          </p>
        </div>
      </aside>
    `;
    }

    function initHeaderScroll() {
        const header = document.querySelector("[data-header]");
        if (!header) return;

        const updateHeader = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        };

        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }

    function initServicesDropdown() {
        const dropdown = document.querySelector("[data-services-dropdown]");
        if (!dropdown) return;

        const trigger = dropdown.querySelector("[data-services-dropdown-trigger]");
        const panel = dropdown.querySelector("[data-services-dropdown-panel]");

        if (!trigger || !panel) return;

        let closeTimer = null;

        const openDropdown = () => {
            window.clearTimeout(closeTimer);
            dropdown.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
        };

        const closeDropdown = () => {
            closeTimer = window.setTimeout(() => {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
            }, 170);
        };

        dropdown.addEventListener("mouseenter", openDropdown);
        dropdown.addEventListener("mouseleave", closeDropdown);

        trigger.addEventListener("focus", openDropdown);

        dropdown.addEventListener("focusout", (event) => {
            if (!dropdown.contains(event.relatedTarget)) {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
            }
        });

        trigger.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
                trigger.blur();
            }
        });
    }

    

    function initMobileMenu() {
        const menu = document.querySelector("[data-mobile-menu]");
        const openButton = document.querySelector("[data-mobile-menu-open]");
        const closeButton = document.querySelector("[data-mobile-menu-close]");
        const backdrop = document.querySelector("[data-mobile-menu-backdrop]");

        if (!menu || !openButton || !closeButton || !backdrop) return;

        const focusableSelector = [
            "a[href]",
            "button:not([disabled])",
            "textarea:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
        ].join(",");

        let previousFocus = null;

        const openMenu = () => {
            previousFocus = document.activeElement;

            document.body.classList.add("mobile-menu-open");
            menu.classList.add("is-open");
            backdrop.classList.add("is-open");

            menu.removeAttribute("inert");
            openButton.setAttribute("aria-expanded", "true");

            const focusable = menu.querySelectorAll(focusableSelector);
            if (focusable.length) {
                focusable[0].focus();
            }
        };

        const closeMenu = () => {
            document.body.classList.remove("mobile-menu-open");
            menu.classList.remove("is-open");
            backdrop.classList.remove("is-open");

            menu.setAttribute("inert", "");
            openButton.setAttribute("aria-expanded", "false");

            if (previousFocus && typeof previousFocus.focus === "function") {
                previousFocus.focus();
            }
        };

        openButton.addEventListener("click", openMenu);
        closeButton.addEventListener("click", closeMenu);
        backdrop.addEventListener("click", closeMenu);

        menu.addEventListener("click", (event) => {
            const link = event.target.closest("a");
            if (link) closeMenu();
        });

        document.addEventListener("keydown", (event) => {
            if (!menu.classList.contains("is-open")) return;

            if (event.key === "Escape") {
                closeMenu();
            }

            if (event.key === "Tab") {
                trapFocus(event, menu, focusableSelector);
            }
        });
    }

    function trapFocus(event, container, focusableSelector) {
        const focusable = Array.from(container.querySelectorAll(focusableSelector)).filter(
            (element) => element.offsetParent !== null || element === document.activeElement
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        }

        if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    

    function renderFooter() {
        const mount = document.querySelector("[data-site-footer]");

        if (!mount) {
            console.warn("Footer mount [data-site-footer] not found.");
            return;
        }

        const navItems = Array.isArray(config.navigation) ? config.navigation : [];
        const services = Array.isArray(config.services) ? config.services : [];
        const legalLinks = Array.isArray(config.legalLinks) ? config.legalLinks : [];

        mount.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__glow" aria-hidden="true"></div>

        <div class="container site-footer__inner">
          <div class="site-footer__brand">
            <a class="brand-link brand-link--footer" href="index.html" aria-label="${escapeHtml(config.brand.logoLabel)}">
              <span class="brand-link__mark" aria-hidden="true">
                <img src="${escapeHtml(config.assets.logo)}" alt="" width="44" height="44">
              </span>
              <span class="brand-link__text">${escapeHtml(config.brand.logoText)}</span>
            </a>

            <p data-footer-text>${escapeHtml(config.footerText)}</p>

            <p class="site-footer__service-area">
              <strong>Service area:</strong>
              <span data-service-area>${escapeHtml(config.serviceArea)}</span>
            </p>
          </div>

          <div class="site-footer__columns">
            <div class="site-footer__column">
              <h2>Navigation</h2>
              <ul>
                ${navItems
                .map(
                    (item) => `
                      <li>
                        <a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>
                      </li>
                    `
                )
                .join("")}
              </ul>
            </div>

            <div class="site-footer__column">
              <h2>Services</h2>
              <ul>
                ${services
                .map(
                    (service) => `
                      <li>
                        <a href="${escapeHtml(service.href)}">${escapeHtml(service.title)}</a>
                      </li>
                    `
                )
                .join("")}
              </ul>
            </div>

            <div class="site-footer__column">
              <h2>Legal</h2>
              <ul>
                ${legalLinks
                .map(
                    (link) => `
                      <li>
                        <a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>
                      </li>
                    `
                )
                .join("")}
              </ul>
            </div>

            <div class="site-footer__column">
              <h2>Contact</h2>
              <ul>
                <li>
                  <a href="${escapeHtml(config.phone.href)}" data-phone-link data-phone-text>
                    ${escapeHtml(config.phone.number)}
                  </a>
                </li>
                <li>
                  <a href="${escapeHtml(config.email.href)}" data-email-link data-email-text>
                    ${escapeHtml(config.email.value)}
                  </a>
                </li>
                <li>
                  <span data-address-text>${escapeHtml(config.address.full)}</span>
                </li>
                <li>
                  <span data-company-id>${escapeHtml(config.companyId)}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="site-footer__notice">
            <p data-disclaimer>${escapeHtml(config.disclaimer)}</p>
          </div>

          <div class="site-footer__bottom">
            <p>
              © <span data-current-year></span>
              <span data-company-name>${escapeHtml(config.companyName)}</span>.
              All rights reserved.
            </p>

            <p data-legal-notice>${escapeHtml(config.legalNotice)}</p>
          </div>
        </div>
      </footer>
    `;
    }

    

    function injectDynamicContent() {
        setText("[data-company-name]", config.companyName);
        setText("[data-company-id]", config.companyId);
        setText("[data-phone-text]", config.phone.number);
        setText("[data-email-text]", config.email.value);
        setText("[data-address-text]", config.address.full);
        setText("[data-footer-text]", config.footerText);
        setText("[data-service-area]", config.serviceArea);
        setText("[data-disclaimer]", config.disclaimer);
        setText("[data-legal-notice]", config.legalNotice);

        setHref("[data-phone-link]", config.phone.href);
        setHref("[data-email-link]", config.email.href);
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value || "";
        });
    }

    function setHref(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.setAttribute("href", value || "#");
        });
    }

    function replaceLegacySiteData() {
        const legacy = config.legacyReplace || {};
        const replacements = [];

        if (Array.isArray(legacy.companyNames)) {
            legacy.companyNames.forEach((item) => {
                replacements.push([item, config.companyName]);
            });
        }

        if (Array.isArray(legacy.phones)) {
            legacy.phones.forEach((item) => {
                replacements.push([item, config.phone.number]);
            });
        }

        if (Array.isArray(legacy.emails)) {
            legacy.emails.forEach((item) => {
                replacements.push([item, config.email.value]);
            });
        }

        if (Array.isArray(legacy.addresses)) {
            legacy.addresses.forEach((item) => {
                replacements.push([item, config.address.full]);
            });
        }

        if (!replacements.length) return;

        const excludedTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "SVG", "PATH"]);

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.parentElement || excludedTags.has(node.parentElement.tagName)) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            }
        });

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach((node) => {
            let nextText = node.nodeValue;

            replacements.forEach(([from, to]) => {
                if (!from || !to) return;
                nextText = nextText.split(from).join(to);
            });

            if (nextText !== node.nodeValue) {
                node.nodeValue = nextText;
            }
        });

        document.querySelectorAll("a[href]").forEach((link) => {
            const href = link.getAttribute("href");

            if (!href) return;

            let nextHref = href;

            replacements.forEach(([from, to]) => {
                if (!from || !to) return;
                nextHref = nextHref.split(from).join(to);
            });

            if (nextHref !== href) {
                link.setAttribute("href", nextHref);
            }
        });
    }

    

    function renderServiceCards() {
        document.querySelectorAll("[data-service-cards]").forEach((mount) => {
            const limit = Number(mount.dataset.limit || config.services.length);
            const services = config.services.slice(0, limit);

            mount.innerHTML = services
                .map(
                    (service, index) => `
            <article class="service-photo-card" style="--card-index:${index + 1}">
              <a href="${escapeHtml(service.href)}" class="service-photo-card__link">
                <img src="${escapeHtml(service.image)}" alt="${escapeHtml(service.title)}" loading="lazy">

                <span class="service-photo-card__shade" aria-hidden="true"></span>

                <span class="service-photo-card__icon" aria-hidden="true">
                  ${getIcon(service.icon)}
                </span>

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

    

	    function renderFaqBlocks() {
	        document.querySelectorAll("[data-faq-list]").forEach((mount) => {
	            const key = mount.dataset.faqList || "general";
	            const items = config.faq[key] || config.faq.general || [];

	            const renderItem = (item, index) => `
	            <article class="faq-item">
	              <h3 class="faq-item__heading">
	                <button
	                  class="faq-button"
	                  type="button"
	                  aria-expanded="false"
	                  aria-controls="faq-panel-${key}-${index}"
	                >
	                  <span class="faq-button__number">${String(index + 1).padStart(2, "0")}</span>
	                  <span class="faq-button__text">${escapeHtml(item.question)}</span>
	                  <span class="faq-button__icon" aria-hidden="true">+</span>
	                </button>
	              </h3>

	              <div
	                class="faq-panel"
	                id="faq-panel-${key}-${index}"
	                hidden
	              >
	                <p>${escapeHtml(item.answer)}</p>
	              </div>
	            </article>
	          `;

	            if (key === "services") {
	                const leftColumnItems = items
	                    .map((item, index) => ({ item, index }))
	                    .filter(({ index }) => index % 2 === 0)
	                    .map(({ item, index }) => renderItem(item, index))
	                    .join("");

	                const rightColumnItems = items
	                    .map((item, index) => ({ item, index }))
	                    .filter(({ index }) => index % 2 === 1)
	                    .map(({ item, index }) => renderItem(item, index))
	                    .join("");

	                mount.innerHTML = `
	                    <div class="services-faq__column">
	                        ${leftColumnItems}
	                    </div>
	                    <div class="services-faq__column">
	                        ${rightColumnItems}
	                    </div>
	                `;

	                return;
	            }

	            mount.innerHTML = items.map(renderItem).join("");
	        });
	    }

  function initFaqAccordions() {
    const faqLists = document.querySelectorAll(".faq-list");

    faqLists.forEach((list, listIndex) => {
      const items = list.querySelectorAll(".faq-item");

      items.forEach((item, itemIndex) => {
        const button = item.querySelector(".faq-button");
        const panel = item.querySelector(".faq-panel");

        if (!button || !panel) return;

        const panelId = `faq-panel-${listIndex}-${itemIndex}`;
        const buttonId = `faq-button-${listIndex}-${itemIndex}`;

        button.id = buttonId;
        button.setAttribute("type", "button");
        button.setAttribute("aria-controls", panelId);
        button.setAttribute("aria-expanded", "false");

        panel.id = panelId;
        panel.setAttribute("role", "region");
        panel.setAttribute("aria-labelledby", buttonId);
        panel.hidden = true;

        button.addEventListener("click", () => {
          const isOpen = button.getAttribute("aria-expanded") === "true";

          /* закрываем только элементы внутри этого FAQ-list */
          items.forEach((otherItem) => {
            const otherButton = otherItem.querySelector(".faq-button");
            const otherPanel = otherItem.querySelector(".faq-panel");

            if (!otherButton || !otherPanel) return;

            otherButton.setAttribute("aria-expanded", "false");
            otherPanel.hidden = true;
            otherItem.classList.remove("is-open");
          });

          /* открываем только текущий */
          if (!isOpen) {
            button.setAttribute("aria-expanded", "true");
            panel.hidden = false;
            item.classList.add("is-open");
          }
        });
      });
    });
  }

    function renderFaqSchema() {
        document.querySelectorAll("[data-faq-schema]").forEach((mount) => {
            const key = mount.dataset.faqSchema || mount.dataset.faqList || "general";
            const items = config.faq[key] || config.faq.general || [];

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
        });
    }

    

    function renderPolicyBanner() {
        const mount = document.querySelector("[data-policy-banner]");
        if (!mount || !config.cookieBanner) return;

        const storageKey = config.cookieBanner.storageKey || "paneli_policy_choice";
        const storedChoice = window.localStorage.getItem(storageKey);

        if (storedChoice) {
            mount.innerHTML = "";
            return;
        }

        mount.innerHTML = `
      <section class="policy-banner" role="dialog" aria-label="${escapeHtml(config.cookieBanner.title)}">
        <div class="policy-banner__content">
          <h2>${escapeHtml(config.cookieBanner.title)}</h2>
          <p>${escapeHtml(config.cookieBanner.text)}</p>

          <div class="policy-banner__links">
            ${(config.cookieBanner.links || [])
                .map(
                    (link) => `
                  <a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>
                `
                )
                .join("")}
          </div>
        </div>

        <div class="policy-banner__actions">
          <button class="btn btn--ghost btn--small" type="button" data-policy-decline>
            ${escapeHtml(config.cookieBanner.decline)}
          </button>

          <button class="btn btn--primary btn--small" type="button" data-policy-accept>
            ${escapeHtml(config.cookieBanner.accept)}
          </button>
        </div>
      </section>
    `;

        const acceptButton = mount.querySelector("[data-policy-accept]");
        const declineButton = mount.querySelector("[data-policy-decline]");

        const closeBanner = (choice) => {
            window.localStorage.setItem(storageKey, choice);
            mount.innerHTML = "";
        };

        if (acceptButton) {
            acceptButton.addEventListener("click", () => closeBanner("accepted"));
        }

        if (declineButton) {
            declineButton.addEventListener("click", () => closeBanner("declined"));
        }
    }

    

    function initForms() {
        document.querySelectorAll("[data-paneli-form]").forEach((form) => {
            const status = form.querySelector("[data-form-status]");
            const submitButton = form.querySelector("[type='submit']");

            form.addEventListener("submit", (event) => {
                event.preventDefault();

                clearFormErrors(form);

                const data = new FormData(form);
                const errors = validateForm(data);

                if (errors.length) {
                    showFormErrors(form, errors);

                    if (status) {
                        status.textContent = config.forms.requestForm.errorMessage;
                        status.className = "form-status is-error";
                    }

                    const firstError = form.querySelector(".is-invalid");
                    if (firstError) firstError.focus();

                    return;
                }

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.classList.add("is-loading");
                }

                window.setTimeout(() => {
                    form.reset();

                    if (status) {
                        status.textContent = config.forms.requestForm.successMessage;
                        status.className = "form-status is-success";
                    }

                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.classList.remove("is-loading");
                    }
                }, 450);
            });
        });
    }

    function validateForm(data) {
        const errors = [];

        const fullName = String(data.get("fullName") || "").trim();
        const phone = String(data.get("phone") || "").trim();
        const email = String(data.get("email") || "").trim();
        const selectedService = String(data.get("selectedService") || "").trim();
        const message = String(data.get("message") || "").trim();

        if (fullName.length < 2) {
            errors.push({
                name: "fullName",
                message: "Please enter your full name."
            });
        }

        if (!isValidPhone(phone)) {
            errors.push({
                name: "phone",
                message: "Please enter a valid phone number."
            });
        }

        if (!isValidEmail(email)) {
            errors.push({
                name: "email",
                message: "Please enter a valid email address."
            });
        }

        if (!selectedService) {
            errors.push({
                name: "selectedService",
                message: "Please choose a siding service."
            });
        }

        if (message.length < 8) {
            errors.push({
                name: "message",
                message: "Please add a short message about your siding goal."
            });
        }

        return errors;
    }

    function isValidPhone(value) {
        const clean = value.replace(/[^\d+]/g, "");
        return clean.length >= 7 && clean.length <= 18;
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function clearFormErrors(form) {
        form.querySelectorAll(".is-invalid").forEach((field) => {
            field.classList.remove("is-invalid");
            field.removeAttribute("aria-invalid");
        });

        form.querySelectorAll(".form-error").forEach((error) => {
            error.textContent = "";
        });
    }

    function showFormErrors(form, errors) {
        errors.forEach((error) => {
            const field = form.querySelector(`[name="${error.name}"]`);
            const message = form.querySelector(`[data-error-for="${error.name}"]`);

            if (field) {
                field.classList.add("is-invalid");
                field.setAttribute("aria-invalid", "true");
            }

            if (message) {
                message.textContent = error.message;
            }
        });
    }

    

    function initSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");

                if (!href || href === "#") return;

                const target = document.querySelector(href);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                    block: "start"
                });
            });
        });
    }

    function initCurrentYear() {
        const year = String(new Date().getFullYear());

        document.querySelectorAll("[data-current-year]").forEach((element) => {
            element.textContent = year;
        });
    }

    function preventEmptyLinks() {
        document.querySelectorAll('a[href="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
            });
        });
    }

    

    function getIcon(name) {
        const icons = {
            phone: `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6.62 10.79c1.45 2.85 3.74 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.49c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.19 2.2Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,
            mail: `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4.5 6.75h15a1.5 1.5 0 0 1 1.5 1.5v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.75v-9.5a1.5 1.5 0 0 1 1.5-1.5Z" stroke="currentColor" stroke-width="1.8"/>
          <path d="m4 8 8 5.75L20 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,
            layers: `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m12 3 9 4.75-9 4.75-9-4.75L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="m4.5 11.25 7.5 4 7.5-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="m4.5 15.25 7.5 4 7.5-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `,
            "refresh-cw": `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 6v5h-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 18v-5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.1 9A7 7 0 0 1 18.7 6.8L20 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M17.9 15A7 7 0 0 1 5.3 17.2L4 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `,
            wrench: `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14.7 6.3a5 5 0 0 0 6 6L12 21l-4-4 8.7-8.7Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="m5 19-2 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `,
            "scan-search": `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M11 15a4 4 0 1 1 2.83-1.17L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `,
            default: `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `
        };

        return icons[name] || icons.default;
    }
})();
