"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", initAboutPage);

    function initAboutPage() {
        if (!document.body.classList.contains("about-page")) return;

        initAboutSlideshow();
        initSectionNavProgress();
        initPointerGlow();
    }

    /* ==================================================
       ABOUT SLIDESHOW
    ================================================== */

    function initAboutSlideshow() {
        const root = document.querySelector("[data-about-slideshow]");
        if (!root) return;

        const slides = Array.from(root.querySelectorAll("[data-about-slide]"));
        const dots = Array.from(root.querySelectorAll("[data-about-slide-dot]"));
        const eyebrow = root.querySelector("[data-about-slide-eyebrow]");
        const title = root.querySelector("[data-about-slide-title]");
        const text = root.querySelector("[data-about-slide-text]");

        if (!slides.length || !dots.length) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let activeIndex = 0;
        let autoplayTimer = null;
        let isPaused = false;

        const slideData = [
            {
                eyebrow: "Compare",
                title: "Compare siding provider options",
                text:
                    "Paneli helps homeowners organize siding provider comparison without presenting itself as the company performing the project."
            },
            {
                eyebrow: "Options",
                title: "Understand service categories",
                text:
                    "Installation, replacement, repair, and consultation are separated by homeowner intent so the comparison path feels clearer."
            },
            {
                eyebrow: "Provider Fit",
                title: "Review provider fit carefully",
                text:
                    "Homeowners can compare experience, estimate detail, communication, availability, licensing, insurance, and warranty information."
            },
            {
                eyebrow: "Verify",
                title: "Verify before choosing",
                text:
                    "Providers are independent. Homeowners should verify credentials, estimates, timelines, warranties, and project details directly."
            }
        ];

        const setActiveSlide = (nextIndex) => {
            activeIndex = normalizeIndex(nextIndex, slides.length);

            slides.forEach((slide, index) => {
                const isActive = index === activeIndex;
                slide.classList.toggle("is-active", isActive);
                slide.setAttribute("aria-hidden", String(!isActive));
            });

            dots.forEach((dot, index) => {
                const isActive = index === activeIndex;
                dot.classList.toggle("is-active", isActive);
                dot.setAttribute("aria-selected", String(isActive));
                dot.setAttribute("tabindex", isActive ? "0" : "-1");
            });

            updateCopy(slideData[activeIndex] || slideData[0]);
        };

        const updateCopy = (data) => {
            if (eyebrow) eyebrow.textContent = data.eyebrow;
            if (title) title.textContent = data.title;
            if (text) text.textContent = data.text;
        };

        const startAutoplay = () => {
            if (prefersReducedMotion || isPaused || slides.length < 2) return;

            stopAutoplay();

            autoplayTimer = window.setInterval(() => {
                if (!isPaused) {
                    setActiveSlide(activeIndex + 1);
                }
            }, 5200);
        };

        const stopAutoplay = () => {
            if (autoplayTimer) {
                window.clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        };

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                setActiveSlide(index);
                startAutoplay();
            });

            dot.addEventListener("keydown", (event) => {
                if (event.key === "ArrowRight") {
                    event.preventDefault();
                    setActiveSlide(activeIndex + 1);
                    dots[activeIndex].focus();
                }

                if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    setActiveSlide(activeIndex - 1);
                    dots[activeIndex].focus();
                }

                if (event.key === "Home") {
                    event.preventDefault();
                    setActiveSlide(0);
                    dots[activeIndex].focus();
                }

                if (event.key === "End") {
                    event.preventDefault();
                    setActiveSlide(slides.length - 1);
                    dots[activeIndex].focus();
                }
            });
        });

        root.addEventListener("mouseenter", () => {
            isPaused = true;
            stopAutoplay();
        });

        root.addEventListener("mouseleave", () => {
            isPaused = false;
            startAutoplay();
        });

        root.addEventListener("focusin", () => {
            isPaused = true;
            stopAutoplay();
        });

        root.addEventListener("focusout", () => {
            isPaused = false;
            startAutoplay();
        });

        setActiveSlide(0);
        startAutoplay();
    }

    function normalizeIndex(index, length) {
        if (index < 0) return length - 1;
        if (index >= length) return 0;
        return index;
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
       POINTER GLOW
    ================================================== */

    function initPointerGlow() {
        const elements = document.querySelectorAll(
            [
                ".why-paneli__visual",
                ".model-step",
                ".about-do-not__panel",
                ".factor-row",
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
})();