/**
 * The cobalt field behind the studio sheet.
 * One fixed, non-interactive layer: softbox streaks, a top glow, and no noise
 * where text needs to breathe.
 */
export function SiteAura() {
  return (
    <div aria-hidden className="vx-field">
      <div className="vx-field__glow" />
      <div className="vx-field__streaks" />
    </div>
  );
}
