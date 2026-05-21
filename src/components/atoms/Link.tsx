'use client'

import NextLink from 'next/link'
import { ComponentProps, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'

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

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e)
    if (e.defaultPrevented) return
    if (isModifiedClick(e)) return
    if (isExternalHref(href as string)) return
    if (!document.startViewTransition) return

    // Anchor links (#...) skip the transition
    if (typeof href === 'string' && href.startsWith('#')) return

    e.preventDefault()
    document.startViewTransition(() => {
      router.push(href as string)
    })
  }

  return (
    <NextLink href={href} onClick={handleClick} {...props}>
      {children}
    </NextLink>
  )
}
