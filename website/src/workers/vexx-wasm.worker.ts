/**
 * vexx-wasm Web Worker
 * Wraps the vexx-wasm WASM module for use in the browser playground.
 *
 * Real exports of `crates/vexx-wasm` (see docs/api-reference/wasm-browser-api):
 *  - version()
 *  - prefix_status(text)
 *  - is_valid_document(text)
 *  - canonical_document(text)
 *  - numeric_prefix(text, lo, hi, allow_exp)
 *  - solve_linear_json(linear_json)
 *  - PdaHandle (new, push, is_alive, is_complete, accepts, depth, mask_json)
 *
 * All calls are deterministic and run entirely client-side — zero server cost.
 */

let vexxWasm: any = null;
let wasmReady = false;
let initPromise: Promise<void> | null = null;

async function initWasm(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    try {
      // The WASM module is built by `wasm-pack build --target web --out-dir public/wasm`
      // and loaded dynamically. In development/stub mode, we use a mock.
      const wasmUrl = new URL(
        '../../public/wasm/vexx_wasm.js',
        import.meta.url
      ).href;

      const wasmModule = await import(wasmUrl);
      // wasm-pack generates a default export that returns a promise
      const wasm = await wasmModule.default?.() || wasmModule;
      vexxWasm = wasm;
      wasmReady = true;
      // eslint-disable-next-line no-console
      console.log('[vexx-wasm] WASM engine ready');
    } catch (err) {
      // WASM not built yet — fall back to stub mode for UI development
      // eslint-disable-next-line no-console
      console.warn(
        '[vexx-wasm] WASM module not available, running in stub mode:',
        (err as Error).message
      );
      vexxWasm = null;
      wasmReady = true;
    }
  })();
  return initPromise;
}

// Initialize on load
void initWasm();

function stubResponse(method: string, data: any): any {
  // Deterministic stub responses for UI development without WASM
  if (method === 'version') return 'vexx1.5-stub';
  if (method === 'prefix_status') {
    return { valid: true, depth: 0, complete: false };
  }
  if (method === 'is_valid_document') return false;
  if (method === 'numeric_prefix_bounds') {
    return JSON.stringify({ lo: 0.0, hi: 1.0, valid: true });
  }
  if (method === 'contract_intervals_json') {
    return JSON.stringify({ contracted: [], status: 'sat' });
  }
  if (method === 'emit_smtlib2_certificate') {
    return '; SMT-LIB2 certificate (stub)\n(declare-fun x () Real)\n(assert (= x 1.0))\n(check-sat)';
  }
  return null;
}

self.onmessage = async (e: MessageEvent) => {
  const { id, method, args } = e.data || {};

  if (!wasmReady) {
    await initWasm();
  }

  try {
    let result: any;

    if (!vexxWasm) {
      // Stub mode
      result = stubResponse(method, args);
    } else {
      // Real WASM calls
      switch (method) {
        case 'version':
          result = vexxWasm.version?.() || 'vexx1.5';
          break;
        case 'prefix_status':
          result = vexxWasm.prefix_status?.(args[0]) || {
            valid: true,
            depth: 0,
            complete: false,
          };
          break;
        case 'is_valid_document':
          result = vexxWasm.is_valid_document?.(args[0]) || false;
          break;
        case 'numeric_prefix_bounds':
          result = vexxWasm.numeric_prefix_bounds?.(args[0]) || '{}';
          break;
        case 'contract_intervals_json':
          result = vexxWasm.contract_intervals_json?.(args[0]) || '{}';
          break;
        case 'emit_smtlib2_certificate':
          result =
            vexxWasm.emit_smtlib2_certificate?.(args[0], args[1]) || '';
          break;
        default:
          result = { error: `Unknown method: ${method}` };
      }
    }

    self.postMessage({ id, result, error: null });
  } catch (err) {
    self.postMessage({
      id,
      result: null,
      error: (err as Error).message,
    });
  }
};
