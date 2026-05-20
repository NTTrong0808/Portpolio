export function Chapter({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      {title && (
        <h2 className="text-2xl font-bold text-fg mb-6 pb-2 border-b border-border">{title}</h2>
      )}
      <div className="prose-content">{children}</div>
    </section>
  )
}
