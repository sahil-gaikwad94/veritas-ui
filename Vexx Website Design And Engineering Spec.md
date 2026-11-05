# Vexx Official Website & Documentation Portal — Design, UI/UX, Frontend & Systems Architecture Specification (`v1.0`)

**Target Repository:** [`https://github.com/sahil-gaikwad94/veritas`](https://github.com/sahil-gaikwad94/veritas) (47 commits on `main`, Hybrid Rust `vexx-core` / `vexx-py` / `vexx-wasm` + Python 3.11+ engine)  
**Infrastructure Constraint:** 100% Zero-Cost, Open-Source Stack ($0/month hosting, $0/month compute via client-side WebAssembly execution, $0/month static search & analytics)

---

## 1. Visual Language & Aesthetic Direction: *"Luminous Cobalt Refraction & Tactile Mathematical Precision"*

### 1.1 Decoding the Uploaded Reference Images & Translating Them to Vexx

The two reference designs establish a distinct, high-craft visual language that contrasts **warm, airy alabaster surfaces** with **deep electric cobalt-blue optical geometry**. Rather than copying them generically, we translate every visual motif directly into Vexx's core mathematical identity:

| Reference Visual Motif | Source Reference | How Vexx Adapts It Into a Signature Engineering Motif |
| :--- | :--- | :--- |
| **Inline 3D Pill Toggle Inside the Hero Headline** | Reference 1 (`Connectly` — *"Power Up [●] Connectly"*) | **The Live "Mode Switch" Hero Headline:** *"Turn Probabilistic Guessing `[ ● ]` Into Verified Mathematical Truth."* Clicking the 3D cobalt toggle switches the entire hero code/token stream live between **Unconstrained LLM Mode** (red hallucinated portfolio weights summing to `1.18`, broken Sharpe ratio) and **Vexx Solver Mode** (cobalt `0.23 ms` PDA mask, `0-DoF` green token splice, and `SHA-256` proof badge). |
| **Concentric 3D Cobalt-to-Azure Horizon Rings** | Reference 1 (`Connectly` bottom radial dome) | **The Three-Tier Solver Horizon:** Three luminous, inner-lit concentric cobalt arcs rising behind the interactive playground, representing Vexx's three verification tiers: **Outer Ring = Tier 0** (`JSONPushdownAutomaton`, `0.23 ms`), **Middle Ring = Tier 1** (`Hc4AffineContractor`, `3.9 µs` numeric prefix bounds), and **Core Ring = Tier 2** (`VexxNanoSolver` + `CdclJumpbackEngine` + `0-DoF` splice). |
| **Floating 3D Glossy Squircle App Badges** | Reference 1 (`Connectly` floating tilted icons) | **Tactile Cartridge & Bridge Squircles:** Floating, softly tilted (`-6deg` to `+8deg`) 3D cobalt squircle badges with inner top specular highlights and diffused blue drop shadows representing the **9 Domain Cartridges** (`quant`, `sql`, `sec`, `chem`, `phys`, `or_sched`) and **7 Runtime Bridges** (`vLLM`, `SGLang`, `llama.cpp`, `Outlines`, `Pydantic`). |
| **Vertical Fluted / Ribbed Glass Columns Over a Cobalt Sphere** | Reference 2 (`CRUNCHY` — ribbed glass vertical louvers with micro-labels) | **The "Interval Contractor" Fluted Glass Shader:** An electric cobalt radial gradient (`#0047FF` $\rightarrow$ `#3B82F6`) viewed through vertical fluted-glass columns (`backdrop-filter: blur(22px)` + repeating vertical specular ridges). Visually, the diffuse blue sphere represents the LLM's raw probability distribution, and the vertical glass louvers represent **HC4/AF2 interval domain cuts** slicing continuous chaos into discrete, verified intervals—with floating monospace callouts (`0.23 ms mask`, `0-DoF splice`, `499 tests`) anchored inside individual columns. |
| **Editorial Swiss Asymmetric Framing** | Reference 2 (`CRUNCHY` — alabaster left column + cobalt glass right field) | **Dual-Surface Architecture:** Marketing and conceptual sections use **Alabaster Daylight (`#FAF9F6`)** with deep ink typography and cobalt glass accents for maximum approachability and visual punch, while code blocks, trace inspectors, and the documentation reader support a seamless toggle into **Obsidian Terminal Mode (`#0A0D14`)**. |

---

## 2. Complete Design System & Token Architecture

### 2.1 Color Palette (OKLCH & Hex Tokens)

```css
:root {
  /* === SURFACES (ALABASTER DAYLIGHT - DEFAULT MARKETING & DOCS LIGHT) === */
  --bg-canvas: #FAF9F6;           /* Warm Porcelain / Alabaster (from Ref 1 & 2) */
  --bg-elevated: #FFFFFF;         /* Pure White Card Surface */
  --bg-glass: rgba(255, 255, 255, 0.72);
  --bg-subtle: #F1F4F9;           /* Cool Alabaster Secondary Surface */

  /* === COBALT & AZURE SPECTRUM (CORE BRAND & SOLVER GEOMETRY) === */
  --cobalt-900: #061B52;          /* Deepest Ultramarine Core */
  --cobalt-700: #0038CC;          /* High-Contrast Structural Cobalt */
  --cobalt-600: #0047FF;          /* Electric Refracted Cobalt (Ref 2 Sphere Core) */
  --cobalt-500: #1E5EFF;          /* Primary Interactive Cobalt (Ref 1 Toggle & CTA) */
  --cobalt-400: #4B83FF;          /* Mid-Ring Luminous Azure */
  --cobalt-300: #8AB4FF;          /* Outer-Ring Soft Sky Glow */
  --cobalt-100: #DCE8FF;          /* Pill Badge Tint & Selection Highlight */

  /* === SEMANTIC VERIFICATION TOKENS (MATCHING `vexx inspect` CLI) === */
  --verify-pass: #059669;         /* 0-DoF Splice & Verified PASS Emerald */
  --verify-pass-bg: #D1FAE5;
  --verify-warn: #D97706;         /* CDCL Backtrack / Domain-Cut Amber */
  --verify-warn-bg: #FEF3C7;
  --verify-fail: #E11D48;         /* Masked Token (-inf) / UNSAT Crimson */
  --verify-fail-bg: #FFE4E6;

  /* === TYPOGRAPHY & BORDERS === */
  --ink-primary: #14151A;         /* Deep Charcoal Ink (Ref 1 Headline) */
  --ink-secondary: #4A5060;       /* Balanced Slate Body Copy */
  --ink-muted: #7B8398;           /* Monospace Metadata & Coordinates */
  --border-subtle: rgba(20, 21, 26, 0.08);
  --border-cobalt: rgba(30, 94, 255, 0.24);
}

.dark {
  /* === SURFACES (OBSIDIAN TERMINAL - DOCS & PLAYGROUND DARK MODE) === */
  --bg-canvas: #090C15;
  --bg-elevated: #101626;
  --bg-glass: rgba(16, 22, 38, 0.75);
  --bg-subtle: #161F36;
  --ink-primary: #F8FAFC;
  --ink-secondary: #94A3B8;
  --ink-muted: #64748B;
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-cobalt: rgba(75, 131, 255, 0.35);
}
```

### 2.2 Typography Scale & Open-Source Font Pairing

All fonts are 100% free via `next/font/google` with zero external network requests at runtime:

* **Display & Headlines (`--font-display`):** **Plus Jakarta Sans** (Weights `600`, `700`, `800`; tight tracking `-0.03em`) — captures the clean, geometric, friendly-yet-authoritative character of the *Connectly* headline.
* **Editorial & Body Copy (`--font-sans`):** **Inter** (Weights `400`, `500`, `600`; tracking `-0.01em`, line-height `1.65`) — effortless readability across long-form mathematical documentation.
* **Code, AST, & Interval Bounds (`--font-mono`):** **JetBrains Mono** (Weights `400`, `500`, `600`; ligatures enabled for `->`, `<=`, `>=`, `==`) — used for Python schemas, SMT-LIB2 certificates, token bitmasks, and fluted-glass micro-coordinates.

| Role | Token | Fluid Size (`clamp`) | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | `text-hero` | `clamp(2.75rem, 5.5vw, 4.75rem)` | `1.06` | `-0.035em` |
| **Section Title (`H2`)** | `text-h2` | `clamp(2rem, 3.5vw, 3rem)` | `1.12` | `-0.025em` |
| **Subsystem Heading (`H3`)** | `text-h3` | `clamp(1.35rem, 2vw, 1.75rem)` | `1.25` | `-0.015em` |
| **Docs Body Copy** | `text-body` | `1.0625rem` (`17px`) | `1.68` | `-0.005em` |
| **Code & Telemetry** | `text-code` | `0.875rem` (`14px`) | `1.6` | `0em` |

### 2.3 Signature CSS Recipes (Derived from Reference Images)

#### A. Fluted / Ribbed Glass Contractor Surface (Reference 2 — `CRUNCHY` Effect)
```css
/* Sits over an animated radial cobalt orb to create vertical refractive louvers */
.vexx-fluted-glass {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  background: radial-gradient(
    circle at 68% 52%,
    #0047FF 0%,
    #1E5EFF 34%,
    #6AA2FF 58%,
    #FAF9F6 82%
  );
}

.vexx-fluted-louvers {
  position: absolute;
  inset: 0;
  /* Repeating 88px vertical glass ribs with refractive specular edges */
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.18) 0px,
    rgba(255, 255, 255, 0.02) 14px,
    rgba(6, 27, 82, 0.14) 72px,
    rgba(255, 255, 255, 0.32) 88px
  );
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
}
```

#### B. Tactile 3D Cobalt Squircle Badge & Inner-Lit CTA (Reference 1 — `Connectly` Effect)
```css
.vexx-cobalt-squircle {
  border-radius: 22px;
  background: linear-gradient(145deg, #3B76FF 0%, #1146E8 65%, #0932B5 100%);
  box-shadow:
    0 20px 38px -10px rgba(20, 78, 255, 0.42),
    0 4px 12px -2px rgba(20, 78, 255, 0.25),
    inset 0 2px 3px rgba(255, 255, 255, 0.55),
    inset 0 -3px 6px rgba(4, 18, 74, 0.45);
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.vexx-cobalt-squircle:hover {
  transform: translateY(-6px) rotate(0deg) scale(1.04);
}
```

#### C. Concentric 3D Cobalt Horizon Rings (Reference 1 Bottom Dome)
```css
.vexx-horizon-ring {
  border-radius: 9999px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(138, 180, 255, 0.25) 0%,
    rgba(30, 94, 255, 0.72) 72%,
    rgba(0, 71, 255, 0.92) 100%
  );
  box-shadow:
    inset 0 8px 24px rgba(255, 255, 255, 0.65),
    0 -12px 48px rgba(30, 94, 255, 0.28);
}
```

---

## 3. Zero-Cost Technical & System Architecture

### 3.1 Curated Free & Open-Source Tech Stack

| Layer | Technology Choice | Why It Fits Vexx (100% Free & Open Source) |
| :--- | :--- | :--- |
| **Core Web Framework** | **[Next.js 15](https://nextjs.org/) (App Router, Static/Hybrid Export)** | Zero-cost hosting on Vercel or Cloudflare Pages; React Server Components compile heavy MDX + LaTeX math at build time with zero client JS bloat. |
| **Documentation Engine** | **[Fumadocs](https://www.fumadocs.dev/) (`fumadocs-ui` + `fumadocs-mdx`)** | Next.js-native, headless Radix/Tailwind architecture, built-in TOC scroll-spy, breadcrumbs, version switcher, and custom interactive MDX components. |
| **Styling & UI Primitives** | **[Tailwind CSS v4](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) + [Lucide Icons](https://lucide.dev/)** | Zero runtime CSS overhead, full keyboard accessibility, and effortless customization for the Alabaster/Cobalt/Obsidian palette. |
| **Code & Math Rendering** | **[Shiki](https://shiki.style/) + `rehype-katex` ([KaTeX](https://katex.org/))** | Compile-time dual-theme syntax highlighting for Python, Rust, JSON, and SMT-LIB2, plus zero-JS build-time rendering for $O(\|V\| \cdot L)$, $\text{HC4}$, and $\text{AF2}$ equations. |
| **In-Browser Engine Runtime** | **`vexx-wasm` (`crates/vexx-wasm`) in a Web Worker** | Compiles your existing Rust `vexx-core` crate via `wasm-pack build --target web`. Runs `PdaHandle`, `prefix_status`, `is_valid_document`, and `mask_json` natively in the user's browser at **0.23 ms/step** with **$0 server cost**! |
| **Interactive Python Sandbox** | **[Pyodide](https://pyodide.org/) (Lazy-Loaded Web Worker)** | Optional "Run Full Python `@verified_schema`" button in docs that loads the pure-Python `vexx` wheel in browser WASM for live AST transpilation (`check_spec`, `synth`, `verify_instance`) without a backend server. |
| **Search Engine** | **[Orama](https://oramasearch.com/) (Static Client-Side Index)** | Generates a compressed JSON search index at build time (`Cmd + K` modal) supporting instant fuzzy search across guides, API symbols, and cartridges at $0 cost. |
| **Architecture & Flow Diagrams** | **Inline Luminous SVGs + [React Flow](https://reactflow.dev/) (MIT)** | Renders the Bipartite 0-DoF Dependency DAG (`DependencyGraph`) and CDCL Jumpback tree interactively. |

### 3.2 End-to-End System Topology (Zero Backend Compute Cost)

```svg
<svg viewBox="0 0 680 272" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root {
      --lumi-ink: light-dark(#000000, #e0e0e0);
      --lumi-muted: light-dark(rgba(0,0,0,0.55), rgba(255,255,255,0.55));
      --lumi-dim: light-dark(#f2f0f0, #242528);
      --lumi-container: light-dark(#e8e6e6, #2d2f33);
      --lumi-outline: light-dark(#727676, #9a9b9c);
      --lumi-accent-bg: light-dark(#dcf1ff, #192967);
      --lumi-primary: light-dark(#3186ff, #9dd2ff);
      --lumi-sans: 'Google Sans Flex', var(--font-family, 'Google Sans', sans-serif);
      --lumi-mono: 'Google Sans Code', ui-monospace, monospace;
    }
    :where(path, polyline, polygon, circle, ellipse, rect):where(:not([fill], [fill] *)) { fill: none; }
    text { font-weight: 400; stroke: none; }
    .t-l1 { font-family: var(--lumi-sans); font-size: 15px; fill: var(--lumi-ink); }
    .t-l2 { font-family: var(--lumi-mono); font-size: 13px; font-style: italic; fill: var(--lumi-ink); }
    .t-l4 { font-family: var(--lumi-sans); font-size: 13px; fill: var(--lumi-muted); }
    .node-step { fill: var(--lumi-dim); stroke: none; }
    .node-focal { fill: var(--lumi-accent-bg); stroke: var(--lumi-primary); stroke-width: 1.25; }
    .node-store { fill: var(--lumi-container); stroke: var(--lumi-outline); stroke-width: 1; }
    .edge-arrow { fill: none; stroke: var(--lumi-ink); stroke-width: 1.3; stroke-linecap: round; stroke-dasharray: 0 4; marker-end: url(#lumi-caret-arch); }
  </style>
  <defs>
    <marker id="lumi-caret-arch" viewBox="0 0 10 10" refX="7.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto">
      <path d="M 3 1.2 L 7.5 5 L 3 8.8" fill="none" stroke="var(--lumi-ink)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <rect class="node-step" x="20" y="24" width="172" height="80" rx="40"/>
  <text class="t-l1" x="106" y="55" text-anchor="middle" dominant-baseline="central">GitHub CI Build</text>
  <text class="t-l2" x="106" y="77" text-anchor="middle" dominant-baseline="central">wasm-pack + MDX</text>

  <line class="edge-arrow" x1="200" y1="64" x2="246" y2="64"/>

  <rect class="node-store" x="254" y="24" width="172" height="80" rx="40"/>
  <text class="t-l1" x="340" y="55" text-anchor="middle" dominant-baseline="central">Vercel Edge CDN</text>
  <text class="t-l4" x="340" y="77" text-anchor="middle" dominant-baseline="central">Static + Shiki</text>

  <line class="edge-arrow" x1="434" y1="64" x2="480" y2="64"/>

  <rect class="node-focal" x="488" y="24" width="172" height="80" rx="40"/>
  <text class="t-l1" x="574" y="55" text-anchor="middle" dominant-baseline="central">Next.js 15 UI</text>
  <text class="t-l2" x="574" y="77" text-anchor="middle" dominant-baseline="central">Fumadocs + Lumi</text>

  <line class="edge-arrow" x1="574" y1="112" x2="574" y2="160"/>

  <rect class="node-focal" x="488" y="168" width="172" height="80" rx="40"/>
  <text class="t-l1" x="574" y="199" text-anchor="middle" dominant-baseline="central">vexx-wasm</text>
  <text class="t-l2" x="574" y="221" text-anchor="middle" dominant-baseline="central">PdaHandle 0.23ms</text>

  <line class="edge-arrow" x1="480" y1="208" x2="434" y2="208"/>

  <rect class="node-step" x="254" y="168" width="172" height="80" rx="40"/>
  <text class="t-l1" x="340" y="199" text-anchor="middle" dominant-baseline="central">Pyodide Worker</text>
  <text class="t-l2" x="340" y="221" text-anchor="middle" dominant-baseline="central">AST -&gt; VirSpec</text>

  <line class="edge-arrow" x1="246" y1="208" x2="200" y2="208"/>

  <rect class="node-store" x="20" y="168" width="172" height="80" rx="40"/>
  <text class="t-l1" x="106" y="199" text-anchor="middle" dominant-baseline="central">Trace &amp; Proof</text>
  <text class="t-l4" x="106" y="221" text-anchor="middle" dominant-baseline="central">SHA-256 + SMT2</text>
</svg>
```

### 3.3 Proposed Monorepo Integration (`website/` Workspace)

Add `website/` directly to your existing [`sahil-gaikwad94/veritas`](https://github.com/sahil-gaikwad94/veritas) repository (or as a standalone repo that pulls `crates/vexx-wasm` and `python/vexx`):

```text
vexx/
├── crates/
│   ├── vexx-core/              # Existing 15-module dependency-free Rust engine
│   ├── vexx-py/                # Existing PyO3 native extension
│   └── vexx-wasm/              # Existing WASM crate (expand exports for full playground)
├── python/vexx/                # Existing Python reference engine & CLI
└── website/                       # NEW: Official Marketing, Playground & Docs Portal
    ├── package.json
    ├── next.config.mjs            # Configured with Fumadocs MDX, KaTeX, & WASM experiments
    ├── source.config.ts           # Fumadocs content collections & Shiki custom grammar
    ├── public/
    │   ├── wasm/                  # Output of `wasm-pack build crates/vexx-wasm --target web`
    │   │   ├── vexx_wasm_bg.wasm
    │   │   └── vexx_wasm.js
    │   └── traces/                # Pre-generated JSON traces from `vexx inspect --json`
    │       ├── portfolio_0dof.json
    │       ├── sql_injection_block.json
    │       └── cdcl_jumpback_demo.json
    ├── content/
    │   └── docs/                  # Complete MDX documentation tree (see File 2)
    └── src/
        ├── app/
        │   ├── layout.tsx         # Plus Jakarta Sans + Inter + JetBrains Mono + Orama Search
        │   ├── page.tsx           # Flagship Landing Page (Connectly + Crunchy aesthetic)
        │   ├── playground/
        │   │   └── page.tsx       # Full-screen WASM Token Masker & Trace Inspector
        │   ├── verify/
        │   │   └── page.tsx       # Offline SHA-256 + SMT-LIB2 Proof Certificate Verifier
        │   └── docs/
        │       └── [[...slug]]/
        │           └── page.tsx   # Fumadocs dynamic MDX documentation route
        ├── workers/
        │   └── vexx-wasm.worker.ts  # Dedicated Web Worker wrapping `vexx-wasm`
        └── components/
            ├── landing/
            │   ├── HeroModeToggle.tsx          # Connectly-style inline 3D toggle + live split diff
            │   ├── FlutedContractorVisual.tsx  # Crunchy-style ribbed glass interval slicer
            │   ├── ConcentricTierDome.tsx      # 3-Tier concentric cobalt horizon rings
            │   ├── CartridgeFloatingGrid.tsx   # 9 tilted 3D cobalt squircle badges + drawer
            │   └── SpeedupBenchmarkChart.tsx   # Interactive 17.9x Rust vs Python bar comparison
            └── docs/
                ├── InteractiveTraceViewer.tsx  # React port of `vexx inspect` HTML trace table
                ├── TokenMaskHoverBox.tsx       # Shows allowed/masked tokens at any prefix
                └── SchemaSynthWidget.tsx       # Browser widget for `vexx synth --from-json`
```

---

## 4. Expanding `crates/vexx-wasm` for a Live 60-FPS Browser Playground

Your current [`crates/vexx-wasm/src/lib.rs`](https://github.com/sahil-gaikwad94/veritas/blob/main/crates/vexx-wasm/src/lib.rs) already exports `version()`, `prefix_status(text)`, `is_valid_document(text)`, and `PdaHandle` (`new`, `push`, `is_alive`, `is_complete`, `accepts`, `depth`, `mask_json`).

By adding **three small wrapper functions** to `crates/vexx-wasm/src/lib.rs` (calling functions that already exist in `crates/vexx-core` and `crates/vexx-py/src/lib.rs`), your website's browser playground can run the **entire Tier-0 + Tier-1 + Tier-2 Rust engine client-side**:

```rust
// Additions to crates/vexx-wasm/src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn numeric_prefix_bounds(prefix: &str) -> String {
    // Exposes vexx_core::interval::Interval::from_numeric_prefix to the browser UI
    match vexx_core::interval::Interval::from_numeric_prefix(prefix) {
        Some(iv) => serde_json::json!({ "lo": iv.lo, "hi": iv.hi, "valid": true }).to_string(),
        None => serde_json::json!({ "valid": false }).to_string(),
    }
}

#[wasm_bindgen]
pub fn contract_intervals_json(spec_json: &str) -> String {
    // Runs vexx_core::contractor::contract in WASM and returns narrowed [lo, hi] boxes
    vexx_core::wire::contract_json_wire(spec_json)
}

#[wasm_bindgen]
pub fn emit_smtlib2_certificate(spec_json: &str, instance_json: &str) -> String {
    // Generates the self-contained SMT-LIB2 proof script directly in the browser
    vexx_core::smt_bridge::render_smt2_from_wire(spec_json, instance_json)
}
```

---

## 5. Signature UI Components & Production Code Blueprints

### 5.1 Hero Section (`HeroModeToggle.tsx`) — Merging Reference 1 & Reference 2

**Visual & Interaction Choreography:**
1. **Top Pill Announcement:** `[v2.0] Pure-Rust Native Engine • 17.9x Faster Token Masking (0.23 ms) →`
2. **Headline with Embedded 3D Toggle (from Reference 1):**
   `Turn LLM Guessing [ ● ] Into Verified Mathematical Truth`
3. **Interactive State Machine:**
   - **Toggle OFF ("Standard JSON Mode"):** The right-hand fluted glass preview card glows warm rose (`#FFE4E6`), showing an LLM generating `{"weights": {"AAPL": 0.55, "MSFT": 0.45, "NVDA": 0.18}, "sharpe_ratio": 1.42}`—Valid JSON syntax, **BROKEN math** ($\sum w = 1.18 \neq 1.0$, hallucinated Sharpe ratio).
   - **Toggle ON ("Vexx Solver Mode" — Default):** The toggle slides right with a crisp spring (`stiffness: 400, damping: 28`), lighting up the concentric cobalt rings and fluted glass columns:
     - Shows `p.weights["NVDA"]` automatically constrained to `[0.00, 0.00]` or `0.20` via `Hc4AffineContractor` in `3.9 µs`.
     - Shows `expected_return`, `volatility`, and `sharpe_ratio` highlighted in **Emerald `#059669` (`0-DoF Jump-Forward Splice — 0 LLM Tokens Sampled`)**.
     - Displays a clickable `SHA-256 Proof Verified` badge that opens the live SMT-LIB2 certificate drawer.

```tsx
// website/src/components/landing/HeroModeToggle.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle, Sparkles, Terminal, ArrowRight, Check, Copy } from "lucide-react";

export function HeroModeToggle() {
  const [vexxEnabled, setVexxEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("pip install vexx-ai");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="relative min-h-[92vh] bg-[#FAF9F6] text-[#14151A] overflow-hidden pt-24 pb-32 px-6">
      {/* Concentric Cobalt Horizon Rings (Reference 1 Bottom Dome) */}
      <div className="pointer-events-none absolute left-1/2 -bottom-[420px] -translate-x-1/2 w-[1100px] h-[1100px] rounded-full bg-gradient-to-t from-[#0047FF]/35 via-[#1E5EFF]/15 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute left-1/2 -bottom-[520px] -translate-x-1/2 w-[920px] h-[920px] rounded-full border border-[#1E5EFF]/25 shadow-[inset_0_12px_36px_rgba(255,255,255,0.85)] bg-gradient-to-b from-[#4B83FF]/25 to-[#0047FF]/45" />
      <div className="pointer-events-none absolute left-1/2 -bottom-[640px] -translate-x-1/2 w-[680px] h-[680px] rounded-full border border-white/60 shadow-[inset_0_10px_28px_rgba(255,255,255,0.95)] bg-gradient-to-b from-[#8AB4FF]/40 to-[#1E5EFF]/65" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-black/5 shadow-sm mb-8">
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#1E5EFF] text-white">
            v2.0 Rust Core
          </span>
          <span className="text-xs font-medium text-[#4A5060]">
            17.9x faster native PDA masking (0.23 ms) &bull; 499 passing tests
          </span>
        </div>

        {/* Display Headline with Embedded 3D Cobalt Toggle (Reference 1 Style) */}
        <h1 className="text-4xl sm:text-6xl md:text-[4.25rem] font-extrabold tracking-tight leading-[1.08] max-w-4xl">
          Turn LLM{" "}
          <span className={vexxEnabled ? "line-through decoration-[#7B8398]/50 text-[#7B8398]" : "text-[#E11D48]"}>
            Guessing
          </span>{" "}
          <button
            onClick={() => setVexxEnabled(!vexxEnabled)}
            aria-label="Toggle Vexx Solver Mode"
            className={`inline-flex items-center align-middle mx-2 p-1.5 w-20 sm:w-24 h-11 sm:h-13 rounded-full transition-colors duration-300 cursor-pointer shadow-inner ${
              vexxEnabled
                ? "bg-gradient-to-r from-[#1E5EFF] to-[#0047FF] shadow-[0_10px_25px_-5px_rgba(30,94,255,0.55),inset_0_2px_4px_rgba(255,255,255,0.4)]"
                : "bg-zinc-300 shadow-inner"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className={`block w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md ${
                vexxEnabled ? "ml-auto" : "ml-0"
              }`}
            />
          </button>{" "}
          <span className="bg-gradient-to-r from-[#0047FF] to-[#1E5EFF] bg-clip-text text-transparent">
            Into Verified Truth
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-[#4A5060] max-w-2xl leading-relaxed">
          Pydantic ergonomics on the surface; dependency-free Rust theorem proving underneath.
          Vexx intercepts LLM logits in real time using Pushdown Automata, HC4/Affine interval
          contractors, Zero-DoF token splicing, and CDCL backjumping.
        </p>

        {/* Primary CTA Row + 1-Click pip install */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-b from-[#2B68FF] to-[#0043F0] shadow-[0_14px_28px_-6px_rgba(20,78,255,0.45),inset_0_2px_3px_rgba(255,255,255,0.5)] hover:translate-y-[-2px] transition-transform"
          >
            Read the Docs <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={copyInstall}
            className="inline-flex items-center gap-3 px-5 py-3.5 rounded-full bg-white border border-black/10 text-sm font-mono text-[#14151A] shadow-sm hover:border-[#1E5EFF]/40 transition-colors cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-[#1E5EFF]" />
            <span>pip install vexx-ai</span>
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#7B8398]" />}
          </button>
        </div>

        {/* Live Split Card: Reference 2 Fluted Glass + Live Token Trace */}
        <div className="mt-14 w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-black/10 bg-white shadow-[0_32px_64px_-16px_rgba(6,27,82,0.18)] text-left">
          {/* Left 7 Cols: Live Python Spec + Token Stream */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#0A0D14] text-slate-100 font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <span className="text-slate-400">portfolio_spec.py &rarr; DecodeEngine</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold ${
                  vexxEnabled
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                }`}
              >
                {vexxEnabled ? "VEXX NATIVE (0.23 ms/step)" : "STANDARD JSON MODE (UNVERIFIED)"}
              </span>
            </div>

            <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`@verified_schema
def valid_portfolio(p: Portfolio):
    require(sum(p.weights.values()) == 1.0, tol=1e-6)
    require(forall(p.weights.values(), lambda w: (0.05 <= w) & (w <= 0.50)))
    derive(p.expected_return == dot(p.weights, RETURNS))
    derive(p.sharpe_ratio == (p.expected_return - 0.04) / p.volatility)
    require(p.sharpe_ratio >= 0.65)`}
            </pre>

            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="text-xs text-slate-400 mb-2">Decoded JSON Stream:</div>
              <AnimatePresence mode="wait">
                {vexxEnabled ? (
                  <motion.div
                    key="vexx-on"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 space-y-1.5"
                  >
                    <div>{`{"weights": {"AAPL": 0.40, "MSFT": 0.35, "NVDA": `}
                      <span className="px-1.5 py-0.5 rounded bg-[#1E5EFF]/40 text-white font-semibold" title="HC4 Contractor narrowed NVDA to [0.25, 0.25]">0.25</span>
                      {`},`}
                    </div>
                    <div className="text-emerald-400">
                      {` "expected_return": 0.1615, "volatility": 0.1892, "sharpe_ratio": 0.6422}`}
                      <span className="ml-2 inline-block px-2 py-0.5 text-[11px] rounded bg-emerald-500/20 text-emerald-300">
                        ⚡ 0-DoF Spliced (24 tokens, 0 LLM calls)
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="vexx-off"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 space-y-1.5"
                  >
                    <div>{`{"weights": {"AAPL": 0.50, "MSFT": 0.45, "NVDA": 0.30},`}</div>
                    <div className="text-rose-400">
                      {` "expected_return": 0.2100, "volatility": 0.1400, "sharpe_ratio": 1.214}`}
                      <span className="ml-2 inline-block px-2 py-0.5 text-[11px] rounded bg-rose-500/20 text-rose-300">
                        ✗ Hallucinated: sum(weights) = 1.25 != 1.0
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right 5 Cols: Reference 2 ("CRUNCHY") Fluted Glass Interval Slicer */}
          <div className="lg:col-span-5 relative min-h-[300px] vexx-fluted-glass flex flex-col justify-between p-7 text-white">
            <div className="vexx-fluted-louvers" />
            <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/80">
              <span>Tier-1 HC4 + AF2</span>
              <span>3.9 &mu;s Prefix Bound</span>
            </div>

            <div className="relative z-10 my-auto py-6">
              <div className="text-xs font-mono uppercase tracking-widest text-white/75 mb-1">
                {vexxEnabled ? "Active Contractor State" : "Contractor Disabled"}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {vexxEnabled ? "100% Soundness" : "Silent Math Failure"}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-white/85 leading-relaxed">
                {vexxEnabled
                  ? "Every vertical louver represents an affine interval cut pruning illegal token prefixes before sampling."
                  : "Without interval contractors, JSON mode emits valid syntax that violates conservation laws."}
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-white/20 text-left font-mono text-xs">
              <div>
                <div className="text-white/60">PDA Mask</div>
                <div className="font-semibold">{vexxEnabled ? "0.23 ms" : "N/A"}</div>
              </div>
              <div>
                <div className="text-white/60">0-DoF Saved</div>
                <div className="font-semibold">{vexxEnabled ? "24 tok" : "0 tok"}</div>
              </div>
              <div>
                <div className="text-white/60">Witness</div>
                <div className="font-semibold">{vexxEnabled ? "SHA-256" : "None"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 6. Interactive WebAssembly Playground & `vexx inspect` Trace Viewer Spec

### 6.1 The `vexx inspect` Interactive Trace Viewer Component (`InteractiveTraceViewer.tsx`)

Your CLI (`python/vexx/cli/main.py` $\rightarrow$ `vexx inspect trace.json --out report.html`) already generates a dark-mode HTML report showing:
1. Summary KPI cards (`Total Steps`, `Backtracks`, `Jump-Forward Fields`, `Final Status`).
2. Step-by-step table with `Step #`, `Field`, `Token`, `Kind` (`sample`, `backtrack`, `splice`), `Notes`, and an **inline CSS Shannon entropy bar**.

On the website, embed this exact viewer as an interactive React component (`<InteractiveTraceViewer traceUrl="/traces/portfolio_0dof.json" />`) with a **timeline scrubber** so visitors can step forward/backward token-by-token and watch:
* **Blue (`sample`):** Standard PDA + HC4 masked token sampling.
* **Green (`splice`):** `ZeroDofRule` deterministic jump-forward injection (`0` LLM calls).
* **Amber/Red (`backtrack`):** `CdclJumpbackEngine` culprit attribution rewinding the token stream to `culprit.start_token_idx - 1` and applying a half-space domain cut!

---

## 7. Master AI Coding Agent Prompt & 4-Phase Execution Blueprint

Paste the prompt below directly into Cursor, Claude Code, Windsurf, or Cline inside your `vexx` repository to scaffold and build the entire website at zero cost:

```markdown
You are a Principal Design Engineer and Systems Architect. Build the official website, interactive WebAssembly playground, and documentation portal for `vexx` inside a `website/` directory using Next.js 15 (App Router), Fumadocs (`fumadocs-ui`, `fumadocs-mdx`), Tailwind CSS v4, Framer Motion, Lucide React, Shiki, KaTeX, and Orama static search.

### 1. Visual Design System ("Luminous Cobalt Refraction")
- Default Marketing Surface: Warm Alabaster (`#FAF9F6`) with Deep Charcoal Ink (`#14151A`) and Electric Cobalt (`#0047FF` / `#1E5EFF`) accents.
- Code & Trace Surface: Obsidian Terminal (`#0A0D14`).
- Implement three signature visual motifs:
  1. Hero headline with an embedded 3D cobalt toggle (`HeroModeToggle.tsx`) switching live between "Standard JSON Mode (Hallucinated Math)" and "Vexx Solver Mode (0.23ms PDA Mask + 0-DoF Splice + SHA-256 Proof)".
  2. Vertical Fluted-Glass Contractor panels (`backdrop-filter: blur(18px)` + repeating 88px vertical linear-gradient louvers over a radial `#0047FF` cobalt sphere) visualizing HC4/AF2 interval domain cuts.
  3. Concentric 3D Cobalt Horizon Rings (`Tier 0 PDA`, `Tier 1 HC4/AF2`, `Tier 2 NanoSolver + CDCL`) and tilted 3D glossy cobalt squircle badges for the 9 Domain Cartridges and 7 Runtime Bridges.

### 2. Zero-Cost WebAssembly Playground (`crates/vexx-wasm`)
- Compile `crates/vexx-wasm` via `wasm-pack build --target web --out-dir ../../website/public/wasm`.
- Load `vexx_wasm.js` inside a dedicated Web Worker (`src/workers/vexx-wasm.worker.ts`) exposing `PdaHandle`, `prefix_status`, `is_valid_document`, and `mask_json`.
- Build `/playground` with 4 pre-loaded scenarios (Quant Portfolio 0-DoF, Text-to-SQL Safety, Cloud IAM Security, SMILES Valence Chemistry) where typing or stepping through tokens updates the PDA stack depth, allowed token bitmask, HC4 interval bounds, and SMT-LIB2 proof certificate in real time at 60 FPS.

### 3. Documentation Portal (`/docs/[[...slug]]`)
- Configure Fumadocs with `rehype-katex` for mathematical notation and Shiki dual-theme highlighting.
- Embed `<InteractiveTraceViewer />` (porting the step table and entropy bars from `python/vexx/cli/main.py` `inspect` command) and `<SchemaSynthWidget />` directly as custom MDX components.
- Ensure 100% static/hybrid export compatibility for zero-cost deployment on Vercel or Cloudflare Pages.
```

### Phase-by-Phase Execution Plan
1. **Phase 1 — Scaffolding & WASM Build (Day 1):** Initialize `website/` with `npx create-fumadocs-app`, configure fonts (`Plus Jakarta Sans`, `Inter`, `JetBrains Mono`), and add a root `Makefile` / `package.json` script that runs `wasm-pack build crates/vexx-wasm --target web --out-dir ../../website/public/wasm`.
2. **Phase 2 — Signature Landing Page & Fluted-Glass UI (Day 2):** Build `HeroModeToggle.tsx`, `FlutedContractorVisual.tsx`, `ConcentricTierDome.tsx`, `CartridgeFloatingGrid.tsx`, and the `17.9x` Rust vs. Python benchmark chart.
3. **Phase 3 — Interactive WASM Playground & Trace Replay Viewer (Day 3):** Wire `vexx-wasm.worker.ts` to the `/playground` route and port `python/vexx/cli/main.py`'s `inspect` HTML trace viewer into `InteractiveTraceViewer.tsx`.
4. **Phase 4 — MDX Documentation Population & Zero-Cost Deploy (Day 4):** Populate the MDX files from File 2 (`Vexx_Documentation_And_Product_Content_Guide.md`), verify `Cmd + K` Orama static search, and deploy to Vercel Free Tier with automatic GitHub Actions builds.
