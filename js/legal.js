"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", initLegalPage);

    function initLegalPage() {
        if (!document.body.classList.contains("legal-page")) return;

        initActiveLegalLinks();
        initLegalSectionProgress();
        initLegalCardGlow();
        initLegalPrintLinks();
    }

    

    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf("/") + 1);
        return page || "index.html";
    }

    function normalizeHref(value) {
        return String(value || "")
            .replace("./", "")
            .replace("/", "")
            .trim();
    }

    

    function initActiveLegalLinks() {
        const currentPage = normalizeHref(getCurrentPage());

        document.querySelectorAll(".legal-sidebar a, .legal-link-card").forEach((link) => {
            const href = normalizeHref(link.getAttribute("href"));

            if (href === currentPage) {
                link.classList.add("is-active");
                link.setAttribute("aria-current", "page");
            }
        });
    }

    

    function initLegalSectionProgress() {
        const nav = document.querySelector("[data-legal-section-nav]");
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

                if (activeItem) {
                    setActive(activeItem.link);
                }
            },
            {
                threshold: [0.22, 0.38, 0.58],
                rootMargin: "-18% 0px -58% 0px"
            }
        );

        sections.forEach(({ target }) => observer.observe(target));
    }

    

    function initLegalCardGlow() {
        const elements = document.querySelectorAll(
            [
                ".legal-sidebar__card",
                ".legal-document",
                ".legal-section",
                ".legal-callout",
                ".legal-link-card"
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

    

    function initLegalPrintLinks() {
        document.querySelectorAll("[data-print-page]").forEach((button) => {
            button.addEventListener("click", () => {
                window.print();
            });
        });
    }
})();