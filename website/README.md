# Vexx UI

Official website, interactive WebAssembly playground and documentation portal for
[Vexx](https://github.com/sahil-gaikwad94/veritas) — solver-guided generation you can verify.

Current release: **vexx1.5**.

## Design System

**"Cobalt Studio Sheet"** — one electric-cobalt field, one floating alabaster sheet.

- Field: cobalt `#2447DD` → `#10249B` with out-of-focus softbox streaks and a slow sheen.
- Sheet: warm porcelain `#FCFCFB`, 30–36px radius, deep soft shadow, printed micro-type.
- Accents: electric cobalt `#2447DD` / `#5A83FF`, ink `#101117`, emerald only for verified states.
- Signature motif: the fluted-glass orb — vertical refractive ribs over a cobalt radial, with
  monospace micro-labels in the grooves (`0.23 ms mask`, `425 tests`, `SHA-256`).
- Type: Plus Jakarta Sans (display, tight uppercase), Inter (body), JetBrains Mono (labels, code).

The tokens live in `src/app/vexx-theme.css`, imported by `src/app/globals.css`.

## Stack

Next.js 15 (App Router) · Fumadocs · Tailwind CSS v4 · Radix UI · Framer Motion · Shiki · KaTeX ·
Orama · `vexx-wasm` (WebAssembly).

## Local development

```bash
cd website
npm ci
npm run dev          # http://localhost:3000
npm run typecheck
npm run build
```

`npm run wasm:build` rebuilds the browser engine from `crates/vexx-wasm` and needs `wasm-pack` plus a
Rust toolchain. The site ships a deterministic stub worker so the playground still works without it.

## Deploy

Static/hybrid Next.js build, zero-cost friendly on Vercel or Render. `render.yaml` and `vercel.json`
are checked in; `NEXT_PUBLIC_SITE_URL` controls canonical URLs.
