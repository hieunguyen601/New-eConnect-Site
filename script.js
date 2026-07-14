function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en", autoDisplay: false },
    "google_translate_element"
  );
}

(function () {
  const STORAGE_KEY = "econnect-lang";
  const languageMenu = document.getElementById("language-menu");
  if (!languageMenu) return;

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "language-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      toast.classList.add("is-visible");
    });
    setTimeout(function () {
      toast.classList.remove("is-visible");
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 3000);
  }

  function markActive(lang) {
    const links = languageMenu.querySelectorAll("a[data-lang]");
    links.forEach(function (link) {
      link.setAttribute("aria-current", link.dataset.lang === lang ? "true" : "false");
    });
  }

  function resetTranslation() {
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = "en";
      combo.dispatchEvent(new Event("change"));
    }
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname;
  }

  function applyTranslation(lang, label) {
    if (lang === "en") {
      resetTranslation();
      markActive("en");
      localStorage.setItem(STORAGE_KEY, "en");
      return;
    }

    const combo = document.querySelector(".goog-te-combo");
    if (!combo) {
      showToast("Translator is still loading, please try again in a moment.");
      return;
    }

    const hasOption = Array.prototype.some.call(combo.options, function (option) {
      return option.value === lang;
    });

    if (!hasOption) {
      showToast("Sorry, translation into " + label + " isn't available yet.");
      return;
    }

    combo.value = lang;
    combo.dispatchEvent(new Event("change"));
    markActive(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  languageMenu.addEventListener("click", function (event) {
    const link = event.target.closest("a[data-lang]");
    if (!link) return;
    event.preventDefault();

    const lang = link.dataset.lang;
    const label = link.querySelector("span:last-child").textContent;
    applyTranslation(lang, label);
  });

  const savedLang = localStorage.getItem(STORAGE_KEY);
  if (savedLang && savedLang !== "en") {
    const waitForCombo = setInterval(function () {
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        clearInterval(waitForCombo);
        applyTranslation(savedLang, savedLang);
      }
    }, 300);
    setTimeout(function () {
      clearInterval(waitForCombo);
    }, 10000);
  } else {
    markActive("en");
  }
})();
