/**
 * Rahul Kumar Portfolio — Main Script
 * Handles loader, theme toggle, navigation, and scroll behavior.
 */

(function () {
  "use strict";

  /* --- DOM References --- */
  const loader = document.getElementById("loader");
  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");
  const themeToggle = document.getElementById("theme-toggle");
  const yearEl = document.getElementById("year");
  const html = document.documentElement;

  /* --- Loader --- */
  document.body.classList.add("loading");

  window.addEventListener("load", () => {
    // Minimum display time so animation is visible
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.classList.remove("loading");
      loader.setAttribute("aria-hidden", "true");
    }, 1600);
  });

  /* --- Theme Toggle --- */
  const STORAGE_KEY = "rk-theme";

  /** Default to light unless the person has explicitly chosen otherwise */
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    html.setAttribute("data-theme", saved || "light");
  }

  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  initTheme();

  /* --- Mobile Navigation --- */
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  /** Close mobile menu after link click */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* --- Active Nav Link on Scroll --- */
  const sections = document.querySelectorAll("section[id]");

  function setActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", isActive);
          if (isActive) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });

  /* --- Footer Year --- */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
