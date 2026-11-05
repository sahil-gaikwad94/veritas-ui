/**
 * WasmPacks vexx-wasm for browser deployment.
 * Run: npm run wasm:build  (requires wasm-pack and the vexx Rust repo)
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const WASM_DIR = join(ROOT, 'public', 'wasm');
const CRATE_DIR = join(ROOT, '..', '..', 'crates', 'vexx-wasm');

export function buildWasm() {
  if (!existsSync(CRATE_DIR)) {
    console.warn(
      '[wasm:build] crates/vexx-wasm not found at', CRATE_DIR,
      '\nSkipping WASM build. UI will run in stub mode.'
    );
    return;
  }

  mkdirSync(WASM_DIR, { recursive: true });

  try {
    execSync(
      `wasm-pack build "${CRATE_DIR}" --target web --out-dir "${WASM_DIR}"`,
      { stdio: 'inherit' }
    );
    console.log('[wasm:build] vexx-wasm built successfully ->', WASM_DIR);
  } catch (err) {
    console.error('[wasm:build] Failed to build vexx-wasm:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  buildWasm();
}
