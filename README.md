# Juliana's Personal Profile Website

Two-page site built with Nuxt 4 and Tailwind CSS v4, styled after a Megamendung cloud textile.

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
```

## Folders
- `app/pages/` - `index.vue` (home) and `profile.vue`. Nuxt turns each file into a route.
- `app/components/` - auto-imported pieces: `SiteNav`, `SectionPanel`, `CloudMark`, `DriftingClouds`,
  `CursorGlow`, `TypeWriter`, `TiltFrame`, `MiniPiano`, `CopyEmail`, `BirthdayCountdown`.
- `app/layouts/` - `default.vue` wraps every page with the nav, glow effects and footer.
- `public/` - served as-is: `juliana.png`, `megamendung.svg`, `favicon.svg`.
- `app/assets/css/main.css` - the colors, glow styles and animations.

## Features
- Soft warm glow on panels, chips, buttons and nav links that gently brightens on hover
- A soft light that trails your mouse, and faint clouds drifting behind the page
- Time-aware greeting, typewriter intro line, and a photo that tilts toward your cursor
- A playable piano (tap keys or use A S D F G H J K, black keys W E T Y U)
- Beat maker: a 16-step drum and bell sequencer with tempo, "Surprise me" and Clear
- Vibe mode: a quiet ambient chord loop you can switch on from the nav bar (off by default)
- Quick menu: press Ctrl+K (or Cmd+K) to jump to pages, the piano, the beat maker, or copy/save contact info
- Profile page: copy-email button, birthday countdown, "Save my contact" (.vcf) and "Share this page"
- A thin reading-progress bar at the top and small pop-up confirmations
- Smooth fade between pages. All motion switches off for visitors who prefer reduced motion.
