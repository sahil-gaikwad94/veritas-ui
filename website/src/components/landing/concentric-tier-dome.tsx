'use client';

import { motion } from 'framer-motion';

export function ConcentricTierDome() {
  const tiers = [
    {
      name: 'Tier 0',
      label: 'JSONPushdownAutomaton',
      metric: '0.23 ms',
      desc: 'Byte-level JSON PDA masks illegal tokens mid-number.',
      color: 'from-[#0047FF]/30 to-[#1E5EFF]/15',
      border: 'border-[#1E5EFF]/30',
    },
    {
      name: 'Tier 1',
      label: 'HC4 + AF2 Contractors',
      metric: '3.9 µs',
      desc: 'Outward-rounded affine interval narrowing of numeric prefixes.',
      color: 'from-[#4B83FF]/30 to-[#0047FF]/30',
      border: 'border-[#4B83FF]/30',
    },
    {
      name: 'Tier 2',
      label: 'NanoSolver + CDCL + 0-DoF',
      metric: '0 LLM calls',
      desc: 'Deterministic splicing & conflict-driven jumpback on UNSAT.',
      color: 'from-[#8AB4FF]/30 to-[#4B83FF]/30',
      border: 'border-[#8AB4FF]/30',
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#FAF9F6] overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-transparent to-[#FAF9F6] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14151A] mb-4">
            Three-Tier Verification Horizon
          </h2>
          <p className="text-lg text-[#4A5060] max-w-2xl mx-auto leading-relaxed">
            Three concentric rings of solver geometry, each representing a tier of
            Veritas's dependency-free Rust engine.
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center h-[400px]">
          {tiers.map((tier, i) => {
            const size = 260 - i * 70;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute flex items-center justify-center"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              >
                <div
                  className={`relative rounded-full border-2 ${tier.border} ${tier.color} shadow-[inset_0_8px_24px_rgba(255,255,255,0.65)] shadow-[0_-12px_48px_rgba(30,94,255,0.28)]`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    background: `radial-gradient(50% 50% at 50% 50%, rgba(138, 180, 255, 0.25) 0%, rgba(30, 94, 255, 0.72) 72%, rgba(0, 71, 255, 0.92) 100%)`,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1">
                      {tier.name}
                    </div>
                    <div className="text-xl font-extrabold tracking-tight text-white mb-1">
                      {tier.metric}
                    </div>
                    <div className="text-[10px] font-mono text-white/80 leading-tight max-w-[140px]">
                      {tier.desc}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div key={tier.name} className="p-6 rounded-xl border border-border-subtle bg-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: i === 0 ? '#0047FF' : i === 1 ? '#4B83FF' : '#8AB4FF' }} />
                <h3 className="text-lg font-semibold text-[#14151A]">{tier.name}</h3>
              </div>
              <div className="text-xs font-mono text-cobalt-700 font-semibold mb-2">{tier.label}</div>
              <p className="text-sm text-[#4A5060] leading-relaxed">{tier.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
