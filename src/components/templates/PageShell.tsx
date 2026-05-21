import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { CursorDot } from '@/components/atoms/CursorDot'
import { LenisInit } from '@/components/atoms/LenisInit'

// === Bundle B ===
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LenisInit />
      <CursorDot />
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}
