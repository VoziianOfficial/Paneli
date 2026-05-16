"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", initHomePage);

    function initHomePage() {
        if (!document.body.classList.contains("home-page")) return;

        initHeroParallax();
        initLayerStepObserver();
        initSectionNavProgress();
        initPhotoCardPointerGlow();
    }

    

    function initHeroParallax() {
        const hero = document.querySelector("[data-home-hero]");
        const media = document.querySelector("[data-hero-media]");
        const lines = document.querySelector("[data-hero-lines]");

        if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let ticking = false;

        const update = () => {
            const rect = hero.getBoundingClientRect();
            const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);

            if (media) {
                media.style.transform = `translateY(${progress * 18}px) scale(1.035)`;
            }

            if (lines) {
                lines.style.transform = `translateY(${progress * -22}px)`;
            }

            ticking = false;
        };

        const requestUpdate = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        };

        update();

        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
    }

    

    function initLayerStepObserver() {
        const steps = document.querySelectorAll("[data-layer-step]");

        if (!steps.length || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle("is-visible", entry.isIntersecting);
                });
            },
            {
                root: null,
                threshold: 0.38
            }
        );

        steps.forEach((step) => observer.observe(step));
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
            links.forEach((link) => link.classList.toggle("is-active", link === activeLink));
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) return;

                const item = sections.find((section) => section.target === visible.target);
                if (item) setActive(item.link);
            },
            {
                threshold: [0.22, 0.38, 0.58],
                rootMargin: "-18% 0px -58% 0px"
            }
        );

        sections.forEach(({ target }) => observer.observe(target));
    }

    

    function initPhotoCardPointerGlow() {
        const cards = document.querySelectorAll(".service-photo-card__link, .home-hero__proof-card, .layer-step");

        if (!cards.length || window.matchMedia("(pointer: coarse)").matches) return;

        cards.forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;

                card.style.setProperty("--pointer-x", `${x}%`);
                card.style.setProperty("--pointer-y", `${y}%`);
            });

            card.addEventListener("pointerleave", () => {
                card.style.removeProperty("--pointer-x");
                card.style.removeProperty("--pointer-y");
            });
        });
    }
})();