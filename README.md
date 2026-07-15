# Rahul Kumar — R-X02 Portfolio

A single-page portfolio with a teal accent theme (`#599692`), Syne Mono typography,
a kinetic-text hero, custom smooth scrolling, and light/dark mode support (light by default).

**Live site:** [r-x02.netlify.app](https://r-x02.netlify.app/)

## Quick Start

Open `index.html` in a browser, or serve locally:

```bash
npx serve .
```

## Asset Placement

Place your image files in `assets/images/`:

| File | Purpose | Recommended Specs |
|------|---------|-------------------|
| `profile.png` | About section portrait | PNG/JPG, portrait orientation |
| `favicon.png` | Browser tab icon | PNG, 32×32px |
| `apple-touch-icon.png` | iOS home-screen / OG preview icon | PNG, 180×180px |

An SVG fallback is used for the profile photo until a portrait is added, and
`favicon.png` / `apple-touch-icon.png` are generated from `favicon.svg` — regenerate
them the same way if you update the monogram.

## Hero

No boxed illustration — the hero is full-bleed: a faint animated circuit-line
background, a cursor-reactive spotlight (`js/hero.js`), a kinetic line-by-line
headline reveal on load, and a borderless terminal-style panel (`$ whoami` /
`$ status`) that fits the developer identity instead of decorating it. All of
it (including the cursor spotlight and reveal animation) is disabled under
`prefers-reduced-motion`, falling back to a static, fully-visible layout.

## Smooth Scroll

`js/smooth-scroll.js` implements a lightweight lerp-based scroll smoother
(the same idea as Lenis): the real page scrolls against an invisible spacer,
and a fixed content layer is redrawn each frame with a `transform` that eases
toward that position — cheap for the browser since it's compositor-only work,
which is what keeps it smooth. It's progressive enhancement: the fixed/transform
layout only turns on once the script confirms setup (`html.smooth-scroll-active`),
so the page scrolls natively with no JS, and is skipped entirely under
`prefers-reduced-motion`. In-page anchor links (nav, footer, hero CTAs) are
intercepted and resolved through the same easing loop.

## Theme Behavior

- The site opens in **light mode by default**, regardless of system preference.
- Toggling the theme saves your choice in `localStorage` and is remembered on return visits.
- A small inline script in `<head>` prevents a flash of the wrong theme on load.
- Accent color is `#599692`; small text uses a theme-tuned `--color-accent-text`
  variant (not the raw accent) to keep WCAG AA contrast on both themes.

## Projects Section

Project cards are sourced from real repos at
[github.com/r-x02](https://github.com/r-x02) (descriptions and live-demo links
pulled from each repo's README) and hand-written into the HTML rather than
fetched client-side — keeps the page fast and avoids the public GitHub API's
unauthenticated rate limit affecting real visitors. Update the two
`.project__card` blocks in `index.html` directly when projects change.

## Contact

- **Email:** rahul.ncworker@gmail.com
- **GitHub:** [github.com/r-x02](https://github.com/r-x02)
- **LinkedIn:** [linkedin.com/in/r-x02](https://www.linkedin.com/in/r-x02/)

## Project Structure

```
rahul-kumar-portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── js/hero.js
├── js/smooth-scroll.js
├── assets/images/
└── README.md
```

