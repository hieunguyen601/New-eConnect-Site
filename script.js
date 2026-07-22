document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const navigation = document.getElementById("mainNavigation");

    if (navToggle && navigation) {
        navToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("mobile-open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }

    const headingButtons = document.querySelector(".heading-buttons");
    const headingButtonsHome = headingButtons ? headingButtons.parentElement : null;

    if (headingButtons && headingButtonsHome && navigation) {
        const mobileNavQuery = window.matchMedia("(max-width: 1400px)");

        function placeHeadingButtons(isMobile) {
            if (isMobile) {
                navigation.appendChild(headingButtons);
            } else {
                headingButtonsHome.appendChild(headingButtons);
            }
        }

        placeHeadingButtons(mobileNavQuery.matches);
        mobileNavQuery.addEventListener("change", function (event) {
            placeHeadingButtons(event.matches);
        });
    }

    document.querySelectorAll(".nav-item").forEach(function (item) {
        const link = item.querySelector(".nav-link");
        if (!link) return;

        link.addEventListener("click", function () {
            const isOpen = item.classList.contains("open");

            document.querySelectorAll(".nav-item.open").forEach(function (openItem) {
                if (openItem !== item) {
                    openItem.classList.remove("open");
                    const openLink = openItem.querySelector(".nav-link");
                    if (openLink) openLink.setAttribute("aria-expanded", "false");
                }
            });

            item.classList.toggle("open", !isOpen);
            link.setAttribute("aria-expanded", !isOpen ? "true" : "false");
        });
    });

    document.querySelectorAll(".language-dropdown").forEach(function (dropdown) {
        const toggle = dropdown.querySelector(".language");
        if (!toggle) return;

        toggle.addEventListener("click", function () {
            const isOpen = dropdown.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    });

    document.querySelectorAll(".divisions-dropdown").forEach(function (dropdown) {
        const toggle = dropdown.querySelector(".divisions-toggle");
        const menu = dropdown.querySelector(".divisions-menu");
        if (!toggle || !menu) return;

        function positionMenu() {
            const rect = toggle.getBoundingClientRect();
            const menuWidth = menu.offsetWidth || 300;
            let left = rect.left;
            left = Math.min(left, window.innerWidth - menuWidth - 8);
            left = Math.max(left, 8);
            menu.style.top = rect.bottom + 12 + "px";
            menu.style.left = left + "px";
        }

        toggle.addEventListener("click", function () {
            const isOpen = dropdown.classList.contains("open");
            if (!isOpen) positionMenu();
            dropdown.classList.toggle("open", !isOpen);
            toggle.setAttribute("aria-expanded", !isOpen ? "true" : "false");
        });

        dropdown.addEventListener("mouseenter", positionMenu);
    });

    document.addEventListener("click", function (event) {
        document.querySelectorAll(".nav-item.open").forEach(function (item) {
            if (!item.contains(event.target)) {
                item.classList.remove("open");
                const link = item.querySelector(".nav-link");
                if (link) link.setAttribute("aria-expanded", "false");
            }
        });

        document.querySelectorAll(".language-dropdown.open").forEach(function (dropdown) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("open");
                const toggle = dropdown.querySelector(".language");
                if (toggle) toggle.setAttribute("aria-expanded", "false");
            }
        });

        document.querySelectorAll(".divisions-dropdown.open").forEach(function (dropdown) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("open");
                const toggle = dropdown.querySelector(".divisions-toggle");
                if (toggle) toggle.setAttribute("aria-expanded", "false");
            }
        });

        if (navigation && navToggle && navigation.classList.contains("mobile-open")) {
            if (!navigation.contains(event.target) && !navToggle.contains(event.target)) {
                navigation.classList.remove("mobile-open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        }
    });

    window.addEventListener("scroll", function () {
        document.querySelectorAll(".divisions-dropdown.open").forEach(function (dropdown) {
            dropdown.classList.remove("open");
            const toggle = dropdown.querySelector(".divisions-toggle");
            if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
    }, { passive: true });

    document.querySelectorAll(".site-footer_accordion").forEach(function (section) {
        const toggle = section.querySelector(".site-footer_accordion-toggle");
        if (!toggle) return;

        toggle.addEventListener("click", function () {
            const isOpen = section.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    });

    document.querySelectorAll(".department-menu").forEach(function (menu) {
        const toggle = menu.querySelector(".department-menu_toggle");
        if (!toggle) return;

        toggle.addEventListener("click", function () {
            const isOpen = menu.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    });

    document.addEventListener("click", function (event) {
        document.querySelectorAll(".department-menu.open").forEach(function (menu) {
            if (!menu.contains(event.target)) {
                menu.classList.remove("open");
                const toggle = menu.querySelector(".department-menu_toggle");
                if (toggle) toggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    document.querySelectorAll(".hr-accordion_item").forEach(function (item) {
        const toggle = item.querySelector(".hr-accordion_toggle");
        if (!toggle) return;

        toggle.addEventListener("click", function () {
            const isOpen = item.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    });

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            backToTop.classList.toggle("visible", window.scrollY > 400);
        }, { passive: true });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
