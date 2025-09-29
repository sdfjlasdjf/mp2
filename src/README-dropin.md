# MP2 React (TypeScript) — PokeAPI Implementation

This `src/` folder is a drop‑in for a **Create React App (TypeScript template)** project that fulfills the assignment requirements using **PokeAPI** (no API key).

## Features mapped to rubric

- **List View** (`/`): search-as-you-type (client-side), sort by **name** and **ID**, toggle **asc/desc**. Clicking an item opens **Detail View**.
- **Gallery View** (`/gallery`): image grid using official artwork; **multi-select filters** by Pokémon **type**. Clicking an item opens **Detail View**.
- **Detail View** (`/pokemon/:id`): shows attributes (height, weight, base XP, types, abilities, stats) + **Prev / Next** buttons and **←/→** keyboard shortcuts. Has its own route.
- **Routing**: React Router with `basename={process.env.PUBLIC_URL}` for GitHub Pages.
- **Axios**: API calls via `services/api.ts` (with in-memory cache).
- **TypeScript**: Strongly-typed components and API helpers.
- **Styling**: **CSS Modules**, no inline styles, responsive layout, dark theme.

## Quickstart

1. Create a CRA TS project:
   ```bash
   npx create-react-app mp2 --template typescript
   cd mp2
   ```

2. Replace the generated `src/` with this one and keep CRA's `public/` and configs:
   ```bash
   rm -rf src
   # copy the provided src into your project root
   ```

3. Install deps:
   ```bash
   npm i axios react-router-dom
   ```

4. (Optional) Set homepage for GitHub Pages in `package.json`:
   ```json
   "homepage": "https://<your-github-username>.github.io/<your-repo-name>"
   ```

5. Run it locally:
   ```bash
   npm start
   ```

6. Deploy via the provided GitHub Actions workflow (see course handout).

## Notes

- List view preloads the whole Pokédex index (names + URLs) and filters client‑side; images are computed by ID, so no per-item fetch is needed for grids.
- Gallery view fetches **type** lists and intersects them when multiple are selected ("must include all selected types").
- Detail view fetches a single Pokémon’s details on demand and uses a shared **SelectionContext** to know the current collection order for Prev/Next.
- No inline styles except tiny accessibility wrappers in Loader/Error (feel free to convert to CSS modules if you prefer strictness).

Happy hacking! ✨
