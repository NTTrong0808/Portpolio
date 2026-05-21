import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/lib/theme/provider'
import { getNoFlashScript } from '@/lib/theme/no-flash'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const interMono = JetBrains_Mono({
  variable: '--font-inter-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Trong Ngo — Frontend Engineer',
    template: '%s | Trong Ngo',
  },
  description:
    'Frontend engineer crafting interactive digital experiences. Portfolio of Trong Ngo.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trongngo.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Trong Ngo',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// noFlashScript is a hardcoded constant string — no user input, safe from XSS
const noFlashScript = getNoFlashScript()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="default"
      className={`${inter.variable} ${interMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Safe: getNoFlashScript returns a static hardcoded string, no user input involved */}
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
