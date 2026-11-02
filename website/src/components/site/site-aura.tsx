/**
 * Ambient light for the marketing shell.
 * One fixed, non-interactive layer so sections can stay flat and legible.
 */
export function SiteAura() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="aurora" />
      <div
        className="absolute inset-0 opacity-[0.5] dark:opacity-[0.28]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(255, 91, 57, 0.1), transparent 26%), radial-gradient(circle at 82% 8%, rgba(110, 86, 255, 0.12), transparent 30%)',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong/60 to-transparent" />
    </div>
  );
}
