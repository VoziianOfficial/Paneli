"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", initServicesPage);

    function initServicesPage() {
        if (!document.body.classList.contains("services-page")) return;

        initSectionNavProgress();
        initMaterialMoodPanels();
        initEstimatePointFocus();
        initPointerGlow();
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
       MATERIAL MOOD SPLIT
    ================================================== */

    function initMaterialMoodPanels() {
        const wrapper = document.querySelector("[data-material-mood]");
        if (!wrapper) return;

        const panels = Array.from(wrapper.querySelectorAll("[data-material-panel]"));
        if (!panels.length) return;

        const activatePanel = (panel) => {
            panels.forEach((item) => {
                item.classList.toggle("is-active", item === panel);
            });
        };

        const clearPanels = () => {
            panels.forEach((panel) => {
                panel.classList.remove("is-active");
            });
        };

        panels.forEach((panel) => {
            panel.addEventListener("mouseenter", () => activatePanel(panel));
            panel.addEventListener("focusin", () => activatePanel(panel));
        });

        wrapper.addEventListener("mouseleave", clearPanels);
    }

    /* ==================================================
       ESTIMATE STRIP FOCUS
    ================================================== */

    function initEstimatePointFocus() {
        const estimateItems = document.querySelectorAll(".estimate-strip__item");

        if (!estimateItems.length) return;

        estimateItems.forEach((item) => {
            item.setAttribute("tabindex", "0");

            item.addEventListener("focus", () => {
                item.classList.add("is-focused");
            });

            item.addEventListener("blur", () => {
                item.classList.remove("is-focused");
            });
        });
    }

    /* ==================================================
       POINTER GLOW
    ================================================== */

    function initPointerGlow() {
        const elements = document.querySelectorAll(
            [
                ".service-photo-card__link",
                ".material-panel",
                ".estimate-strip__item",
                ".question-row",
                ".services-index__notice"
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
})();