const LINES = [
  'PROOF OR IT DIDN’T HAPPEN',
  'NO VIBES, JUST VERIFICATION',
  'THE MODEL PROPOSES. THE SOLVER DISPOSES.',
  'rm -rf hallucinations',
  'CONSTRAINED, NOT CAGED',
  'YOUR MODEL IS A LIAR (AFFECTIONATELY)',
  'AUDITED, NOT ASSERTED',
  'SHIP LESS SLOP',
];

export function Creed() {
  return (
    <section aria-label="The Vexx creed" className="relative overflow-hidden bg-bg-canvas py-3 sm:py-5">
      <div className="-mx-6 w-[calc(100%+3rem)] rotate-[-1deg] border-y sm:rotate-[-1.2deg] border-cobalt-800/40 bg-gradient-to-r from-cobalt-700 via-cobalt-600 to-cobalt-700 py-2.5 shadow-[0_18px_40px_-28px_rgba(0,56,204,0.9)]">
        <div className="ticker-band items-center gap-8 pr-8">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8" aria-hidden={copy === 1}>
              {LINES.map((line) => (
                <span
                  key={`${copy}-${line}`}
                  className="flex shrink-0 items-center gap-8 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/90 sm:text-[11.5px]"
                >
                  {line}
                  <span aria-hidden className="text-accent-acid">
                    ✳
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
