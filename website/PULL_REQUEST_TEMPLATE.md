# 🚀 Veritas UI — Website Deployment PR

## Summary

This PR adds the complete **veritas-ui** website — the official marketing, interactive WebAssembly playground, and documentation portal for [Veritas](https://github.com/sahil-gaikwad94/veritas).

## What's Included

### 🎨 Design System: "Luminous Cobalt Refraction"
- Alabaster `#FAF9F6` marketing surfaces + Obsidian `#0A0D14` terminal code surfaces
- Electric Cobalt `#0047FF` / `#1E5EFF` brand spectrum
- Signature motifs: Connectly-style hero toggle, CRUNCHY fluted-glass contractor panels, concentric cobalt horizon rings, tilted 3D cobalt squircle badges

### 🛠 Tech Stack
| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router, Static/Hybrid Export) |
| Documentation | Fumadocs (core/ui/mdx) |
| Styling | Tailwind CSS v4 (CSS variables, zero runtime) |
| UI Primitives | Radix UI + shadcn/ui-style copy-paste components |
| Icons | Lucide React |
| Animations | Framer Motion |
| Code/Math | Shiki + KaTeX (compile-time) |
| WASM Runtime | `veritas-wasm` in a dedicated Web Worker |
| Search | Orama (static client-side index) |
| Fonts | Plus Jakarta Sans, Inter, JetBrains Mono |

### 📄 Documentation (37 MDX pages, Diátaxis Structure)
| Section | Pages |
|---------|-------|
| Getting Started | index, installation, quickstart, how-veritas-works |
| Authoring Schemas | verified-schema-decorator, mathematical-primitives, dynamic-containers, preflight-sat-gate, schema-synthesis |
| Engine Internals | vir-compiler-and-dag, tier0-pda, tier1-hc4-affine, tier2-nano-solver, zero-dof-jump-forward, crane-dual-mode, cdcl-jumpback, rust-native-wasm-core |
| Cartridges | overview, quant, sql, sec, or_sched, chem, phys, stat, code |
| Bridges & Integrations | vllm, sglang, llama-cpp, huggingface, outlines-guidance-lmql, async-stream-proxy, diffusion-llms |
| Proofs, RL & CLI | proof-certificates, ltlf-temporal-logic, rl-trajectory-collector, cli-reference |
| API Reference | python-public-api, rust-pyo3-native-api, wasm-browser-api, exceptions-and-diagnostics |

### 🖥 Interactive Components
- `HeroModeToggle.tsx` — Live split diff between "Standard JSON Mode" and "Veritas Solver Mode"
- `FlutedContractorVisual.tsx` — Tier-1 HC4/AF2 interval contractor visualization
- `ConcentricTierDome.tsx` — Three-tier solver horizon rings
- `CartridgeFloatingGrid.tsx` — 9 domain cartridges + 7 runtime bridges
- `SpeedupBenchmarkChart.tsx` — 17.9x Rust vs Python benchmark
- `InteractiveTraceViewer.tsx` — `veritas inspect` trace replay with timeline scrubber
- `TokenMaskHoverBox.tsx` — Per-token PDA mask inspection
- `SchemaSynthWidget.tsx` — Browser `veritas synth` widget

### 🔧 Deployment Config
- `render.yaml` — Render infrastructure-as-code
- `Dockerfile` — Optional container deployment
- `.dockerignore` — Docker build exclusions

## Deployment

Zero-cost deployment on **Render** (Free Tier). See `RENDER_DEPLOYMENT.md` for the complete step-by-step guide.

## Testing

```bash
cd website
npm install
npm run dev          # http://localhost:3000
npm run build        # Production static build
npm run typecheck    # TypeScript validation
```

## Reviewers

@sahil-gaikwad94
