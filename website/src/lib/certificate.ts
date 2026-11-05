/**
 * Browser-side proof-certificate utilities.
 *
 * The Python verifier (`vexx verify-proof`) remains authoritative. This
 * module re-checks the parts that are checkable without the engine: JSON
 * shape, canonical SHA-256 digests, constraint outcomes, SMT-LIB2 presence
 * and — for the portfolio witness — the actual portfolio arithmetic.
 */

export type ConstraintResult = {
  id: string;
  expr: string;
  outcome: 'PASS' | 'FAIL' | 'INCOMPLETE';
};

export type ProofCertificate = {
  schema_version: 1;
  generator: string;
  generator_version: string;
  created_at: string;
  spec: {
    name: string;
    vir_version: string;
    field_order: string[];
    constraints: string[];
    derivations: string[];
  };
  spec_digest: string;
  witness: Record<string, unknown>;
  witness_sha256: string;
  results: ConstraintResult[];
  smt2: string;
  /** Engine certificates (format "2.0") carry these instead. */
  version?: string;
  sha256?: string;
  spec_sha256?: string;
  smt2_sha256?: string;
  smt2_complete?: boolean;
  smt2_omitted?: unknown[];
  metadata?: Record<string, unknown>;
};

export type CheckStatus = 'pass' | 'fail' | 'warn';

export type VerificationCheck = {
  id: string;
  label: string;
  detail: string;
  status: CheckStatus;
};

export type VerificationOutcome = {
  ok: boolean;
  checks: VerificationCheck[];
  certificate?: ProofCertificate;
  error?: string;
};

export async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Stable JSON: object keys sorted recursively, no insignificant whitespace. */
export function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`);
  return `{${entries.join(',')}}`;
}

const REQUIRED_FIELDS: (keyof ProofCertificate)[] = [
  'schema_version',
  'generator',
  'spec',
  'spec_digest',
  'witness',
  'witness_sha256',
  'results',
  'smt2',
];

const COV: Record<string, number> = {
  'AAPL:AAPL': 0.048,
  'AAPL:MSFT': 0.031,
  'AAPL:NVDA': 0.042,
  'MSFT:MSFT': 0.039,
  'MSFT:NVDA': 0.036,
  'NVDA:NVDA': 0.095,
};
const RET: Record<string, number> = { AAPL: 0.14, MSFT: 0.13, NVDA: 0.24 };

function covariance(a: string, b: string) {
  return COV[`${a}:${b}`] ?? COV[`${b}:${a}`] ?? 0;
}

function assessPortfolio(witness: Record<string, unknown>): VerificationCheck {
  const weights = witness.weights as Record<string, number> | undefined;
  const expected = witness.expected_return;
  const volatility = witness.volatility;
  // The reference schema calls it `sharpe`; the portfolio spec calls it `sharpe_ratio`.
  const sharpe = witness.sharpe ?? witness.sharpe_ratio;

  if (
    !weights ||
    typeof weights !== 'object' ||
    typeof expected !== 'number' ||
    typeof volatility !== 'number' ||
    typeof sharpe !== 'number'
  ) {
    return {
      id: 'arithmetic',
      label: 'Derived arithmetic',
      detail: 'Witness is not a portfolio document — skipped (the Python verifier still evaluates the VIR).',
      status: 'warn',
    };
  }

  const assets = Object.keys(weights);
  const total = assets.reduce((s, a) => s + weights[a], 0);
  let variance = 0;
  for (const a of assets) {
    for (const b of assets) variance += weights[a] * weights[b] * covariance(a, b);
  }
  const calcVol = Math.sqrt(Math.max(variance, 0));
  const calcExpected = assets.reduce((s, a) => s + weights[a] * (RET[a] ?? 0), 0);
  const calcSharpe = (calcExpected - 0.04) / calcVol;

  const close = (a: number, b: number, tol = 1e-4) => Math.abs(a - b) <= tol;
  const matches =
    close(total, 1) &&
    close(calcExpected, expected) &&
    close(calcVol, volatility) &&
    close(calcSharpe, sharpe);

  return {
    id: 'arithmetic',
    label: 'Derived arithmetic',
    detail: matches
      ? `Σw = ${total.toFixed(6)} · E[r] = ${calcExpected.toFixed(4)} · σ = ${calcVol.toFixed(4)} · Sharpe = ${calcSharpe.toFixed(4)}`
      : `Recomputed values disagree with the witness (E[r] ${calcExpected.toFixed(4)}, σ ${calcVol.toFixed(4)}, Sharpe ${calcSharpe.toFixed(4)}).`,
    status: matches ? 'pass' : 'fail',
  };
}

export async function verifyCertificate(input: unknown): Promise<VerificationOutcome> {
  const checks: VerificationCheck[] = [];

  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return {
      ok: false,
      checks: [
        {
          id: 'shape',
          label: 'JSON document',
          detail: 'Certificate must be a JSON object.',
          status: 'fail',
        },
      ],
      error: 'Invalid certificate: expected a JSON object.',
    };
  }

  if (isRealCertificate(input)) {
    const realChecks = await realCertificateChecks(input);
    const ok = realChecks.every((c) => c.status !== 'fail');
    return { ok, checks: realChecks, certificate: input as unknown as ProofCertificate };
  }

  const cert = input as ProofCertificate;
  const missing = REQUIRED_FIELDS.filter((f) => cert[f] === undefined);
  checks.push({
    id: 'shape',
    label: 'Certificate structure',
    detail: missing.length ? `Missing required field(s): ${missing.join(', ')}` : 'All required fields present.',
    status: missing.length ? 'fail' : 'pass',
  });

  if (missing.length) {
    return { ok: false, checks, certificate: cert, error: 'Certificate is incomplete.' };
  }

  const witnessHash = await sha256Hex(canonicalJson(cert.witness));
  const witnessOk = witnessHash === cert.witness_sha256;
  checks.push({
    id: 'witness',
    label: 'Witness digest',
    detail: witnessOk
      ? `sha256 ${witnessHash.slice(0, 16)}… matches witness_sha256`
      : `Expected ${String(cert.witness_sha256).slice(0, 16)}…, recomputed ${witnessHash.slice(0, 16)}…`,
    status: witnessOk ? 'pass' : 'fail',
  });

  const specHash = await sha256Hex(canonicalJson(cert.spec));
  const specOk = specHash === cert.spec_digest;
  checks.push({
    id: 'spec',
    label: 'Spec digest',
    detail: specOk
      ? `sha256 ${specHash.slice(0, 16)}… matches spec_digest`
      : `Spec digest mismatch — the constraints were modified after signing.`,
    status: specOk ? 'pass' : 'fail',
  });

  const results = Array.isArray(cert.results) ? cert.results : [];
  const failing = results.filter((r) => r.outcome !== 'PASS');
  checks.push({
    id: 'constraints',
    label: 'Constraint outcomes',
    detail: results.length
      ? `${results.length} constraint(s) recorded · ${results.length - failing.length} PASS${
          failing.length ? ` · ${failing.length} not PASS (${failing.map((f) => f.id).join(', ')})` : ''
        }`
      : 'No constraint outcomes recorded — INCOMPLETE is never a PASS.',
    status: results.length && !failing.length ? 'pass' : 'fail',
  });

  const smt = typeof cert.smt2 === 'string' ? cert.smt2 : '';
  const balanced =
    smt.length > 0 &&
    [...smt].reduce((depth, ch) => (ch === '(' ? depth + 1 : ch === ')' ? depth - 1 : depth), 0) === 0;
  const hasCheck = smt.includes('(check-sat)');
  checks.push({
    id: 'smt',
    label: 'SMT-LIB2 script',
    detail: !smt
      ? 'No SMT-LIB2 rendering included (valid for non-portable specs, but nothing to replay).'
      : balanced && hasCheck
        ? `${smt.split('\n').length} lines · balanced · (check-sat) present`
        : 'SMT-LIB2 script is unbalanced or missing (check-sat).',
    status: !smt ? 'warn' : balanced && hasCheck ? 'pass' : 'fail',
  });

  checks.push(assessPortfolio(cert.witness as Record<string, unknown>));

  const ok = checks.every((c) => c.status !== 'fail');
  return { ok, checks, certificate: cert };
}

/* ------------------------------------------------------------------------- *
 * Real `vexx verify-proof` certificates (format version "2.0")
 *
 * The engine digests JSON the way `vexx.serde` does: sorted keys, compact
 * separators, ASCII escapes, and — for the witness — an explicit
 * `{"__pairs__": [[key, value], …]}` encoding with pairs sorted by repr(key).
 * Python also preserves number literals verbatim (`1.0` is not `1`), so the
 * parser below keeps the original text of every number. That makes a genuine
 * `proof.json` byte-identical to the engine's own canonical form, including
 * its non-standard `Infinity` literals for unbounded domains.
 *
 * Replaying the embedded VIR still needs the engine, so that check is reported
 * as "not checked here" — never as a pass.
 * ------------------------------------------------------------------------- */

export class RawNumber {
  constructor(readonly text: string) {}
}

type JsonValue = null | boolean | number | string | RawNumber | JsonValue[] | { [key: string]: JsonValue };

/** Parse Python's `json.dump(..., indent=2)` output, including Infinity/NaN. */
export function parseJsonLenient(text: string): unknown {
  let i = 0;

  const skip = () => {
    while (i < text.length && ' \t\n\r'.includes(text[i])) i += 1;
  };

  const readString = (): string => {
    let out = '';
    i += 1;
    while (i < text.length && text[i] !== '"') {
      if (text[i] === '\\') {
        const escape = text[i + 1];
        if (escape === 'u') {
          out += String.fromCharCode(parseInt(text.slice(i + 2, i + 6), 16));
          i += 6;
          continue;
        }
        const map: Record<string, string> = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' };
        out += map[escape] ?? escape;
        i += 2;
        continue;
      }
      out += text[i];
      i += 1;
    }
    i += 1;
    return out;
  };

  const readValue = (): JsonValue => {
    skip();
    const ch = text[i];
    if (ch === '{') {
      i += 1;
      const obj: { [key: string]: JsonValue } = {};
      skip();
      if (text[i] === '}') {
        i += 1;
        return obj;
      }
      for (;;) {
        skip();
        const key = readString();
        skip();
        i += 1; // ':'
        obj[key] = readValue();
        skip();
        if (text[i] === ',') {
          i += 1;
          continue;
        }
        i += 1;
        return obj;
      }
    }
    if (ch === '[') {
      i += 1;
      const arr: JsonValue[] = [];
      skip();
      if (text[i] === ']') {
        i += 1;
        return arr;
      }
      for (;;) {
        arr.push(readValue());
        skip();
        if (text[i] === ',') {
          i += 1;
          continue;
        }
        i += 1;
        return arr;
      }
    }
    if (ch === '"') return readString();
    if (text.startsWith('true', i)) { i += 4; return true; }
    if (text.startsWith('false', i)) { i += 5; return false; }
    if (text.startsWith('null', i)) { i += 4; return null; }
    if (text.startsWith('-Infinity', i)) { i += 9; return { __float__: '-inf' }; }
    if (text.startsWith('Infinity', i)) { i += 8; return { __float__: 'inf' }; }
    if (text.startsWith('NaN', i)) { i += 3; return { __float__: 'nan' }; }
    const match = /^-?\d+(\.\d+)?([eE][+-]?\d+)?/.exec(text.slice(i));
    if (!match) throw new Error(`Unexpected token in certificate at offset ${i}`);
    i += match[0].length;
    return new RawNumber(match[0]);
  };

  return readValue();
}

function asciiEscape(serialized: string): string {
  return serialized.replace(/[\u007f-\uffff]/g, (ch) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, '0')}`);
}

/** Python `json.dumps(value, sort_keys=True, separators=(",", ":"))`. */
function serializePython(value: JsonValue): string {
  if (value instanceof RawNumber) return value.text;
  if (Array.isArray(value)) return `[${value.map(serializePython).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    const keys = Object.keys(value).sort();
    return `{${keys.map((k) => `${asciiEscape(JSON.stringify(k))}:${serializePython(value[k])}`).join(',')}}`;
  }
  if (typeof value === 'string') return asciiEscape(JSON.stringify(value));
  return JSON.stringify(value);
}

/** `vexx.serde._encode_value`: dicts become sorted `__pairs__` arrays. */
function encodeForDigest(value: JsonValue): JsonValue {
  if (Array.isArray(value)) return value.map(encodeForDigest);
  if (value !== null && typeof value === 'object' && !(value instanceof RawNumber)) {
    const pairs: JsonValue[] = Object.entries(value).map(([k, v]) => [k, encodeForDigest(v)] as JsonValue);
    pairs.sort((a, b) => {
      const ka = JSON.stringify((a as JsonValue[])[0] ?? '');
      const kb = JSON.stringify((b as JsonValue[])[0] ?? '');
      return ka < kb ? -1 : ka > kb ? 1 : 0;
    });
    return { __pairs__: pairs };
  }
  return value;
}

function textOf(value: JsonValue | undefined): string {
  if (value instanceof RawNumber) return value.text;
  return typeof value === 'string' ? value : '';
}

const REAL_REQUIRED = ['version', 'sha256', 'spec_sha256', 'witness_sha256', 'smt2_sha256', 'witness', 'spec', 'smt2'] as const;

type RealCertificate = { [key: string]: JsonValue };

export function isRealCertificate(input: unknown): input is RealCertificate {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return false;
  const cert = input as Record<string, unknown>;
  return typeof cert.version === 'string' && cert.witness_sha256 !== undefined && typeof textOf(cert.smt2 as JsonValue) === 'string';
}

async function realCertificateChecks(cert: RealCertificate): Promise<VerificationCheck[]> {
  const checks: VerificationCheck[] = [];
  const missing = REAL_REQUIRED.filter((field) => cert[field] === undefined);
  const version = textOf(cert.version);

  checks.push({
    id: 'shape',
    label: 'Certificate structure',
    detail: missing.length
      ? `Missing required field(s): ${missing.join(', ')}`
      : `Engine certificate v${version} · every required field present.`,
    status: missing.length ? 'fail' : version === '2.0' ? 'pass' : 'warn',
  });
  if (missing.length) return checks;

  const digestPayload: JsonValue = {
    version: cert.version,
    spec_sha256: cert.spec_sha256,
    witness_sha256: cert.witness_sha256,
    witness: cert.witness,
    spec: cert.spec,
    smt2: cert.smt2,
    metadata: cert.metadata ?? {},
    smt2_sha256: cert.smt2_sha256,
    smt2_complete: cert.smt2_complete ?? false,
    smt2_omitted: cert.smt2_omitted ?? [],
  };
  const content = await sha256Hex(serializePython(digestPayload));
  const contentOk = content === textOf(cert.sha256);
  checks.push({
    id: 'integrity',
    label: 'Sealed content digest',
    detail: contentOk
      ? `sha256 ${content.slice(0, 16)}… reproduces the certificate's own sha256`
      : `Expected ${textOf(cert.sha256).slice(0, 16)}…, recomputed ${content.slice(0, 16)}… — bytes changed after sealing.`,
    status: contentOk ? 'pass' : 'fail',
  });

  const witness = await sha256Hex(serializePython(encodeForDigest(cert.witness)));
  const witnessOk = witness === textOf(cert.witness_sha256);
  checks.push({
    id: 'witness',
    label: 'Witness digest',
    detail: witnessOk
      ? `sha256 ${witness.slice(0, 16)}… matches witness_sha256`
      : `Expected ${textOf(cert.witness_sha256).slice(0, 16)}…, recomputed ${witness.slice(0, 16)}…`,
    status: witnessOk ? 'pass' : 'fail',
  });

  const smt = textOf(cert.smt2);
  const smtHash = await sha256Hex(smt);
  const smtOk = smtHash === textOf(cert.smt2_sha256);
  const balanced =
    smt.length > 0 && [...smt].reduce((depth, ch) => (ch === '(' ? depth + 1 : ch === ')' ? depth - 1 : depth), 0) === 0;
  checks.push({
    id: 'smt',
    label: 'SMT-LIB2 script',
    detail: !smt
      ? 'No SMT-LIB2 rendering included.'
      : `${balanced ? 'balanced' : 'unbalanced'} · ${smt.includes('(check-sat)') ? '(check-sat) present' : 'no (check-sat)'} · sha256 ${smtHash.slice(0, 12)}… ${smtOk ? 'matches' : 'does not match'} smt2_sha256`,
    status: !smt ? 'warn' : balanced && smtOk ? 'pass' : 'fail',
  });

  const omitted = Array.isArray(cert.smt2_omitted) ? cert.smt2_omitted : [];
  checks.push({
    id: 'coverage',
    label: 'SMT coverage',
    detail: cert.smt2_complete === true
      ? 'Complete SMT export — every constraint was expressible.'
      : `${omitted.length} constraint(s) omitted from the SMT export; the VIR evaluator still checks them.`,
    status: cert.smt2_complete === true ? 'pass' : 'warn',
  });

  checks.push({
    id: 'constraints',
    label: 'Constraint re-evaluation',
    detail:
      'Not replayed in the browser: that is what `vexx verify-proof` does with the embedded VIR. Run it (exit 0) before relying on the certificate.',
    status: 'warn',
  });

  if (cert.witness && typeof cert.witness === 'object' && !Array.isArray(cert.witness) && !(cert.witness instanceof RawNumber)) {
    const plain: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(cert.witness)) {
      plain[key] = value instanceof RawNumber ? Number(value.text) : value;
      if (plain[key] && typeof plain[key] === 'object' && !Array.isArray(plain[key])) {
        const nested: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(plain[key] as Record<string, unknown>)) {
          nested[k] = v instanceof RawNumber ? Number(v.text) : v;
        }
        plain[key] = nested;
      }
    }
    checks.push(assessPortfolio(plain));
  }

  return checks;
}

const SAMPLE_SPEC: JsonValue = {
  version: 3,
  model: 'Portfolio',
  field_order: ['weights', 'expected_return', 'volatility', 'sharpe'],
  requires: [
    'keys_subset(weights, ["AAPL", "MSFT", "NVDA"])',
    'sum(weights.values()) == 1',
    'forall(weights.values(), (0.05 <= w ∧ w <= 0.5))',
    'sharpe >= 0.55',
  ],
  derives: [
    'expected_return == dot(weights, RETURNS)',
    'volatility == sqrt(quad_form(weights, COV))',
    'sharpe == ((expected_return - 0.04) / volatility)',
  ],
  config: { zero_dof_collapse: true, preflight_check: true },
};

const SAMPLE_WITNESS: JsonValue = {
  weights: { AAPL: 0.4, MSFT: 0.35, NVDA: 0.25 },
  expected_return: 0.1615,
  volatility: 0.2044,
  sharpe: 0.5945,
};

const SAMPLE_SMT2 = [
  '; vexx proof certificate (vexx1.5)',
  '; synthetic sample built in the browser in the engine certificate format',
  '(set-logic ALL)',
  '(declare-const w_AAPL Real)',
  '(declare-const w_MSFT Real)',
  '(declare-const w_NVDA Real)',
  '(assert (! (= (+ w_AAPL w_MSFT w_NVDA) 1.0) :named req_1))',
  '(assert (! (and (>= w_AAPL 0.05) (<= w_AAPL 0.5)) :named req_2))',
  '(check-sat)',
].join('\n');

/**
 * A synthetic certificate in the engine's `2.0` format, sealed the same way
 * `ProofCertificate.seal()` seals a real one. The payload is small and made up;
 * the digests are computed exactly as the engine computes them, which is the
 * point of the demonstration.
 */
export async function buildSampleCertificate(): Promise<JsonValue> {
  const spec_sha256 = await sha256Hex(serializePython(SAMPLE_SPEC));
  const witness_sha256 = await sha256Hex(serializePython(encodeForDigest(SAMPLE_WITNESS)));
  const smt2_sha256 = await sha256Hex(SAMPLE_SMT2);
  const payload: JsonValue = {
    version: '2.0',
    spec_sha256,
    witness_sha256,
    witness: SAMPLE_WITNESS,
    spec: SAMPLE_SPEC,
    smt2: SAMPLE_SMT2,
    metadata: {},
    smt2_sha256,
    smt2_complete: false,
    smt2_omitted: [{ kind: 'derive', index: 1, text: 'volatility == sqrt(quad_form(weights, COV))' }],
  };
  const sha256 = await sha256Hex(serializePython(payload));
  return { ...(payload as { [key: string]: JsonValue }), sha256 };
}

export function encodeCertificate(cert: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(cert));
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeCertificate(token: string): unknown {
  const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
