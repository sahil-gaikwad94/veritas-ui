'use client';

import { motion } from 'framer-motion';
import { BarChart2, Zap, Clock } from 'lucide-react';

interface BenchmarkData {
  label: string;
  rust: number;
  python: number;
  unit: string;
}

const benchmarks: BenchmarkData[] = [
  { label: 'Token Masking', rust: 0.23, python: 4.07, unit: 'ms' },
  { label: 'Interval Bound', rust: 3.9, python: 5.7, unit: 'µs' },
  { label: 'Pre-Flight Gate', rust: 0, python: 0, unit: 'tokens' },
];

export function SpeedupBenchmarkChart() {
  const maxRust = Math.max(...benchmarks.map((b) => b.rust));
  const maxPython = Math.max(...benchmarks.map((b) => b.python));

  return (
    <section className="py-24 px-6 bg-[#FAF9F6] overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14151A] mb-4">
            Measured Performance
          </h2>
          <p className="text-lg text-[#4A5060] max-w-2xl mx-auto leading-relaxed">
            The Rust core is dependency-free and deterministic — no Python interpreter,
            no Z3 per token.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benchmarks.map((b, i) => {
            const speedup =
              b.python > 0 ? (b.python / Math.max(b.rust, 0.001)).toFixed(1) + 'x' : '∞';
            const rustPct =
              maxPython > 0 ? (b.rust / maxPython) * 100 : 0;
            const pythonPct = 100;

            return (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-border-subtle bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cobalt-100 flex items-center justify-center text-cobalt-600">
                      {b.label === 'Token Masking' ? (
                        <BarChart2 className="w-5 h-5" />
                      ) : b.label === 'Interval Bound' ? (
                        <Zap className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#14151A]">
                        {b.label}
                      </h3>
                      <p className="text-xs text-ink-muted">{b.unit}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#14151A]">
                    {speedup}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-cobalt-600 font-medium">Rust</span>
                      <span className="text-cobalt-600 font-medium">{b.rust}</span>
                    </div>
                    <div className="h-2 w-full bg-cobalt-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cobalt-500 transition-all duration-1000 ease-out"
                        style={{ width: `${rustPct}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-ink-muted font-medium">Python</span>
                      <span className="text-ink-muted font-medium">{b.python}</span>
                    </div>
                    <div className="h-2 w-full bg-[#F1F4F9] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4A5060] transition-all duration-1000 ease-out"
                        style={{ width: `${pythonPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 rounded-lg border border-cobalt-100 bg-cobalt-50">
                  <span className="text-xs font-mono text-cobalt-700">
                    Dependency-free • Deterministic • 0 server cost
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
