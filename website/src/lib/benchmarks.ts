export type Benchmark = {
  name: string;
  detail: string;
  python: number;
  native: number;
  unit: string;
  speedup: string;
};

export const benchmarks: Benchmark[] = [
  {
    name: 'TokenMasker.valid_mask',
    detail: 'Per-token JSON mask over a 605-token vocabulary',
    python: 4.07,
    native: 0.23,
    unit: 'ms',
    speedup: '17.9×',
  },
  {
    name: 'Interval.from_numeric_prefix',
    detail: 'Outward-rounded float operations, dominated by the call boundary',
    python: 5.7,
    native: 3.9,
    unit: 'µs',
    speedup: '1.5×',
  },
];

export const testMatrix = [
  {
    suite: 'Python · default install',
    result: '425 passed, 41 skipped',
    detail: '41 skipped: native parity corpus, kill-switch tests and the randomized differential sweep',
  },
  {
    suite: 'Python · native extension built',
    result: '425 passed, 0 skipped',
    detail: '0 skipped — every test also exercises native masks and numeric prefixes',
  },
  {
    suite: 'Rust · vexx-core',
    result: '68 unit + 12 property',
    detail: 'Property tests refute randomized constraints against a brute-force grid and re-check every UNSAT core',
  },
  {
    suite: 'CI gates',
    result: 'clippy · pyo3 · wasm',
    detail: 'cargo clippy -D warnings, release pyo3 build and wasm32-unknown-unknown build on every run',
  },
];
