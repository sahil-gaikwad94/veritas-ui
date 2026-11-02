export const siteConfig = {
  name: 'Veritas',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://veritas-ui.vercel.app',
  github: 'https://github.com/sahil-gaikwad94/veritas',
  githubRepo: 'sahil-gaikwad94/veritas',
  author: { name: 'Sahil Gaikwad', url: 'https://github.com/sahil-gaikwad94' },
  issues: 'https://github.com/sahil-gaikwad94/veritas/issues',
  newIssue: 'https://github.com/sahil-gaikwad94/veritas/issues/new',
  discussions: 'https://github.com/sahil-gaikwad94/veritas/discussions',
  version: 'veritas1.1',
  license: 'Apache-2.0',
  description:
    'Veritas compiles Pydantic schemas and algebraic constraints into a solver-guided decoder: grammar masking, interval contraction, zero-DoF splicing and offline proof certificates — inside the token loop.',
  shortDescription:
    'Solver-guided decoding and formal verification for LLM output. Pydantic on the surface, Rust solvers underneath.',
  installCommand: 'pip install "git+https://github.com/sahil-gaikwad94/veritas.git"',
  npmWasm: 'cargo build -p veritas-wasm --target wasm32-unknown-unknown',
} as const;

export const navLinks = [
  { href: '/docs', label: 'Docs' },
  { href: '/playground', label: 'Playground' },
  { href: '/verify', label: 'Verify' },
  { href: '/examples', label: 'Examples' },
  { href: '/benchmarks', label: 'Benchmarks' },
] as const;

export const heroStats = [
  { value: '0.23', unit: 'ms', label: 'JSON mask per step' },
  { value: '3.9', unit: 'µs', label: 'Interval contraction' },
  { value: '17.9', unit: '×', label: 'Native speedup' },
  { value: '0', unit: 'tokens', label: 'Preflight gate' },
] as const;

export const integrations = [
  'Hugging Face',
  'vLLM',
  'SGLang',
  'llama.cpp',
  'OpenAI',
  'Instructor',
  'Outlines',
  'Pydantic',
  'Z3',
  'SQL',
] as const;

export type Cartridge = {
  id: string;
  slug: string;
  label: string;
  blurb: string;
  description: string;
  checks: string[];
  code: string;
  accent: string;
};

export const cartridges: Cartridge[] = [
  {
    id: 'quant',
    slug: 'quantitative-finance',
    label: 'Quantitative finance',
    blurb: 'Simplex, covariance, Black–Scholes, VaR',
    description:
      'Portfolio weights that actually sum to one, PSD covariance matrices, and derived risk statistics computed instead of guessed.',
    checks: ['Simplex & concentration limits', 'Covariance PSD + Cholesky', 'Black–Scholes & implied vol', 'No-arbitrage bounds'],
    accent: '#1e5eff',
    code: `@verified_schema()
def portfolio(p: Portfolio):
    require(keys_subset(p.weights, {"AAPL", "MSFT", "NVDA"}))
    require(sum(p.weights.values()) == 1.0, tol=1e-6)
    require(forall(p.weights.values(), lambda w: (0.05 <= w) & (w <= 0.50)))

    derive(p.expected_return == dot(p.weights, RETURNS), tol=1e-5)
    derive(p.volatility == sqrt(quad_form(p.weights, COV)), tol=1e-5)
    derive(p.sharpe == (p.expected_return - 0.04) / p.volatility)`,
  },
  {
    id: 'sql',
    slug: 'sql-and-database-safety',
    label: 'Text-to-SQL safety',
    blurb: 'Catalog resolution, FK joins, tenant filters',
    description:
      'Real SQL tokenization with table, column and alias resolution. Writes, invented joins and missing tenant predicates are rejected before execution.',
    checks: ['Read-only enforcement', 'Table / column / alias resolution', 'Declared foreign-key joins only', 'Required tenant predicate'],
    accent: '#0f766e',
    code: `@verified_schema()
def safe_query(q: Query):
    require(q.statement_kind == "select")        # read-only
    require(keys_subset(q.tables, CATALOG))      # every table resolves
    require(q.has_tenant_filter)                 # tenant isolation
    require(q.join_depth <= 3)                   # bounded fan-out
    require(forall(q.columns, lambda c: c in COLUMNS))`,
  },
  {
    id: 'sec',
    slug: 'security-and-iam-policies',
    label: 'Security & agents',
    blurb: 'Tool policies, budgets, finite-trace LTLf',
    description:
      'Declare tools, preconditions, effects and budgets. Veritas checks every call against the plan and evaluates temporal policies over the whole trace.',
    checks: ['Declared tools only', 'Preconditions before effects', 'Budget & blast-radius caps', 'LTLf trace policies'],
    accent: '#b91c1c',
    code: `from veritas.ltlf import always, before
from veritas.cartridges.sec import WorldState

state = WorldState()
state.assert_fact("authenticated")
state.before_tool_call("transfer", {"amount": 10})

@verified_schema()
def agent_plan(plan: Plan):
    require(keys_subset(plan.tools, ALLOWED_TOOLS))
    require(forall(plan.amounts, lambda a: a <= BUDGET))
    prefer(always("audit_logged"))`,
  },
  {
    id: 'or_sched',
    slug: 'operations-research-scheduling',
    label: 'Operations research',
    blurb: 'Precedence DAGs, capacity, deadlines',
    description:
      'Job-shop style schedules with precedence cycle detection, release dates, machine capacity and critical-path deadlines.',
    checks: ['Precedence DAG + cycle detection', 'Interval capacity overload', 'Release dates & deadlines', 'Critical path length'],
    accent: '#7c3aed',
    code: `@verified_schema()
def schedule(s: Schedule):
    require(forall(s.jobs, lambda j: j.start >= j.release))
    require(forall(s.machines, lambda m: m.load <= m.capacity))
    require(forall(s.pairs, lambda p: p.a.end <= p.b.start))
    require(s.critical_path <= s.deadline)`,
  },
  {
    id: 'stat',
    slug: 'statistics-and-distributions',
    label: 'Statistics',
    blurb: 'Probability simplex, Bayes, d-separation',
    description:
      'Distributions that remain distributions: simplex checks, Fréchet bounds, Bayes consistency and graphical d-separation.',
    checks: ['Probability simplex', 'Fréchet bounds', 'Bayes consistency', 'Covariance PSD & d-separation'],
    accent: '#0369a1',
    code: `@verified_schema()
def distribution(d: Distribution):
    require(forall(d.probs.values(), lambda p: (0 <= p) & (p <= 1)))
    require(sum(d.probs.values()) == 1.0, tol=1e-9)
    require(d.covariance_is_psd)
    require(d.posterior == d.likelihood * d.prior / d.evidence)`,
  },
  {
    id: 'phys',
    slug: 'physics-dimensional-analysis',
    label: 'Physics',
    blurb: 'Dimensional algebra ℚ⁷, conservation',
    description:
      'Rational-exponent dimensional analysis over the seven SI base units. Equations that do not type-check dimensionally never decode.',
    checks: ['SI dimensions over ℚ⁷', 'Unit-aware quantities', 'Transcendental arg checks', 'Conservation identities'],
    accent: '#c2410c',
    code: `@verified_schema()
def kinematics(k: Kinematics):
    require(dim(k.velocity) == dim(k.distance) / dim(k.time))
    require(dim(k.energy) == dim(k.mass) * dim(k.velocity) ** 2)
    require(k.elapsed >= 0)
    derive(k.distance == k.velocity * k.elapsed)`,
  },
  {
    id: 'chem',
    slug: 'chemistry-smiles',
    label: 'Chemistry',
    blurb: 'SMILES parser, valence, formula weight',
    description:
      'Tokenize and parse SMILES, close rings and branches correctly, and enforce valence, formal charge, formula and molecular weight.',
    checks: ['SMILES tokenize + parse', 'Ring closures & branches', 'Valence & formal charge', 'Formula and molecular weight'],
    accent: '#15803d',
    code: `@verified_schema()
def molecule(m: Molecule):
    require(is_valid_smiles(m.smiles))
    require(forall(m.atoms, lambda a: a.bond_order <= VALENCE[a.symbol]))
    require(m.formal_charge == 0)
    derive(m.formula == hill_notation(m.smiles))
    require(100 <= m.molecular_weight <= 600)`,
  },
  {
    id: 'code',
    slug: 'code-analysis-and-synthesis',
    label: 'Code safety',
    blurb: 'Scope, bounds, division by zero',
    description:
      'Scope-aware undefined identifier detection, literal division by zero, literal index bounds and syntax errors — before generated code runs.',
    checks: ['Undefined identifiers', 'Literal division by zero', 'Literal index bounds', 'Syntax & forbidden nodes'],
    accent: '#4f46e5',
    code: `@verified_schema()
def patch(p: Patch):
    require(p.parses)                       # syntax is valid
    require(forall(p.identifiers, lambda i: i in p.scope))
    require(forall(p.divisors, lambda d: d != 0))
    require(forall(p.indexes, lambda i: 0 <= i < i.length))
    require(p.complexity <= MAX_COMPLEXITY)`,
  },
];

// Real classes/factories from `veritas.bridges` — keep in sync with the package.
export const bridges = [
  { name: 'Hugging Face', detail: 'VeritasLogitsProcessor' },
  { name: 'vLLM', detail: 'VeritasVLLMBridge' },
  { name: 'SGLang', detail: 'SGLangBridge' },
  { name: 'llama.cpp', detail: 'LlamaCppBridge' },
  { name: 'OpenAI', detail: 'patch_openai' },
  { name: 'Instructor', detail: 'InstructorBridge' },
  { name: 'Outlines', detail: 'from_outlines' },
  { name: 'Diffusion LLMs', detail: 'DiffusionBridge' },
] as const;

export const superpowers = [
  {
    id: 'zero-dof',
    kicker: 'Zero-DoF splicing',
    title: 'Derived fields cost zero forward passes',
    body: 'Keys are topologically sorted so inputs precede outputs. When the free variables close, Veritas computes the derived value and splices it into the stream — healing BPE boundaries on the way.',
    metric: '0 LLM calls',
  },
  {
    id: 'crane',
    kicker: 'CRANE reasoning',
    title: 'Think freely. Emit strictly.',
    body: 'The model reasons inside <think> without a grammar lock, then switches to strict solver-guided decoding at <emit>. Candidate equations are mined passively along the way.',
    metric: '<think> → <emit>',
  },
  {
    id: 'cdcl',
    kicker: 'CDCL jumpback',
    title: 'Learn from dead ends instead of retrying',
    body: 'On UNSAT, an entropy-weighted culprit score finds the earlier field to blame, rewinds the stream and records a half-space domain cut plus a tabu prefix.',
    metric: '≤ 8 rewinds',
  },
  {
    id: 'proof',
    kicker: 'Proof certificates',
    title: 'Ship the receipt with the result',
    body: 'Every PASS can carry a self-contained certificate: the versioned spec, the witness, an SMT-LIB2 rendering and SHA-256 digests that verify offline.',
    metric: 'SHA-256',
  },
  {
    id: 'preflight',
    kicker: 'Preflight gate',
    title: 'Contradictions fail before the GPU spins',
    body: 'Interval contraction, container feasibility and exact strict-bound refutation run against the compiled spec in zero tokens. Infeasible specs raise with relaxation hints.',
    metric: '0 tokens',
  },
  {
    id: 'rl',
    kicker: 'RL trajectories',
    title: 'Every backtrack is training data',
    body: 'Rejected branches and verified completions become step-level DPO / Process-GRPO preference pairs you can export straight to your fine-tuning pipeline.',
    metric: 'DPO · GRPO',
  },
] as const;

export const faqs = [
  {
    q: 'How is this different from JSON mode or Pydantic validation?',
    a: 'Grammar tools guarantee syntax; Pydantic validates after the fact. Veritas also reasons about cross-field algebra and inequalities while the tokens are being chosen, and computes derived fields instead of sampling them. Invalid math is never emitted, so you do not pay for a retry loop.',
  },
  {
    q: 'Does a solver run on every token?',
    a: 'No. Z3 is optional and never in the token loop. A byte-level JSON pushdown automaton masks grammar-illegal tokens, HC4/Affine contractors narrow numeric prefixes in microseconds, and a deterministic nano-solver handles the small linear systems. Z3 is a fallback for the non-linear and quantified cases.',
  },
  {
    q: 'Do I need Rust or a C toolchain?',
    a: 'No. The Python engine is the complete, tested product surface. The dependency-free Rust accelerator is optional and loaded automatically when available; every wrapper falls back to Python. Set VERITAS_NO_NATIVE=1 to force the reference path.',
  },
  {
    q: 'What does it add to latency?',
    a: 'Masking is a per-step cost, not a per-token-model call. On a GitHub runner the native JSON mask is 0.23 ms per step across a 605-token vocabulary, 17.9× faster than the Python reference. Zero-DoF splicing typically removes more forward passes than the mask adds.',
  },
  {
    q: 'Which runtimes and tokenizers work?',
    a: 'Anything that can expose logits or accept a mask: Hugging Face, vLLM, SGLang, llama.cpp, plus OpenAI/Instructor post-verification and an async stream proxy. The engine itself is model-agnostic — a model only needs next_logits(prefix).',
  },
  {
    q: 'Can I install it from PyPI today?',
    a: 'Not yet — the package metadata ships as veritas-ai but the release is pending. Install straight from GitHub with pip install "git+https://github.com/sahil-gaikwad94/veritas.git" or clone and use an editable install for development.',
  },
  {
    q: 'Is it production ready?',
    a: 'The Python engine is complete and covered by 419 tests with the native extension built (378 in a default install). GPU bridges are adapter-tested against fakes, not live vendor servers, and the out-of-scope list is documented. Treat it as a rigorous 2.0 that still wants your own integration tests.',
  },
  {
    q: 'Will this make my model smarter?',
    a: 'No. It makes your model honest about what it can prove. That is the harder upgrade, and the one that survives a code review.',
  },
  {
    q: 'What is the catch?',
    a: 'The grammar tier understands JSON, not arbitrary context-free grammars. Patterns, formats and bridges have documented subsets, and GPU bridges are adapter-tested rather than vendor-certified. The docs state the edges instead of hiding them.',
  },
  {
    q: 'What is the licence?',
    a: 'Apache-2.0. The Rust core has zero external crates and the whole engine can run offline.',
  },
] as const;
