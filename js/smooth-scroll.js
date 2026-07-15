/**
 * Smooth Scroll — lightweight lerp-based scroll smoothing
 * ---------------------------------------------------------
 * Standard technique (same idea as Lenis/Locomotive Scroll): the real
 * document scroll happens against an invisible spacer, so the native
 * scrollbar and window.scrollY stay authoritative. A fixed content layer
 * is redrawn each frame with a `transform: translateY()` that eases
 * toward that real scroll position — cheap for the browser (compositor-only,
 * no layout/paint), which is what keeps it smooth under load.
 *
 * Progressive enhancement: the fixed/transformed layout only activates
 * once this script confirms setup (adds `smooth-scroll-active` to <html>).
 * If JS fails, or the person has prefers-reduced-motion on, the page is
 * left as plain, natively-scrolling HTML — nothing here is required for
 * the page to work.
 */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return;

  const wrapper = document.getElementById("smooth-wrapper");
  const content = document.getElementById("smooth-content");
  const spacer = document.getElementById("smooth-spacer");
  if (!wrapper || !content || !spacer) return;

  const html = document.documentElement;
  const header = document.getElementById("header");

  let current = window.scrollY;
  let target = window.scrollY;
  let running = true;

  /** Keep the spacer tall enough to give the real page a native scrollbar */
  function syncHeight() {
    spacer.style.height = `${content.offsetHeight}px`;
  }

  function activate() {
    syncHeight();
    html.classList.add("smooth-scroll-active");
  }

  function onScroll() {
    target = window.scrollY;
  }

  function tick() {
    if (!running) return;
    const dist = target - current;
    // Snap when close enough to avoid endless sub-pixel jitter
    current += Math.abs(dist) < 0.05 ? dist : dist * 0.1;
    content.style.transform = `translate3d(0, ${-current}px, 0)`;
    requestAnimationFrame(tick);
  }

  /** Smoothly resolve an in-page anchor link using the same lerp loop */
  function handleAnchorClick(event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    let destinationEl;
    try {
      destinationEl = document.querySelector(hash);
    } catch (err) {
      return; // not a valid selector, let the browser handle it
    }
    if (!destinationEl) return;

    event.preventDefault();

    const headerOffset = header ? header.offsetHeight : 0;
    // destinationEl.offsetTop is relative to #smooth-content (its offsetParent,
    // since it's position:fixed) — i.e. exactly the "flow" position we want.
    let flowY = 0;
    let node = destinationEl;
    while (node && node !== content) {
      flowY += node.offsetTop;
      node = node.offsetParent;
    }
    const dest = Math.max(0, flowY - headerOffset);

    window.scrollTo({ top: dest, behavior: "auto" });
    target = dest;

    // Close the mobile menu if it was open, and update focus for accessibility
    const navMenu = document.getElementById("nav-menu");
    if (navMenu) navMenu.classList.remove("open");
    destinationEl.setAttribute("tabindex", "-1");
    destinationEl.focus({ preventScroll: true });
  }

  function init() {
    activate();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", handleAnchorClick);
    requestAnimationFrame(tick);

    // Keep the spacer accurate as content size changes (lazy images, resize, etc.)
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(() => syncHeight());
      ro.observe(content);
    } else {
      window.addEventListener("resize", syncHeight);
    }

    // Re-check shortly after full load, in case fonts/images shifted layout
    window.addEventListener("load", () => setTimeout(syncHeight, 300));
  }

  // If the person toggles reduced-motion mid-session, bail out cleanly
  reduceMotion.addEventListener("change", (e) => {
    if (e.matches) {
      running = false;
      html.classList.remove("smooth-scroll-active");
      content.style.transform = "";
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", handleAnchorClick);
    }
  });

  init();
})();
