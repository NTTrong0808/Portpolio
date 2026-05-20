export function ConfidentialBlock({ children }: { children?: React.ReactNode }) {
  return (
    <div className="my-8 relative rounded-xl border border-border overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-sm bg-surface/80 flex items-center justify-center z-10">
        <div className="text-center px-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest border border-fg-muted/30 rounded-full text-fg-muted mb-3">
            Confidential — Under NDA
          </span>
          <p className="text-sm text-fg-muted">Content redacted per client agreement.</p>
        </div>
      </div>
      <div className="select-none pointer-events-none blur-md opacity-40 p-6" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
