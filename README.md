# SoS: Grand Bazaar – Player Guides (React + Tailwind + shadcn/ui)

A beautiful, fast, and searchable set of consulting guides for Story of Seasons: Grand Bazaar. This app focuses on practical, in-game reference: residents’ preferences, festivals and birthdays by season/year, and detailed windmill recipes/upgrades.

This project was made entirely by AI, and can have issues that were not detected by me.

The data is intentionally isolated under `src/data` so that fixing or expanding information is simple and low-risk.

<img width="2388" height="1444" alt="image" src="https://github.com/user-attachments/assets/02578e29-b801-4148-921a-8854c566eb7c" />

---

## Quick start

```bash
# Install (pnpm recommended)
pnpm i

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview the production build
pnpm preview
```

Dev server will print the local URL. The app is a single-page application powered by Vite + React Router.

---

## Features

- **Residents directory**: filter by group (Bachelors, Bachelorettes, Villagers), instant search across names, favorites, and likes, keyboard navigation, avatar thumbnails, and deep-linking (e.g. `/?resident=Freya`).
- **Calendar**: season/year navigation with festivals auto-shifted per in‑game weekday logic, birthday overlays from residents’ data, quick filter for festivals vs birthdays, and deep-linking via URL params (`season`, `year`).
- **Windmills**: all windmill sections in a vertically-scannable layout with search, collapsible sections, sorting by sell price, and sticky context of the currently visible windmill.
- **Design system**: Tailwind CSS v4 with a polished, night-friendly “Harvest Moon” palette; shadcn/ui primitives; lucide-react icons.
- **State & routing**: Jotai for lightweight state where needed; React Router v7 for routes and URL search params.

---

## Project layout

```
src/
  components/
    layout/AppLayout.tsx   # App chrome + sidebar navigation
    Residents.tsx          # Residents guide
    Calendar.tsx           # Festivals & birthdays calendar
    Windmills.tsx          # Windmill recipes & upgrades
    ui/                    # shadcn/ui primitives (local)
  data/
    residents.ts           # Residents, favorites, likes, birthdays
    calendar.ts            # Festivals per season (+ year shifting)
    windmills.ts           # Windmills + sections + items
    types.ts               # Shared domain types
  hooks/
    use-mobile.ts          # Small responsive helpers (if needed)
  lib/
    utils.ts               # `withBase`, `cn`, misc helpers
  index.css                # Tailwind v4 + theme tokens (shadcn-compatible)
  App.tsx                  # Routes
  main.tsx                 # App bootstrap
```

- Pages are routed in `src/App.tsx` and rendered within `src/components/layout/AppLayout.tsx`.
- All player-facing data lives in `src/data`.

---

## Data-first contribution model

Most corrections or additions only require editing files in `src/data`:

- **Residents**: update or add entries in `src/data/residents.ts`. Fields include `name`, `group`, `favorite`, `likes`, and optional `birthday` with `{ season: 'Spring'|'Summer'|'Autumn'|'Winter', day: number }`.
- **Calendar**: adjust festival definitions and year‑to‑year day shifting in `src/data/calendar.ts`.
- **Windmills**: edit the hierarchy of windmills → sections → items in `src/data/windmills.ts`. Items may include `name`, `info`, `recipe`, `sellPrice`, `processTime`, `harvestTime`, and `unique`.

When the UI needs to reflect a new data field, add it to the relevant component and to the TypeScript types in `src/data/types.ts`.

---

## Contributing

Contributions are welcome! The easiest way to help:

1. Fork the repo
2. Create a branch for your change
3. Make edits (preferably only under `src/data` for factual corrections)
4. Run locally and verify
5. Open a Pull Request

- **Fixing wrong info**: usually a small change to `src/data/*` is enough.
- **New content**: add new residents, windmill items, or festivals by extending the corresponding data files.
- **UI improvements**: follow the design rules above; use shadcn/ui and Tailwind.

---

## Notes & assumptions

- The calendar implements weekday shifting across seasons/years based on a 31‑day season length and observed in‑game screenshots.
- Missing images gracefully fall back to the Vite logo.

---

## License

MIT
