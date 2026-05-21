'use client'

import NextLink from 'next/link'
import { ComponentProps, MouseEvent, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { flushSync } from 'react-dom'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'

type LinkProps = ComponentProps<typeof NextLink>

function isModifiedClick(e: MouseEvent): boolean {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
}

function isExternalHref(href: string | object): boolean {
  if (typeof href !== 'string') return false
  return href.startsWith('http://') || href.startsWith('https://')
}

export function NavLink({ href, onClick, children, ...props }: LinkProps) {
  const router = useRouter()
  const reduced = usePrefersReducedMotion()
  const [, startReact] = useTransition()

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.button !== 0) return
    onClick?.(e)
    if (e.defaultPrevented) return
    if (isModifiedClick(e)) return
    if (isExternalHref(href as string)) return

    if (typeof href === 'string' && href.startsWith('#')) return

    if (reduced || !document.startViewTransition) {
      e.preventDefault()
      router.push(href as string)
      return
    }

    e.preventDefault()
    startReact(() => {
      document.startViewTransition(async () => {
        flushSync(() => {
          router.push(href as string)
        })
      })
    })
  }

  return (
    <NextLink href={href} onClick={handleClick} {...props}>
      {children}
    </NextLink>
  )
}
