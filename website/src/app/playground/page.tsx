import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground — Live WASM Token Masker',
  description: 'Interactive Veritas WASM playground — run the Tier-0 + Tier-1 + Tier-2 Rust engine client-side at 0.23 ms/step.',
};

export default function PlaygroundPage() {
  return (
    <main className="flex flex-col h-screen bg-[#0A0D14] text-[#F8FAFC] overflow-hidden">
      <header className="border-b border-white/10 bg-[#101626]/80 backdrop-blur-md p-4 px-6 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cobalt-500 flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5.5 5.5 0 11-7.778 0l.707-.707M13 12a3 3 0 10-6 0 3 3 0 006 0z" />
              </svg>
            </div>
            <span className="font-semibold text-lg tracking-tight">Veritas Playground</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#1E5EFF] px-2 py-1 rounded bg-[#1E5EFF]/10 border border-[#1E5EFF]/20">
              WASM Ready
            </span>
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Editor */}
        <div className="flex flex-1 flex-col border-r border-white/10 min-w-0">
          <div className="p-4 border-b border-white/10 bg-[#0A0D14]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#4A5060] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#4A5060] animate-pulse" /> Source
            </div>
            <textarea
              className="w-full h-full p-4 font-mono text-sm text-slate-300 bg-transparent resize-none outline-none"
              placeholder="// Enter a JSON instance or Python schema to verify with Veritas..."
              rows={20}
            />
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-[#0A0D14]">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-[#101626]/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1E5EFF]" />
                  <span className="text-xs font-mono text-slate-400">PDA Depth</span>
                </div>
                <span className="text-xs font-mono text-slate-100 font-mono">0 / 12</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-[#101626]/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#059669]" />
                  <span className="text-xs font-mono text-slate-400">Allowed Tokens</span>
                </div>
                <span className="text-xs font-mono text-slate-100">256 / 1000</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-[#101626]/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                  <span className="text-xs font-mono text-slate-400">Masked (-inf)</span>
                </div>
                <span className="text-xs font-mono text-slate-100">744</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-white/10 self-stretch mx-4" />

        {/* Right: Output */}
        <div className="flex flex-1 flex-col min-w-0">
          <div className="p-4 border-b border-white/10 bg-[#0A0D14]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#4A5060] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#4A5060] animate-pulse" /> Output
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-[#0A0D14]">
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-white/10 bg-[#101626]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#059669]" />
                  <span className="text-xs font-mono text-[#059669]">Verification Result</span>
                </div>
                <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap">
{`{"status": "PASS", "constraints": [
  {"id": "sum_weights", "outcome": "PASS", "value": 1.0},
  {"id": "weight_bounds", "outcome": "PASS", "bounds": "[0.05, 0.50]"},
  {"id": "expected_return", "outcome": "SPLICE", "value": 0.1615},
  {"id": "sharpe_ratio", "outcome": "SPLICE", "value": 0.6422}
], "witness_sha256": "a3f5...8c21", "llm_calls_saved": 24}`}
                </pre>
              </div>
              <div className="p-4 rounded-lg border border-white/10 bg-[#101626]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#1E5EFF]" />
                  <span className="text-xs font-mono text-[#1E5EFF]">HC4 Interval Bounds</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">weights.AAPL</span>
                    <span className="text-slate-100">[0.40, 0.40]</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">weights.MSFT</span>
                    <span className="text-slate-100">[0.35, 0.35]</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">weights.NVDA</span>
                    <span className="text-slate-100">[0.25, 0.25]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-[#0A0D14] p-4 px-6 text-xs text-slate-500">
        Runs entirely in-browser via <code className="text-cobalt-400">veritas-wasm</code> WebAssembly — zero server cost.
      </footer>
    </main>
  );
}
