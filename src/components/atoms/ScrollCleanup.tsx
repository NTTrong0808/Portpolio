'use client'

import { useEffect } from 'react'
import { killScrollTriggers } from '@/lib/animations/scroll'

export function ScrollCleanup() {
  useEffect(() => {
    return () => {
      killScrollTriggers()
    }
  }, [])

  return null
}
