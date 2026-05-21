import { ReactElement } from 'react'

interface OGTemplateProps {
  title: string
  description?: string
  theme: string
}

const THEME_TOKENS: Record<string, { bg: string; fg: string; accent: string; surface: string }> = {
  default: { bg: '#0a0a0f', fg: '#f0f0f5', accent: '#6366f1', surface: '#12121a' },
  midnight: { bg: '#050510', fg: '#c8d6f0', accent: '#3b82f6', surface: '#080818' },
  sunset: { bg: '#0f0806', fg: '#f5e8d8', accent: '#f97316', surface: '#160c08' },
  terminal: { bg: '#030d03', fg: '#00ff41', accent: '#00ff41', surface: '#060f06' },
  paper: { bg: '#f5f0e8', fg: '#1a1410', accent: '#c0392b', surface: '#ede8df' },
  cyberpunk: { bg: '#060010', fg: '#f0e040', accent: '#ff007f', surface: '#0a0018' },
  mono: { bg: '#0d0d0d', fg: '#e8e8e8', accent: '#c0c0c0', surface: '#141414' },
}

export function OGTemplate({ title, description, theme }: OGTemplateProps): ReactElement {
  const tokens = THEME_TOKENS[theme] ?? THEME_TOKENS.default

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: tokens.bg,
        padding: '60px',
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent mesh blob */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: tokens.accent,
          opacity: 0.12,
          filter: 'blur(80px)',
        }}
      />

      {/* Site name */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 'auto',
        }}
      >
        <span
          style={{
            color: tokens.accent,
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          TN
        </span>
        <span
          style={{
            color: tokens.fg,
            fontSize: '20px',
            fontWeight: 400,
            marginLeft: '8px',
            opacity: 0.5,
          }}
        >
          Trong Ngo
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h1
          style={{
            fontSize: title.length > 40 ? '48px' : '60px',
            fontWeight: 700,
            color: tokens.fg,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: 0,
            maxWidth: '900px',
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              fontSize: '22px',
              color: tokens.fg,
              opacity: 0.55,
              margin: 0,
              lineHeight: 1.4,
              maxWidth: '760px',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: tokens.accent,
        }}
      />
    </div>
  )
}
