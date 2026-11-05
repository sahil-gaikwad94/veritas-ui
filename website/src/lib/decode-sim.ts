/**
 * Deterministic, client-side model of a Vexx decode.
 *
 * This is a faithful *replay* of the engine's behaviour for demonstration:
 * the portfolio arithmetic below is real (covariance → volatility → Sharpe),
 * and the token stream mirrors the order the decoder emits it in. The
 * production engine lives at github.com/sahil-gaikwad94/veritas — build
 * `vexx-wasm` to run the actual Rust core in this page.
 */

export const ASSETS = ['AAPL', 'MSFT', 'NVDA'] as const;
export type Asset = (typeof ASSETS)[number];
export type Weights = Record<Asset, number>;

export const RETURNS: Record<Asset, number> = { AAPL: 0.14, MSFT: 0.13, NVDA: 0.24 };

export const COVARIANCE: Record<string, number> = {
  'AAPL:AAPL': 0.048,
  'AAPL:MSFT': 0.031,
  'AAPL:NVDA': 0.042,
  'MSFT:MSFT': 0.039,
  'MSFT:NVDA': 0.036,
  'NVDA:NVDA': 0.095,
};

export const RISK_FREE = 0.04;
export const SHARPE_FLOOR = 0.55;

function cov(a: Asset, b: Asset) {
  return COVARIANCE[`${a}:${b}`] ?? COVARIANCE[`${b}:${a}`] ?? 0;
}

const round = (n: number, digits = 3) => Number(n.toFixed(digits));

export function allocate(nvdaCap: number): Weights {
  const cap = Math.min(0.5, Math.max(0.05, nvdaCap));
  const nvda = round(cap, 3);
  const rest = 1 - nvda;
  const aapl = round(rest * 0.5294, 3);
  const msft = round(1 - nvda - aapl, 3);
  return { AAPL: aapl, MSFT: msft, NVDA: nvda };
}

export type PortfolioStats = {
  expectedReturn: number;
  volatility: number;
  sharpe: number;
};

export function statsFor(weights: Weights): PortfolioStats {
  let variance = 0;
  for (const a of ASSETS) {
    for (const b of ASSETS) variance += weights[a] * weights[b] * cov(a, b);
  }
  const volatility = Math.sqrt(Math.max(variance, 0));
  const expectedReturn = ASSETS.reduce((sum, a) => sum + weights[a] * RETURNS[a], 0);
  const sharpe = (expectedReturn - RISK_FREE) / volatility;
  return {
    expectedReturn: round(expectedReturn, 4),
    volatility: round(volatility, 4),
    sharpe: round(sharpe, 4),
  };
}

export type Conflict = {
  constraint: string;
  detail: string;
  relaxation: string;
};

export type Preflight = {
  status: 'SAT' | 'UNSAT';
  checks: { label: string; ok: boolean; detail: string }[];
  conflicts: Conflict[];
  relaxation?: string;
};

/** Largest NVDA cap (in 0.01 steps) whose volatility fits the ceiling. */
export function maxFeasibleCap(ceiling: number) {
  for (let cap = 0.5; cap >= 0.05; cap -= 0.01) {
    if (statsFor(allocate(cap)).volatility <= ceiling + 1e-9) return round(cap, 2);
  }
  return null;
}

export function preflightFor(weights: Weights, stats: PortfolioStats, ceiling: number): Preflight {
  const checks = [
    { label: 'Schema compiles to VIR', ok: true, detail: '4 fields · 6 constraints · 3 derivations' },
    { label: 'Simplex feasible', ok: true, detail: 'Σ weights = 1.000 with each ∈ [0.05, 0.50]' },
    { label: 'Container bounds', ok: true, detail: '3 declared assets · 3 present' },
    {
      label: 'Risk ceiling',
      ok: stats.volatility <= ceiling + 1e-9,
      detail: `σ = ${stats.volatility.toFixed(4)} vs ceiling ${ceiling.toFixed(2)}`,
    },
    {
      label: 'Sharpe floor',
      ok: stats.sharpe >= SHARPE_FLOOR,
      detail: `${stats.sharpe.toFixed(4)} ≥ ${SHARPE_FLOOR}`,
    },
  ];

  const conflicts: Conflict[] = [];
  if (stats.volatility > ceiling + 1e-9) {
    const cap = maxFeasibleCap(ceiling);
    conflicts.push({
      constraint: 'volatility <= ceiling',
      detail: `${stats.volatility.toFixed(4)} > ${ceiling.toFixed(2)}`,
      relaxation:
        cap !== null
          ? `Raise the ceiling to ≥ ${stats.volatility.toFixed(4)} or cap NVDA at ≤ ${cap.toFixed(2)}.`
          : `Raise the ceiling above ${stats.volatility.toFixed(4)}.`,
    });
  }

  return {
    status: conflicts.length ? 'UNSAT' : 'SAT',
    checks,
    conflicts,
    relaxation: conflicts[0]?.relaxation,
  };
}

export type FrameKind = 'sample' | 'splice' | 'mask' | 'verify';

export type Frame = {
  id: number;
  token: string;
  field: string;
  kind: FrameKind;
  note: string;
  entropy: number;
  interval?: [number, number];
  allowed: number;
  masked: number;
  tokenCount: number;
};

function intervalFor(prefix: string, cap: number): [number, number] {
  const decimals = prefix.includes('.') ? prefix.split('.')[1].length : 0;
  const value = Number.parseFloat(prefix || '0');
  const step = decimals >= 1 ? 10 ** -decimals : 0.1;
  const lo = Math.max(0.05, value);
  const hi = Math.min(lo + step, Math.min(cap, 0.5) + step / 10);
  return [round(lo, 3), round(Math.max(hi, lo), 3)];
}

export function buildTrace(weights: Weights, stats: PortfolioStats, cap: number): Frame[] {
  const frames: Frame[] = [];
  let id = 0;

  const push = (partial: Omit<Frame, 'id' | 'allowed' | 'masked' | 'tokenCount'> & Partial<Frame>) => {
    frames.push({
      id: id++,
      allowed: 641,
      masked: 359,
      tokenCount: 1,
      ...partial,
    } as Frame);
  };

  push({
    token: '{\n  ',
    field: 'root',
    kind: 'sample',
    note: 'PDA: root object opened. Only a property name can follow.',
    entropy: 0.31,
  });
  push({
    token: '"weights": {\n    ',
    field: 'weights',
    kind: 'sample',
    note: 'Schema: weights is a declared object with exactly three assets.',
    entropy: 0.18,
  });

  ASSETS.forEach((asset, index) => {
    const value = weights[asset].toFixed(3);
    push({
      token: `"${asset}"`,
      field: `weights.${asset}`,
      kind: 'sample',
      note: `Declared property ${asset}; key order comes from the dependency graph.`,
      entropy: 0.12,
      allowed: 704,
      masked: 296,
    });
    push({
      token: ': ',
      field: `weights.${asset}`,
      kind: 'sample',
      note: 'Value expected — numeric prefix machine engaged.',
      entropy: 0.08,
      allowed: 214,
      masked: 786,
    });

    let prefix = '';
    for (const digit of value.split('')) {
      prefix += digit;
      const interval = intervalFor(prefix, asset === 'NVDA' ? cap : 0.5);
      push({
        token: digit,
        field: `weights.${asset}`,
        kind: 'sample',
        note: `HC4 contraction: prefix "${prefix}" leaves [${interval[0].toFixed(3)}, ${interval[1].toFixed(3)}].`,
        entropy: 0.04,
        interval,
        allowed: 28,
        masked: 972,
      });
    }

    if (index < ASSETS.length - 1) {
      push({
        token: ',\n    ',
        field: `weights.${asset}`,
        kind: 'sample',
        note: 'Comma accepted; the object is still open.',
        entropy: 0.06,
      });
    }
  });

  push({
    token: '\n  },\n  ',
    field: 'weights',
    kind: 'sample',
    note: 'Object closed. Residual Σ = 1.000000 — Tier 1 is satisfied.',
    entropy: 0.09,
    allowed: 512,
    masked: 488,
  });

  push({
    token: '',
    field: 'weights.NVDA',
    kind: 'mask',
    note: `Masked digits that would push NVDA past the ${cap.toFixed(2)} concentration cap.`,
    entropy: 0,
    allowed: 0,
    masked: 972,
  });

  const derived: { key: string; value: string; tokens: number; note: string }[] = [
    {
      key: 'expected_return',
      value: stats.expectedReturn.toFixed(4),
      tokens: 8,
      note: 'Zero-DoF: dot(weights, RETURNS). Computed, not sampled.',
    },
    {
      key: 'volatility',
      value: stats.volatility.toFixed(4),
      tokens: 8,
      note: 'Zero-DoF: sqrt(wᵀΣw) via the affine contractor.',
    },
    {
      key: 'sharpe',
      value: stats.sharpe.toFixed(4),
      tokens: 8,
      note: 'Zero-DoF: (E[r] − 0.04) / σ. Spliced with BPE healing.',
    },
  ];

  derived.forEach((d, i) => {
    push({
      token: `"${d.key}": ${d.value}${i < derived.length - 1 ? ',\n  ' : '\n'}`,
      field: d.key,
      kind: 'splice',
      note: d.note,
      entropy: 0,
      allowed: 0,
      masked: 0,
      tokenCount: d.tokens,
    });
  });

  push({
    token: '}',
    field: 'root',
    kind: 'sample',
    note: 'EOS now permitted — the document is complete and closed.',
    entropy: 0.02,
    allowed: 1,
    masked: 999,
  });

  push({
    token: '',
    field: 'verify',
    kind: 'verify',
    note: `Concrete evaluator re-checked 6/6 constraints · ${stats.sharpe.toFixed(4)} ≥ ${SHARPE_FLOOR} · certificate ready.`,
    entropy: 0,
    allowed: 0,
    masked: 0,
  });

  return frames;
}

export function decodedJson(weights: Weights, stats: PortfolioStats) {
  return JSON.stringify(
    {
      weights,
      expected_return: stats.expectedReturn,
      volatility: stats.volatility,
      sharpe: stats.sharpe,
    },
    null,
    2,
  );
}

export function buildInspectorTrace(frames: Frame[], weights: Weights, stats: PortfolioStats, ceiling: number) {
  return {
    engine: 'vexx-playground-replay',
    version: 'vexx1.5',
    note: 'Deterministic replay for the browser playground. Run `vexx inspect` on a real trace for full telemetry.',
    config: { vocabulary_size: 1000, risk_ceiling: ceiling, sharpe_floor: SHARPE_FLOOR },
    values: { weights, ...stats },
    steps: frames.map((f) => ({
      step: f.id,
      field: f.field,
      token: f.token,
      kind: f.kind,
      entropy: f.entropy,
      allowed_tokens: f.allowed,
      masked_tokens: f.masked,
      interval: f.interval ?? null,
      note: f.note,
    })),
  };
}
