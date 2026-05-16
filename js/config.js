"use strict";

window.SITE_CONFIG = {
    companyName: "Paneli",
    companyId: "Paneli Provider Matching LLC",

    brand: {
        shortName: "Paneli",
        tagline: "Siding made clearer.",
        secondaryTagline: "Find the right match for your home.",
        logoLabel: "Paneli home",
        logoText: "Paneli"
    },

    phone: {
        number: "(888) 555-0186",
        href: "tel:+18885550186",
        label: "Call Paneli"
    },

    email: {
        value: "hello@paneli.example",
        href: "mailto:hello@paneli.example",
        label: "Write to Paneli"
    },

    address: {
        line1: "2184 W Cedar Frame Ave",
        city: "Denver",
        state: "CO",
        zip: "80202",
        country: "USA",
        full: "2184 W Cedar Frame Ave, Denver, CO 80202, USA"
    },

    serviceArea: "USA siding provider comparison network",

    footerText:
        "Paneli helps homeowners compare independent local siding provider options across the USA.",

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice:
        "Paneli is an independent provider-matching platform. Paneli does not install, repair, replace, paint, inspect, consult, or maintain siding directly. Homeowners should verify licensing, insurance, estimates, timelines, warranties, and project details directly with any provider they choose.",

    assets: {
        logo: "./assets/icons/paneli-logo.svg",
        favicon: "./assets/icons/favicon.svg",
        images: {
            heroHome: "./assets/images/hero-home-siding.jpg",
            heroServices: "./assets/images/hero-services-siding.jpg",
            heroAbout: "./assets/images/hero-about-siding.jpg",
            heroContact: "./assets/images/hero-contact-siding.jpg",
            heroInstallation: "./assets/images/hero-installation-siding.jpg",
            heroReplacement: "./assets/images/hero-replacement-siding.jpg",
            heroRepair: "./assets/images/hero-repair-siding.jpg",
            heroConsultation: "./assets/images/hero-consultation-siding.jpg",
            serviceInstallation: "./assets/images/service-installation.jpg",
            serviceReplacement: "./assets/images/service-replacement.jpg",
            serviceRepair: "./assets/images/service-repair.jpg",
            serviceConsultation: "./assets/images/service-consultation.jpg",
            sidingTexture: "./assets/images/siding-texture-closeup.jpg",
            materialVinyl: "./assets/images/material-vinyl.jpg",
            materialFiberCement: "./assets/images/material-fiber-cement.jpg",
            materialWood: "./assets/images/material-wood.jpg",
            materialMetal: "./assets/images/material-metal.jpg",
            aboutSlideCompare: "./assets/images/about-slide-compare.jpg",
            aboutSlideOptions: "./assets/images/about-slide-options.jpg",
            aboutSlideProviderFit: "./assets/images/about-slide-provider-fit.jpg",
            aboutSlideVerify: "./assets/images/about-slide-verify.jpg",
            cta: "./assets/images/cta-siding-exterior.jpg"
        }
    },

    navigation: [
        {
            label: "Home",
            href: "index.html"
        },
        {
            label: "Services",
            href: "services.html",
            hasDropdown: true
        },
        {
            label: "About",
            href: "about.html"
        },
        {
            label: "Contact",
            href: "contact.html"
        }
    ],

    legalLinks: [
        {
            label: "Privacy Policy",
            href: "privacy-policy.html"
        },
        {
            label: "Cookie Policy",
            href: "cookie-policy.html"
        },
        {
            label: "Terms of Service",
            href: "terms-of-service.html"
        }
    ],

    services: [
        {
            id: "siding-installation",
            title: "Installation",
            shortTitle: "Installation",
            href: "siding-installation.html",
            icon: "layers",
            image: "./assets/images/service-installation.jpg",
            heroImage: "./assets/images/hero-installation-siding.jpg",
            kicker: "New siding projects",
            summary:
                "Compare independent siding provider options for new exterior cladding projects.",
            cardText:
                "Explore provider options for new siding projects, material scope, estimate detail.",
            heroTitle: "Compare Siding Installation Providers",
            heroText:
                "Paneli helps homeowners explore independent siding provider options for new exterior cladding projects. Providers are independent, and homeowners should verify project details directly.",
            overview:
                "Siding installation usually involves choosing exterior cladding, reviewing material options, comparing scope details, and understanding how the provider plans the project. Paneli helps homeowners compare independent local companies without positioning itself as the company performing the work.",
            evaluationPoints: [
                "Ask whether the provider has experience with the siding material you are considering.",
                "Review whether the estimate separates materials, labor, trim, disposal, and possible add-ons.",
                "Confirm licensing, insurance, timeline, and warranty details directly with the provider.",
                "Compare communication quality before choosing a company."
            ],
            choiceFactors: [
                "Material fit",
                "Exterior scope",
                "Timeline availability",
                "Warranty details"
            ],
            questions: [
                "Is the estimate itemized?",
                "Which siding materials are included?",
                "Are trim, flashing, and disposal listed separately?",
                "What warranty applies to materials and labor?",
                "Who handles permit questions if needed?"
            ]
        },
        {
            id: "siding-replacement",
            title: "Replacement",
            shortTitle: "Replacement",
            href: "siding-replacement.html",
            icon: "refresh-cw",
            image: "./assets/images/card-2.jpg",
            heroImage: "./assets/images/hero-replacement-siding.jpg",
            kicker: "Old siding updates",
            summary:
                "Compare provider options for removing old siding and reviewing replacement exterior cladding choices.",
            cardText:
                "Review provider options for replacement scope, disposal, materials, repair notes.",
            heroTitle: "Compare Siding Replacement Providers",
            heroText:
                "Paneli helps homeowners compare independent siding provider options for replacement projects. Homeowners choose and verify provider details directly.",
            overview:
                "Siding replacement can involve removing existing exterior cladding, reviewing the surface condition, choosing new materials, and comparing project scope. Paneli helps organize the provider comparison process while independent companies handle their own estimates and work details.",
            evaluationPoints: [
                "Ask how the provider evaluates existing siding and underlying exterior conditions.",
                "Compare how removal, disposal, trim, and material details are shown in the estimate.",
                "Verify whether repairs or prep work are listed clearly.",
                "Review warranty, timeline, and insurance directly with each provider."
            ],
            choiceFactors: [
                "Removal scope",
                "Exterior condition",
                "Material upgrade",
                "Disposal details"
            ],
            questions: [
                "Does the estimate include siding removal?",
                "Are disposal and cleanup included?",
                "What happens if hidden damage is found?",
                "Which materials are being compared?",
            ]
        },
        {
            id: "siding-repair",
            title: "Repair",
            shortTitle: "Repair",
            href: "siding-repair.html",
            icon: "wrench",
            image: "./assets/images/service-repair.jpg",
            heroImage: "./assets/images/hero-repair-siding.jpg",
            kicker: "Localized siding issues",
            summary:
                "Compare provider options for damaged panels, loose sections, moisture concerns, and visible exterior wear.",
            cardText:
                "Explore provider options for localized siding issues, repair scope, inspection notes.",
            heroTitle: "Compare Siding Repair Providers",
            heroText:
                "Paneli helps homeowners connect with independent provider options for siding repair needs. Any repair details should be confirmed directly with the selected provider.",
            overview:
                "Siding repair often starts with a visible concern: cracked panels, loose sections, exterior wear, moisture-related issues, or localized damage. Paneli helps homeowners compare independent providers who may review the issue and provide their own scope and estimate.",
            evaluationPoints: [
                "Ask whether the provider can explain the visible issue and possible repair scope.",
                "Compare whether the estimate identifies materials, labor, and affected areas.",
                "Verify whether matching existing siding is possible.",
                "Confirm provider credentials, insurance, and warranty details directly."
            ],
            choiceFactors: [
                "Damage type",
                "Material matching",
                "Moisture concerns",
                "Repair warranty"
            ],
            questions: [
                "What siding area is included in the repair scope?",
                "Can the provider match the existing siding?",
                "Are moisture-related concerns addressed?",
                "Is the estimate itemized?",
                "What warranty applies to repair work?"
            ]
        },
        {
            id: "siding-consultation",
            title: "Consultation",
            shortTitle: "Consultation",
            href: "siding-consultation.html",
            icon: "scan-search",
            image: "./assets/images/service-consultation.jpg",
            heroImage: "./assets/images/hero-consultation-siding.jpg",
            kicker: "Scope and option clarity",
            summary:
                "Compare companies that can discuss siding options, project scope, material choices, and estimate details.",
            cardText:
                "Review provider options when you want clearer siding direction before comparing estimates.",
            heroTitle: "Compare Siding Consultation Options",
            heroText:
                "Paneli helps homeowners compare independent companies that can discuss siding options, project scope, materials, and estimates. Paneli does not provide direct consulting services.",
            overview:
                "A siding consultation can help homeowners understand possible service categories, material directions, estimate structure, and provider fit. Paneli helps compare independent company options, while all advice, recommendations, and project details come directly from the provider.",
            evaluationPoints: [
                "Ask what topics the provider covers during the consultation.",
                "Compare whether material options, project scope, and estimate expectations are clearly discussed.",
                "Verify whether the company serves your area and siding goal.",
                "Confirm licensing, insurance, and any consultation fees directly."
            ],
            choiceFactors: [
                "Project clarity",
                "Material direction",
                "Estimate preparation",
                "Provider availability"
            ],
            questions: [
                "What is included in the consultation?",
                "Can the provider discuss material options?",
                "Will the provider explain estimate structure?",
                "Are there any consultation fees?",
                "Does the provider serve your ZIP code?"
            ]
        }
    ],

    materialTypes: [
        {
            title: "Classic Vinyl Look",
            material: "Vinyl Siding",
            image: "./assets/images/material-vinyl.jpg",
            text:
                "A familiar exterior direction often compared for budget, maintenance, color range, and availability."
        },
        {
            title: "Fiber Cement Finish",
            material: "Fiber Cement Siding",
            image: "./assets/images/material-fiber-cement.jpg",
            text:
                "A crisp, architectural look homeowners may compare for durability, profile, and finish options."
        },
        {
            title: "Warm Wood Accent",
            material: "Wood Siding",
            image: "./assets/images/material-wood.jpg",
            text:
                "A warmer exterior style often reviewed for texture, upkeep, character, and long-term maintenance."
        },
        {
            title: "Clean Metal Lines",
            material: "Metal Siding",
            image: "./assets/images/material-metal.jpg",
            text:
                "A sharper modern exterior direction often compared for linework, finish, and architectural appearance."
        }
    ],

    forms: {
        requestForm: {
            id: "paneli-request-form",
            title: "Request siding provider matches",
            intro:
                "Share a few details so you can compare independent siding provider options.",
            submitLabel: "Compare Provider Options",
            successMessage:
                "Your request was received. You can now compare provider options directly with independent companies.",
            errorMessage:
                "Please check the highlighted fields before submitting your request.",
            legalNote:
                "Paneli does not perform siding work directly. Providers are independent, and homeowners should verify licensing, insurance, estimates, timelines, and warranties directly."
        },
        fields: {
            fullName: {
                label: "Full Name",
                placeholder: "Your full name"
            },
            phone: {
                label: "Phone",
                placeholder: "(888) 555-0186"
            },
            email: {
                label: "Email",
                placeholder: "you@example.com"
            },
            selectedService: {
                label: "Selected Service",
                placeholder: "Choose a service"
            },
            message: {
                label: "Message",
                placeholder: "Tell us what siding goal you want to compare."
            }
        }
    },

    cookieBanner: {
        storageKey: "paneli_policy_choice_v1",
        title: "Policy preferences",
        text:
            "Paneli uses basic site preferences to improve browsing. Review our policies before continuing.",
        accept: "Accept",
        decline: "Decline",
        links: [
            {
                label: "Privacy Policy",
                href: "privacy-policy.html"
            },
            {
                label: "Cookie Policy",
                href: "cookie-policy.html"
            },
            {
                label: "Terms of Service",
                href: "terms-of-service.html"
            }
        ]
    },

    faq: {
        general: [
            {
                question: "Does Paneli perform siding work directly?",
                answer:
                    "No. Paneli is an independent provider-matching platform. Siding work is handled by independent providers, and homeowners should verify all project details directly."
            },
            {
                question: "How do I compare local siding providers?",
                answer:
                    "You can compare provider options by reviewing estimate detail, siding experience, licensing, insurance, timelines, communication, and warranty information."
            },
            {
                question: "Can I compare providers for installation, replacement, repair, or consultation?",
                answer:
                    "Yes. Paneli organizes siding provider comparison around homeowner intent: installation, replacement, repair, and consultation."
            },
            {
                question: "What should I verify before choosing a provider?",
                answer:
                    "Homeowners should verify licensing, insurance, estimate details, materials, labor scope, timelines, warranty terms, and availability directly with each provider."
            }
        ],

        home: [
            {
                question: "What does Paneli help homeowners do?",
                answer:
                    "Paneli helps homeowners compare independent siding provider options for common siding goals such as installation, replacement, repair, and consultation."
            },
            {
                question: "Are providers connected through Paneli independent?",
                answer:
                    "Yes. Providers are independent companies. Paneli does not control or guarantee any provider work, pricing, timelines, or warranties."
            },
            {
                question: "What siding details should I compare?",
                answer:
                    "Compare material options, estimate clarity, labor scope, disposal, trim details, warranty terms, licensing, insurance, and provider availability."
            },
            {
                question: "Does Paneli provide siding estimates?",
                answer:
                    "No. Paneli helps organize provider comparison, but estimates and project recommendations come directly from independent siding providers."
            }
        ],

        services: [
            {
                question: "Why are the main services not based on siding materials?",
                answer:
                    "The main services are based on homeowner intent: installation, replacement, repair, and consultation. Materials such as vinyl, fiber cement, wood, and metal are used as comparison topics inside those service paths."
            },
            {
                question: "Can I compare multiple siding service categories?",
                answer:
                    "Yes. Homeowners can review more than one service category when they are unsure whether they need installation, replacement, repair, or consultation."
            },
            {
                question: "Are estimates from providers usually free?",
                answer:
                    "That depends on each independent provider. Homeowners should ask providers directly whether estimates, consultations, or site visits have fees."
            },
            {
                question: "How many siding estimates should I compare?",
                answer:
                    "There is no single rule, but homeowners often compare more than one estimate so they can review scope, materials, labor, timelines, and warranty terms side by side. Ask each independent provider for a written breakdown."
            }
        ],

        contact: [
            {
                question: "What happens after I submit the form?",
                answer:
                    "Your request helps organize your siding provider comparison. You can then review options and communicate directly with independent companies."
            },
            {
                question: "Does submitting a form hire a contractor?",
                answer:
                    "No. Submitting a request does not hire any provider. Homeowners choose whether to contact, compare, or hire any independent company."
            },
            {
                question: "What information should I include?",
                answer:
                    "Include your siding goal, preferred service category, approximate timeline, and any important exterior details you want providers to understand."
            },
            {
                question: "What if I am not sure which service to choose?",
                answer:
                    "Pick the closest match and explain your situation in the message field. Independent providers can clarify whether you need installation, replacement, repair, or a consultation after reviewing details directly with you."
            }
        ],

        legal: [
            {
                question: "Is Paneli a siding contractor?",
                answer:
                    "No. Paneli is an independent provider-matching platform and does not perform siding installation, replacement, repair, consultation, inspection, painting, or maintenance directly."
            },
            {
                question: "Who is responsible for verifying provider credentials?",
                answer:
                    "The homeowner is responsible for verifying licensing, insurance, estimates, warranties, timelines, and all project details directly with any provider they choose."
            }
        ]
    },

    socialProof: {
        eyebrow: "Comparison clarity",
        title: "Built for homeowners who want a clearer siding decision",
        items: [
            {
                label: "4",
                value: "Service paths",
                text: "Installation, replacement, repair, and consultation organized by homeowner intent."
            },
            {
                label: "USA",
                value: "Coverage focus",
                text: "A platform structure created for comparing siding provider options across the USA."
            },
            {
                label: "Direct",
                value: "Verification reminder",
                text: "Homeowners are encouraged to verify credentials, estimates, warranties, and timelines directly."
            }
        ]
    },

    pageMeta: {
        "index.html": {
            title: "Paneli | Compare Siding Providers With Better Clarity",
            description:
                "Paneli helps homeowners compare independent siding provider options for installation, replacement, repair, and consultation."
        },
        "services.html": {
            title: "Siding Services | Paneli Provider Matching",
            description:
                "Compare siding provider options for installation, replacement, repair, and consultation through Paneli."
        },
        "about.html": {
            title: "About Paneli | Independent Siding Provider Matching",
            description:
                "Learn how Paneli helps homeowners compare independent siding provider options without performing siding work directly."
        },
        "contact.html": {
            title: "Contact Paneli | Request Siding Provider Matches",
            description:
                "Contact Paneli to request siding provider comparison options for installation, replacement, repair, or consultation."
        },
        "siding-installation.html": {
            title: "Siding Installation Provider Comparison | Paneli",
            description:
                "Compare independent siding provider options for new siding installation projects with Paneli."
        },
        "siding-replacement.html": {
            title: "Siding Replacement Provider Comparison | Paneli",
            description:
                "Compare independent siding provider options for siding replacement, removal scope, materials, and estimate clarity."
        },
        "siding-repair.html": {
            title: "Siding Repair Provider Comparison | Paneli",
            description:
                "Compare independent siding provider options for damaged panels, loose sections, visible wear, and repair scope."
        },
        "siding-consultation.html": {
            title: "Siding Consultation Provider Comparison | Paneli",
            description:
                "Compare independent companies that can discuss siding options, material direction, project scope, and estimates."
        },
        "privacy-policy.html": {
            title: "Privacy Policy | Paneli",
            description:
                "Read the Paneli Privacy Policy for information about how the provider-matching platform handles basic site and request information."
        },
        "cookie-policy.html": {
            title: "Cookie Policy | Paneli",
            description:
                "Read the Paneli Cookie Policy for information about basic site preferences and browser storage."
        },
        "terms-of-service.html": {
            title: "Terms of Service | Paneli",
            description:
                "Read the Paneli Terms of Service for use of the independent siding provider-matching platform."
        }
    },

    sectionNav: {
        "index.html": [
            {
                label: "Layers",
                href: "#paneli-layers"
            },
            {
                label: "Services",
                href: "#service-gallery"
            },
            {
                label: "Provider Fit",
                href: "#provider-fit"
            },
            {
                label: "Choose",
                href: "#before-choose"
            },
            {
                label: "Notice",
                href: "#not-contractor"
            }
        ],
        "services.html": [
            {
                label: "Services",
                href: "#service-gallery"
            },
            {
                label: "Materials",
                href: "#material-mood"
            },
            {
                label: "Estimates",
                href: "#estimate-clarity"
            },
            {
                label: "Questions",
                href: "#homeowner-questions"
            }
        ],
        "about.html": [
            {
                label: "Why",
                href: "#why-paneli"
            },
            {
                label: "Model",
                href: "#aggregator-model"
            },
            {
                label: "Compare",
                href: "#about-slideshow"
            },
            {
                label: "Verify",
                href: "#comparison-factors"
            }
        ],
        "contact.html": [
            {
                label: "After Submit",
                href: "#after-submit"
            },
            {
                label: "Checklist",
                href: "#before-submit"
            },
            {
                label: "Form",
                href: "#contact-form"
            },
            {
                label: "Notice",
                href: "#aggregator-notice"
            }
        ]
    },

    legacyReplace: {
        companyNames: [
            "Paneli",
            "Paneli Provider Matching LLC",
            "Old Company",
            "Your Company",
            "Company Name",
            "Siding Company",
            "Siding Pros",
            "Kavera",
            "AquaStep",
            "Garvox"
        ],
        phones: [
            "(888) 555-0186",
            "+18885550186",
            "(000) 000-0000",
            "(888) 555-0100",
            "(888) 555-0198"
        ],
        emails: [
            "hello@paneli.example",
            "email@example.com",
            "hello@example.com",
            "hello@kavera.example"
        ],
        addresses: [
            "2184 W Cedar Frame Ave",
            "2184 W Cedar Frame Ave, Denver, CO 80202, USA",
            "123 Main Street, USA",
            "2148 W Maple Studio Ave",
            "2148 W Maple Studio Ave, Denver, CO 80202, USA"
        ]
    }
};
