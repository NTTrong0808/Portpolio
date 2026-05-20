export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border/50 px-6 py-10 mt-24">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-fg-muted">
        <p>
          © {year} Trong Ngo — Built with <span className="text-accent">Next.js</span> &{' '}
          <span className="text-accent">Tailwind</span>
        </p>

        <nav aria-label="footer" className="flex items-center gap-5">
          <a
            href="https://github.com/NgoTTrong"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/trongngo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            LinkedIn
          </a>
          <a href="mailto:hello@trongngo.dev" className="hover:text-fg transition-colors">
            Email
          </a>
        </nav>
      </div>
    </footer>
  )
}
