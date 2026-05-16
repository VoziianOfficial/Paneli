"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", initContactPage);

    function initContactPage() {
        if (!document.body.classList.contains("contact-page")) return;

        initSectionNavProgress();
        initContactFormPrefill();
        initJumpToFormLinks();
        initContactOptionGlow();
        initSubmitStepObserver();
    }

    

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

    

    function initContactFormPrefill() {
        const form = document.querySelector("[data-paneli-form]");
        if (!form) return;

        const params = new URLSearchParams(window.location.search);
        const serviceParam = params.get("service");

        if (!serviceParam) return;

        const select = form.querySelector('[name="selectedService"]');
        if (!select) return;

        const normalizedParam = serviceParam.trim().toLowerCase();

        const option = Array.from(select.options).find((item) => {
            const value = item.value.trim().toLowerCase();
            return value === normalizedParam;
        });

        if (option) {
            select.value = option.value;
            select.classList.add("is-prefilled");
        }
    }

    

    function initJumpToFormLinks() {
        const links = document.querySelectorAll("[data-jump-to-form]");
        const formSection = document.querySelector("#contact-form");

        if (!links.length || !formSection) return;

        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();

                formSection.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                    block: "start"
                });

                const firstField = formSection.querySelector("input, select, textarea");

                if (firstField) {
                    window.setTimeout(() => {
                        firstField.focus({ preventScroll: true });
                    }, 420);
                }
            });
        });
    }

    

    function initContactOptionGlow() {
        const elements = document.querySelectorAll(
            [
                ".after-submit-step",
                ".before-submit-row",
                ".contact-option",
                ".aggregator-notice__panel",
                ".contact-form-section__notice"
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

    

    function initSubmitStepObserver() {
        const steps = document.querySelectorAll("[data-submit-step]");

        if (!steps.length || !("IntersectionObserver" in window)) return;

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

        steps.forEach((step) => observer.observe(step));
    }
})();