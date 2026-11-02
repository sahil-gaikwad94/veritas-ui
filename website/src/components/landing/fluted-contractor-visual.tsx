'use client';

import { motion } from 'framer-motion';

export function FlutedContractorVisual() {
  return (
    <section className="relative py-24 px-6 bg-[#FAF9F6] overflow-hidden">
      {/* Background cobalt orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#0047FF] via-[#1E5EFF] to-[#4B83FF] blur-[120px] opacity-20 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14151A] mb-4">
            How Tier-1 Contractors Slice Chaos
          </h2>
          <p className="text-lg text-[#4A5060] max-w-2xl mx-auto leading-relaxed">
            HC4 + Affine interval contractors narrow numeric prefixes in <strong className="text-[#14151A]">3.9 µs</strong>,
            pruning illegal token prefixes before the LLM ever samples them.
          </p>
        </div>

        <div className="relative rounded-[28px] overflow-hidden border border-[#0047FF]/20 shadow-[0_32px_64px_-16px_rgba(6,27,82,0.15)]">
          {/* Fluted glass surface */}
          <div className="veritas-fluted-glass h-[400px] md:h-[500px]">
            <div className="veritas-fluted-louvers" />
          </div>

          {/* Overlay callouts */}
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-none">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#059669] mt-1 flex-shrink-0" />
                <div className="text-sm font-mono text-[#059669] font-semibold max-w-xs">
                  0.23 ms PDA mask active
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D97706] mt-1 flex-shrink-0" />
                <div className="text-sm font-mono text-[#D97706] font-semibold max-w-xs">
                  HC4 interval cut at x=0.47
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1E5EFF] mt-1 flex-shrink-0" />
                <div className="text-sm font-mono text-[#1E5EFF] font-semibold max-w-xs">
                  0-DoF splice: no LLM call
                </div>
              </div>
            </div>

            <div className="flex items-end justify-end gap-4">
              <div className="text-right">
                <div className="text-2xl font-extrabold tracking-tight text-[#14151A]">Tier 1</div>
                <div className="text-xs font-mono text-[#4A5060] uppercase tracking-wider">
                  HC4 + AF2 Contractors
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Outward-rounded IEEE-754',
              desc: 'Interval bounds rounded away from zero guarantee soundness — no false accepts.',
            },
            {
              title: 'Affine noise-symbol propagation',
              desc: 'Track correlation across operations; avoid over-approximation drift.',
            },
            {
              title: 'Half-space domain cuts',
              desc: 'CDCL learns constraints that prune entire algebraic dead ends.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border-subtle bg-white"
            >
              <h3 className="text-lg font-semibold text-[#14151A] mb-2">{item.title}</h3>
              <p className="text-sm text-[#4A5060] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


