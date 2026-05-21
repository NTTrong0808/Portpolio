import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { OGTemplate } from '@/lib/og/template'

export const runtime = 'edge'

const VALID_THEMES = ['default', 'midnight', 'sunset', 'terminal', 'paper', 'cyberpunk', 'mono']

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const slug = searchParams.get('slug') ?? ''
  const theme = searchParams.get('theme') ?? 'default'
  const safeTheme = VALID_THEMES.includes(theme) ? theme : 'default'

  // Title resolution: use slug as fallback (real title needs DB/content lookup,
  // which isn't available in Edge runtime without bundling the content manifest)
  const titleParam = searchParams.get('title')
  const title = titleParam
    ? decodeURIComponent(titleParam)
    : slug
      ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : 'Trong Ngo — Frontend Engineer'

  const description = searchParams.get('description')
    ? decodeURIComponent(searchParams.get('description')!)
    : undefined

  return new ImageResponse(
    <OGTemplate title={title} description={description} theme={safeTheme} />,
    {
      width: 1200,
      height: 630,
    },
  )
}
