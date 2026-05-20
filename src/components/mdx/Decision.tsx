export function Decision({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-8 p-5 rounded-xl border border-border bg-surface-raised">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Decision</p>
      <h3 className="text-base font-semibold text-fg mb-3">{title}</h3>
      <div className="text-sm text-fg-muted leading-relaxed">{children}</div>
    </div>
  )
}
