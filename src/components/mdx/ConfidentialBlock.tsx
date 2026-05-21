export function ConfidentialBlock({ children }: { children?: React.ReactNode }) {
  return (
    <div className="my-8 relative rounded-xl border border-border overflow-hidden min-h-[160px]">
      {/* Diagonal stripe locked pattern */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            var(--border) 10px,
            var(--border) 11px
          )`,
          opacity: 0.4,
        }}
      />

      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-surface/70 flex flex-col items-center justify-center z-10 gap-3 px-6 py-10">
        {/* Lock icon (SVG, no external dep) */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-fg-muted/60"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>

        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest border border-fg-muted/30 rounded-full text-fg-muted">
          Confidential — Under NDA
        </span>
        <p className="text-sm text-fg-muted text-center max-w-xs">
          Content redacted per client agreement.
        </p>
      </div>

      {/* Blurred content underneath (decorative) */}
      <div className="select-none pointer-events-none blur-xl opacity-20 p-6" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
