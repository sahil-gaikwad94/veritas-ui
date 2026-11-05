# Vexx Documentation Architecture, Content Blueprint & Product Strategy Guide (`v1.0`)

**Target Repository:** [`https://github.com/sahil-gaikwad94/veritas`](https://github.com/sahil-gaikwad94/veritas) (47 commits on `main`, 499 passing tests across Python + Rust)  
**Scope:** Complete product positioning, landing page copywriting, exhaustive Diátaxis documentation sitemap, page-by-page content specifications covering all 65+ exported symbols, 9 domain cartridges, 7 runtime bridges, 6 CLI tools, and 5 category-defining interactive documentation features.

---

## 1. Product Positioning & Developer Psychology

### 1.1 The 30-Second Developer "Aha!" Loop
When an AI engineer, systems architect, or hiring manager lands on the Vexx website, they have three immediate questions:
1. **"How is this different from Pydantic / OpenAI Structured Outputs / Outlines?"**
   - *Answer:* Grammar-based tools ([Outlines](https://github.com/dottxt-ai/outlines), [llguidance](https://github.com/guidance-ai/llguidance), OpenAI JSON mode) only enforce **syntax** (e.g., *"this field is a float"*). [Pydantic](https://www.google.com/search?q=https://docs.pydantic.dev/) only validates **after** the entire string is generated, forcing expensive retry loops when math fails. **Vexx** enforces **mathematical, logical (`LTLf`), and cross-field invariants *during* token decoding**—and deterministically computes derived (`0-DoF`) fields so the LLM never guesses arithmetic.
2. **"Does running a solver per token destroy inference latency?"**
   - *Answer:* No—Vexx never calls Z3 per token. Its 3-tier dependency-free Rust engine (`crates/vexx-core`) masks tokens via a byte-level JSON Pushdown Automaton in **0.23 ms** (**17.9x faster** than Python), narrows numeric prefixes via HC4/Affine (`AF2`) contractors in **3.9 $\mu$s**, and **saves $T - 1$ LLM forward passes** per derived field via Zero-DoF token splicing.
3. **"Do I have to learn SMT-LIB2 or C++ theorem provers to use it?"**
   - *Answer:* Zero new syntax. If you can write a Pydantic `BaseModel` and Python `require()` / `derive()` assertions, you already know Vexx.

### 1.2 Competitive Positioning Matrix (For Homepage & `/docs/comparisons`)

| Capability | [Pydantic](https://www.google.com/search?q=https://docs.pydantic.dev/) / Instructor | [Outlines](https://github.com/dottxt-ai/outlines) / [llguidance](https://github.com/guidance-ai/llguidance) | Raw [Microsoft Z3](https://github.com/z3prover/z3) | **Vexx (`vexx-ai`)** |
| :--- | :--- | :--- | :--- | :--- |
| **JSON Schema & Grammar Masking** | Post-hoc validation only | Yes (CFG / Regex / PDA) | No | **Yes (`JSONPushdownAutomaton`, `0.23 ms` in Rust)** |
| **Cross-Field Math & Inequality Invariants** | Post-hoc retry loop | No | Manual SMT-LIB coding | **Yes (Live HC4 + Affine `AF2` Interval Contractors)** |
| **0-DoF Deterministic Field Splicing** | No (LLM guesses math) | Jump-forward syntax only | No | **Yes (`ZeroDofRule` computes & splices derived math)** |
| **0-Token Pre-Flight Contradiction Check** | No | No | Manual setup | **Yes (`run_preflight` / `vexx check-spec`)** |
| **Conflict-Driven Jumpback (`CDCL`)** | Whole-prompt retry | No | No | **Yes (Entropy culprit score + half-space domain cuts)** |
| **Chain-of-Thought Preservation (`CRANE`)** | Separate prompt | Breaks on strict JSON | N/A | **Yes (`CraneModeController` `<think>` $\rightarrow$ `<emit>`)** |
| **Cryptographic Proof Certificates** | No | No | UnsatCore only | **Yes (Tamper-proof `SHA-256` + offline `SMT-LIB2`)** |

---

## 2. Landing Page Section-by-Section Content & Copywriting Blueprint

### Section 1: Hero Banner (With Interactive `Connectly`-Style Headline Toggle)
* **Pill Badge:** `v2.0 Release • Dependency-Free Rust Core • 17.9x Speedup • 499 Passing Tests`
* **Headline:** `Turn LLM Guessing [ ● ] Into Verified Mathematical Truth.`
* **Subheadline:** `Pydantic ergonomics on the surface; Rust theorem proving underneath. Vexx enforces algebraic equations, temporal logic, and domain invariants directly inside the token-generation loop—with zero-DoF token splicing and offline cryptographic proofs.`
* **Primary CTAs:** `[Get Started in 60s →]` | `[pip install vexx-ai (Copy)]` | `[Open WASM Playground]`

### Section 2: The "Why Standard JSON Mode Fails" Interactive Visual
* **Headline:** `Valid JSON Syntax != Valid Math.`
* **Narrative Copy:** Show side-by-side how an LLM asked for a low-volatility portfolio emits valid JSON where weights sum to `1.25` and the Sharpe ratio contradicts the covariance matrix—and how Vexx's **Three-Tier Engine** prevents it in real time:
  1. **Pre-Flight Gate (`0 tokens`):** `run_preflight()` proves the user's constraints are mutually satisfiable before touching the GPU.
  2. **Tier-0 PDA + Tier-1 HC4/AF2 Contractor (`0.23 ms` / `3.9 µs`):** Masks out illegal digits mid-number using outward-rounded IEEE-754 interval and affine noise-symbol propagation.
  3. **Zero-DoF Jump-Forward Splice (`0 LLM calls`):** The instant free variables (`weights`) close, Vexx computes `expected_return`, `volatility`, and `sharpe_ratio` deterministically and heals the BPE token boundary.

### Section 3: The 5 Horizon-Defining Superpowers (Bento Grid)
1. **CRANE Dual-Mode Reasoning (`CraneModeController`):** Let the model reason freely in `<think>` without grammar lock-in degrading accuracy, passively mine candidate equations, and engage strict solver-guided decoding on `<emit>`.
2. **Zero-DoF Deterministic Splicing (`ZeroDofRule` + `TokenHealer`):** Topologically sorts JSON keys (`build_json_key_order`) so inputs precede outputs, eliminating 30–60% of numerical LLM forward passes.
3. **Entropy-Weighted CDCL Jumpback (`CdclJumpbackEngine`):** Pinpoints the exact earlier field responsible for an `UNSAT` conflict, rewinds the token stream, and learns a half-space domain cut so the model never repeats the same algebraic dead end.
4. **Tamper-Proof Verification Certificates (`proof/certificate.py`):** Every decoded object ships with a self-contained `SHA-256` witness digest and an offline-verifiable `SMT-LIB2` proof script (`vexx verify-proof`).
5. **Free RL Post-Training Data (`rl/collector.py`):** Automatically turns every CDCL jumpback (`rejected UNSAT branch` vs. `verified completion`) into step-level **DPO / Process-GRPO** preference trajectories.

### Section 4: The 9 Domain Cartridges Showcase (Floating 3D Cobalt Squircles)
Interactive tab switcher showing real 8-line code snippets for:
* **`quant`** (Portfolio Simplex, Cholesky Covariance `quad_form`, Black-Scholes, Value-at-Risk)
* **`sql`** (Catalog-aware Text-to-SQL schema alignment, FK join validation, SQL injection blocking)
* **`sec`** (Cloud IAM / RBAC least-privilege policies & tool-call guardrails)
* **`or_sched`** (Job-shop scheduling, resource capacity bounds, non-overlap difference logic)
* **`chem`** (SMILES molecular parser, atomic valence limits, formal charge & molecular weight)
* **`phys`** (SI dimensional analysis group $\mathbb{Q}^7$ & conservation laws)
* **`stat`** (Probability simplexes, confidence intervals & moment constraints)
* **`code` & `code_synth`** (AST complexity limits, forbidden node detection & grammar-safe synthesis)

### Section 5: Measured Performance & 1-Line Framework Bridges
* **Benchmark Callout:** `4.07 ms → 0.23 ms` (`17.9x` speedup on `TokenMasker.valid_mask`), `5.7 µs → 3.9 µs` (`1.5x` speedup on `Interval.from_numeric_prefix`), `8,192`-entry LRU prefix mask cache.
* **Drop-In Bridges Strip:** Logos and 3-line snippets for **vLLM** (`VllmAdapter`), **SGLang** (`SglangAdapter`), **llama.cpp** (`LlamaCppAdapter`), **HuggingFace Transformers**, **Outlines** (`OutlinesAdapter`), **Guidance** (`GuidanceAdapter`), and **LMQL** (`LmqlAdapter`).

---

## 3. Complete Documentation Architecture & Sitemap (Diátaxis Structure)

Organize `/docs` into **7 top-level navigation groups** so beginners get working code in 60 seconds while systems researchers can inspect the exact mathematical proofs and Rust FFI wire protocol:

```text
content/docs/
├── index.mdx                                  # 1. Overview & Architecture At-a-Glance
├── getting-started/
│   ├── installation.mdx                       # pip install, extras [z3, cas, rl], & `vexx doctor`
│   ├── quickstart.mdx                         # First @verified_schema in 60 seconds
│   └── how-vexx-works.mdx                  # Visual tour: AST -> VIR -> PDA/HC4 -> 0-DoF -> Proof
├── authoring-schemas/
│   ├── verified-schema-decorator.mdx          # @verified_schema, VerifiedSchema, require, derive, prefer
│   ├── mathematical-primitives.mdx            # sum, dot, quad_form, sqrt, keys_subset, forall
│   ├── dynamic-containers.mdx                 # ResidualAccumulator, analyze_containers, ContainerInfo
│   ├── preflight-sat-gate.mdx                 # run_preflight, check_spec, InfeasibleSpecError, CircularDerivationError
│   └── schema-synthesis.mdx                   # Auto-generating schemas from JSON via `vexx synth`
├── engine-internals/
│   ├── vir-compiler-and-dag.mdx               # AstTranspiler, VirSpec, VirExpr, VirType, DependencyGraph
│   ├── tier0-json-pda-and-healing.mdx         # JSONPushdownAutomaton, TokenMasker, IncrementalJSONParser, TokenHealer
│   ├── tier1-hc4-and-affine-contractors.mdx   # Interval, AffineForm, Hc4AffineContractor, outward rounding
│   ├── tier2-nano-solver-and-z3.mdx           # VexxNanoSolver (Fourier-Motzkin), SmtBridge, Z3SmtOracle
│   ├── zero-dof-jump-forward.mdx              # ZeroDofRule, build_json_key_order, splice_and_step
│   ├── crane-dual-mode-reasoning.mdx          # CraneModeController, <think> -> <emit>, ShadowParser
│   ├── cdcl-jumpback-and-domain-cuts.mdx      # CdclJumpbackEngine, entropy culprit score, TabuPrefixTrie
│   └── rust-native-and-wasm-core.mdx          # crates/vexx-core, vexx-py, vexx-wasm, VEXX_NO_NATIVE=1
├── cartridges/
│   ├── overview.mdx                           # How Domain Cartridges work & composing cartridges
│   ├── quantitative-finance.mdx               # vexx.cartridges.quant
│   ├── sql-and-database-safety.mdx            # vexx.cartridges.sql
│   ├── security-and-iam-policies.mdx          # vexx.cartridges.sec
│   ├── operations-research-scheduling.mdx     # vexx.cartridges.or_sched
│   ├── chemistry-smiles.mdx                   # vexx.cartridges.chem (SmilesMolecule, parse_smiles, valence)
│   ├── physics-dimensional-analysis.mdx       # vexx.cartridges.phys
│   ├── statistics-and-distributions.mdx       # vexx.cartridges.stat
│   └── code-analysis-and-synthesis.mdx        # vexx.cartridges.code & vexx.cartridges.code_synth
├── bridges-and-integrations/
│   ├── vllm.mdx                               # VllmAdapter & logit processor integration
│   ├── sglang.mdx                             # SglangAdapter & jump-forward hooks
│   ├── llama-cpp.mdx                          # LlamaCppAdapter & from_llama_cpp
│   ├── huggingface-transformers.mdx           # hf_transformers LogitsProcessor
│   ├── outlines-guidance-lmql.mdx             # OutlinesAdapter, GuidanceAdapter, LmqlAdapter
│   ├── async-stream-proxy.mdx                 # Black-box SSE supervisor for OpenAI / cloud APIs
│   └── diffusion-llms.mdx                     # Gumbel-max factor-graph unmasking for diffusion models
├── proofs-rl-and-cli/
│   ├── proof-certificates.mdx                 # ProofCertificate, SMT-LIB2 export, SHA-256 witness verification
│   ├── ltlf-temporal-logic.mdx                # Linear Temporal Logic over finite traces (ltlf.py)
│   ├── rl-trajectory-collector.mdx            # Exporting CDCL jumpbacks to DPO / Process-GRPO datasets
│   └── cli-reference.mdx                      # Complete guide to `doctor`, `check-spec`, `verify`, `verify-proof`, `inspect`, `synth`
└── api-reference/
    ├── python-public-api.mdx                  # Complete reference for all 65+ symbols in `vexx.__all__`
    ├── rust-pyo3-native-api.mdx               # `vexx._native` & `crates/vexx-py` exports
    ├── wasm-browser-api.mdx                   # `vexx-wasm` JS/TS API (`PdaHandle`, `prefix_status`, etc.)
    └── exceptions-and-diagnostics.mdx         # Error hierarchy & telemetry dictionary keys
```

---

## 4. Page-by-Page Content Guide for Core Documentation Sections

### 4.1 `getting-started/installation.mdx`
* **Standard Zero-Dependency Install:** `pip install vexx-ai` (explains that the core package requires only `pydantic>=2.0` and includes both the Python reference engine and the dependency-free Rust native accelerator).
* **Optional Extras Table:**
  - `pip install "vexx-ai[z3]"` $\rightarrow$ Unlocks `z3-solver>=4.13` (`Z3SmtOracle` for non-linear/quantified SMT fallback).
  - `pip install "vexx-ai[cas]"` $\rightarrow$ Unlocks `sympy>=1.12` and `numpy>=1.26` for symbolic canonicalization and Cholesky matrix operations.
  - `pip install "vexx-ai[rl]"` $\rightarrow$ Unlocks `datasets>=2.0` and `transformers>=4.40` for DPO/GRPO trajectory collection.
* **Verifying Your Installation with `vexx doctor`:**
  Show the exact CLI commands and expected outputs:
  ```bash
  python -m vexx doctor
  python -m vexx doctor --json
  python -m vexx doctor --strict  # Exits 1 in CI if the Rust native extension is not loaded
  ```
* **Environment Variables & Kill Switches:** Document `VEXX_NO_NATIVE=1` (forces pure-Python reference execution for A/B debugging) and how fault isolation automatically falls back to Python if a native call ever panics.

### 4.2 `authoring-schemas/verified-schema-decorator.mdx` & `mathematical-primitives.mdx`
Document every authoring primitive exported in [`python/vexx/__init__.py`](https://github.com/sahil-gaikwad94/veritas/blob/main/python/vexx/__init__.py):
* **Core Decorator & Class:** `@verified_schema` and `VerifiedSchema`.
* **Four Constraint Verbs:**
  1. `require(expr, tol=...)`: Hard invariant that must hold across all valid instances (enforced via Tier-1 `Hc4AffineContractor` and Tier-2 `VexxNanoSolver`).
  2. `derive(target == expr, tol=...)`: Declares a deterministic **Zero-DoF (`ZeroDofRule`)** equality. Explain how `DependencyGraph` and `build_json_key_order` automatically reorder JSON keys so `target` is emitted *after* all variables in `expr`, allowing Vexx to compute and splice `target` without sampling the LLM.
  3. `prefer(expr, weight=1.0, tag=...)`: Declares a `SoftPreference` (Weighted MaxSMT / volume-twist preference) that guides token selection toward desirable regions without triggering hard `UNSAT` failures if tight.
  4. `forall(collection, lambda x: ...)`: Universal quantifier over dynamic lists or dictionary values, lowered into incremental `ResidualAccumulator` bounds.
* **Built-In Mathematical Operators:**
  - `sum(iterable)`: Symbolic summation lowered into linear forms (`LinearForm`) and residual accumulators.
  - `dot(weights_dict, constants_dict)`: Inner product over key-aligned dictionaries.
  - `quad_form(weights_dict, cov_matrix_dict)`: Quadratic form $w^T \Sigma w$ contracted via Affine Forms (`AffineForm`) and Cholesky decomposition.
  - `sqrt(expr)`: Square root operator with sign-aware polynomial lifting and interval contraction.
  - `keys_subset(mapping, allowed_set)`: Structural set-inclusion constraint over dictionary keys.

### 4.3 `proofs-rl-and-cli/cli-reference.mdx`
Provide copy-pasteable examples and sample outputs for all **6 CLI subcommands** in [`python/vexx/cli/main.py`](https://github.com/sahil-gaikwad94/veritas/blob/main/python/vexx/cli/main.py):
1. **`vexx doctor [--json] [--strict]`:** Inspects engine mode (`accelerated` vs. `reference`), wire protocol version, platform metadata, and optional Z3 availability.
2. **`vexx check-spec <schema.py> [--json]`:** Compiles the `@verified_schema` into `VirSpec` and runs `run_preflight()` (interval contraction + AGDecode container feasibility + exact affine feasibility + strict-bound refutation + regex/format string witness synthesis) in 0 LLM tokens.
3. **`vexx verify <schema.py> <instance.json>`:** Runs `verify_instance()` / `verify_json()`, outputting a `VerificationReport` (`PASS`, `FAIL`, or `INCOMPLETE`) with per-constraint outcomes (`ConstraintOutcome`), derived value fills (`fill_derived`), and minimal UNSAT cores.
4. **`vexx verify-proof <proof.json>`:** Offline cryptographic and algebraic verification of a saved `ProofCertificate` (`SHA-256` witness digest + embedded `SMT-LIB2` assertions).
5. **`vexx inspect <trace.json> [--out report.html] [--json]`:** Generates the standalone dark-mode HTML execution trace viewer with step-by-step token classifications (`sample`, `splice`, `backtrack`) and inline Shannon entropy bars.
6. **`vexx synth --from-json <examples.json> [--out generated_schema.py]`:** Automatically infers field bounds, linear conservation laws, and `@verified_schema` Python code from sample JSON payloads.

### 4.4 `engine-internals/rust-native-and-wasm-core.mdx`
Document the exact architecture of the 3 Rust crates so systems engineers and contributors can navigate [`crates/`](https://github.com/sahil-gaikwad94/veritas/tree/main/crates):
* **`crates/vexx-core` (15 Modules, Zero External Crates):**
  - Grammar & JSON: `pda.rs`, `json.rs`
  - Numerics & Contractors: `interval.rs`, `num.rs`, `expr.rs`, `contractor.rs`
  - Solvers & Search: `nano_solver.rs`, `solver.rs`, `cdcl_jumpback.rs`, `crane_mode.rs`
  - Splicing, Healing & Wire Protocol: `zero_dof.rs`, `token_healer.rs`, `smt_bridge.rs`, `wire.rs`, `lib.rs`
  - Soundness Testing: 68 unit tests + 12 property tests in `crates/vexx-core/tests/soundness.rs`.
* **`crates/vexx-py` (PyO3 Bindings):**
  - Document `PdaHandle` (`new`, `push`, `is_alive`, `is_complete`, `accepts`, `depth`, `last_event`, `candidates`, `mask`, `clone_handle`) and top-level functions (`prefix_status`, `validate_document`, `canonical_document`, `document_value`, `allowed_tokens`, `numeric_prefix`, `contract`, `log_volume`, `solve_linear`, `solve_linear_exact`, `engine_info`).
* **`crates/vexx-wasm` (WebAssembly Bindings):**
  - Document `version()`, `prefix_status()`, `is_valid_document()`, and `PdaHandle` for browser and edge runtimes.

---

## 5. Five Category-Defining Interactive Features for the Vexx Portal

To make the Vexx website unforgettable (the kind of engineering site developers bookmark and share on X/LinkedIn), build these five domain-specific interactive features across the product horizons:

| # | Feature Name | Horizon | What the User Experiences on Screen | Under-the-Hood Mechanism (Zero Server Cost) |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **"X-Ray Mode" Token Mask Inspector in Docs Code Blocks** | **H1: Core Loop Accelerator** | Hovering over any token in a decoded JSON example inside `/docs` pops up a live tooltip showing: *(a)* the PDA stack state, *(b)* the active HC4/AF2 interval `[lo, hi]`, *(c)* the top 5 allowed tokens vs. masked (`-inf`) tokens, and *(d)* whether the token was sampled or `0-DoF` spliced. | Pre-computes step traces during MDX build using `python -m vexx inspect --json` and hydrates Shiki code spans with interactive Radix HoverCards. |
| **2** | **1-Click "Break the LLM" Chaos Slider** | **H4: Signature Craft & Delight** | In the homepage playground, a slider labeled **"Constraint Tightness / Chaos"** lets users tighten portfolio volatility from `0.30` down to `0.12`. As they drag it, they watch HC4 interval boxes shrink in real time, see `CDCL Jumpback` trigger when a branch hits UNSAT, and see the `0-token Preflight Gate` trip with a minimal relaxation hint the moment the spec becomes mathematically impossible. | Calls `vexx-wasm` (`contract` and `solve_linear`) inside the browser Web Worker on every slider tick (`< 4 ms` per frame). |
| **3** | **Live Browser `vexx synth` ("Paste JSON $\rightarrow$ Get `@verified_schema`")** | **H2: Ambient Intelligence** | Users paste 2–3 sample JSON objects (e.g., API responses from their own app) into a widget on `/docs/authoring-schemas/schema-synthesis`. Vexx immediately outputs a ready-to-copy `@verified_schema` Python function with inferred interval bounds, key sets, and conservation laws. | Runs `vexx.synth` inside a lazy-loaded Pyodide Web Worker (or deterministic TypeScript port of `synth.py`) directly in the browser. |
| **4** | **Shareable Cryptographic Proof Verifier (`/verify#witness=...`)** | **H3: Viral & Multiplayer Loop** | Every verified decode produces a shareable URL containing the compressed `ProofCertificate` JSON in the URL hash. Opening the link renders a **Vexx Cryptographic Verification Card** (like an SSL certificate badge for LLM outputs) showing the `SHA-256` digest, every verified `require`/`derive` equation, and a 1-click **"Verify Offline in Browser"** button. | Uses Web Crypto API (`crypto.subtle.digest('SHA-256', ...)`) + `vexx-wasm` to re-verify the witness and render the SMT-LIB2 certificate with zero backend storage. |
| **5** | **Interactive `vexx inspect` Trace Scrubber & Uploader** | **H5: Category Moat** | Developers running `vexx` locally can drag-and-drop any `trace.json` file onto `vexx.dev/playground` (or click pre-loaded traces) to replay the token stream step-by-step, inspect Shannon entropy spikes, and export DPO/GRPO preference pairs (`rl/collector.py`) as a downloadable `.jsonl` file. | Pure client-side `FileReader` API parsing the `trace.json` schema from `python/vexx/cli/main.py` and rendering it with Framer Motion timeline scrubbing. |
