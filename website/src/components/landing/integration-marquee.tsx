import { integrations } from '@/lib/site';

export function IntegrationMarquee() {
  const items = [...integrations, ...integrations];

  return (
    <section aria-label="Integrations" className="border-y border-border-subtle bg-bg-inset/60 py-6">
      <div className="container-page">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          Drop-in with the runtimes you already use
        </p>
        <div className="group relative mt-4 overflow-hidden mask-fade-x">
          <div className="flex w-max animate-marquee items-center gap-2 group-hover:[animation-play-state:paused]">
            {items.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated/70 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-secondary transition-colors hover:border-border-cobalt hover:text-ink-primary"
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-[2px] bg-gradient-to-br from-cobalt-400 to-cobalt-700"
                />
                {name}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-[11.5px] text-ink-muted">
          Model-agnostic: expose <code className="font-mono text-[11px]">next_logits(prefix)</code> and Veritas
          handles the rest.
        </p>
      </div>
    </section>
  );
}
