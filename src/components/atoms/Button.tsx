'use client'

import { useRef, MouseEvent } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'magnetic' | 'ghost'
  children: React.ReactNode
}

export function Button({
  variant = 'default',
  children,
  className = '',
  style,
  onMouseMove,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const reduced = usePrefersReducedMotion()

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    if (reduced || variant !== 'magnetic') return
    const btn = ref.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
    onMouseMove?.(e)
  }

  function handleMouseLeave(e: MouseEvent<HTMLButtonElement>) {
    if (ref.current) ref.current.style.transform = ''
    onMouseLeave?.(e)
  }

  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
  const variants = {
    default: 'bg-accent text-white hover:bg-accent/90 px-4 py-2 text-sm',
    magnetic:
      'bg-surface-raised text-fg border border-border px-5 py-2.5 text-sm hover:border-accent/50',
    ghost: 'text-fg-muted hover:text-fg px-3 py-1.5 text-sm',
  }

  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      style={{
        transition: reduced
          ? 'none'
          : 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background-color 0.2s',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  )
}
