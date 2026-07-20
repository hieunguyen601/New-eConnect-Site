document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const navigation = document.getElementById("mainNavigation");

    if (navToggle && navigation) {
        navToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("mobile-open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
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
        if (!toggle) return;

        toggle.addEventListener("click", function () {
            const isOpen = dropdown.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
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
});
