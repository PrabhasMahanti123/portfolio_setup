"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === "undefined") return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)
    const particles: Particle[] = []

    const primaryColor = theme === "dark" ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.3)"
    const secondaryColor = theme === "dark" ? "rgba(99, 102, 241, 0.5)" : "rgba(99, 102, 241, 0.3)"

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: Math.random() > 0.5 ? primaryColor : secondaryColor,
      })
    }

    // Connect particles with lines if they're close enough
    function connect() {
      if (!ctx) return;
      const maxDistance = 150
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle =
              theme === "dark"
                ? `rgba(59, 130, 246, ${0.2 * (1 - distance / maxDistance)})`
                : `rgba(59, 130, 246, ${0.1 * (1 - distance / maxDistance)})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x > (canvas?.width ?? 0) || p.x < 0) {
          p.speedX = -p.speedX
        }

        if (p.y > (canvas?.height ?? 0) || p.y < 0) {
          p.speedY = -p.speedY
        }

        // Draw particle
        if (ctx) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        }
      }

      connect()
    }

    animate()

    // Mouse interaction
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.x
      mouse.y = e.y
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" aria-hidden="true" />
}
