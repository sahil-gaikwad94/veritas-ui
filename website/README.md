# Veritas UI

Official website, interactive WebAssembly playground, and documentation portal for [Veritas](https://github.com/sahil-gaikwad94/veritas).

## Design System

"Luminous Cobalt Refraction & Tactile Mathematical Precision"

- Alabaster `#FAF9F6` + Obsidian `#0A0D14` surfaces
- Electric Cobalt `#0047FF` / `#1E5EFF` brand spectrum
- Connectly-style hero toggle, CRUNCHY fluted-glass contractor, concentric cobalt rings, 3D squircle badges

## Tech Stack

Next.js 15 + Fumadocs + Tailwind CSS v4 + Radix UI + Framer Motion + Shiki + KaTeX + Orama + veritas-wasm (WebAssembly)

## 4-Phase Build

1. **Phase 1** — Scaffolding & WASM Build
2. **Phase 2** — Signature Landing Page & Fluted-Glass UI
3. **Phase 3** — Interactive WASM Playground & Trace Viewer
4. **Phase 4** — MDX Documentation & Zero-Cost Deploy

## Getting Started

```bash
cd website
npm install
npm run dev          # http://localhost:3000
npm run wasm:build   # Build veritas-wasm (requires wasm-pack + Rust)
npm run build        # Production static build
```

Zero-cost deployment on Vercel Free Tier or Cloudflare Pages.
