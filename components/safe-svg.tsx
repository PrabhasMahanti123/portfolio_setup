"use client"

import type React from "react"

import { useEffect, useState } from "react"
import type { LucideProps } from "lucide-react"

interface SafeSvgProps {
  icon: React.ComponentType<LucideProps>
  props?: LucideProps
}

// This component safely renders SVG icons with client-side only rendering
// to avoid hydration mismatches
export function SafeSvg({ icon: Icon, props }: SafeSvgProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="w-5 h-5" />
  }

  return <Icon {...props} />
}
