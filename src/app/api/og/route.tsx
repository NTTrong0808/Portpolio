import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { OGTemplate } from '@/lib/og/template'

export const runtime = 'edge'

const VALID_THEMES = ['default', 'midnight', 'sunset', 'terminal', 'paper', 'cyberpunk', 'mono']
const MAX_TITLE = 80
const MAX_DESC = 160

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const slug = searchParams.get('slug') ?? ''
    const theme = searchParams.get('theme') ?? 'default'
    const safeTheme = VALID_THEMES.includes(theme) ? theme : 'default'

    const titleParam = searchParams.get('title')
    let title = titleParam
      ? decodeURIComponent(titleParam).slice(0, MAX_TITLE)
      : slug
        ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
        : 'Trong Ngo — Frontend Engineer'
    title = title.slice(0, MAX_TITLE)

    const rawDesc = searchParams.get('description')
    const description = rawDesc
      ? decodeURIComponent(rawDesc).slice(0, MAX_DESC)
      : undefined

    return new ImageResponse(
      <OGTemplate title={title} description={description} theme={safeTheme} />,
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
        },
      },
    )
  } catch {
    return new Response('Failed to generate image', { status: 500 })
  }
}
