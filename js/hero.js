/**
 * Hero spotlight — updates two CSS custom properties on pointer move.
 * Everything else about the hero (kinetic text reveal, ambient signal
 * lines, terminal cursor blink) is pure CSS; this is the one bit that
 * genuinely needs JS, and it only ever touches --mx/--my, so the browser
 * can handle it on the compositor without any layout or paint cost.
 */
(function () {
  "use strict";

  const hero = document.querySelector(".hero");
  if (!hero) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return;

  hero.addEventListener(
    "pointermove",
    (e) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      hero.style.setProperty("--my", `${e.clientY - rect.top}px`);
    },
    { passive: true }
  );
})();
