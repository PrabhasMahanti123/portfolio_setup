"use client"
import { useEffect } from "react"

const HashRedirector = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      window.location.replace("/")
    }
  }, [])
  return null
}

export default HashRedirector 