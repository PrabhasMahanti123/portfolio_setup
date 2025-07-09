"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { ParticleCanvas } from "@/components/particle-canvas"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Scroll-driven animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction section"
    >
      {/* Interactive background with particles */}
      <ParticleCanvas />

      <motion.div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ opacity, scale, y }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block">Hi, I'm</span>
              <span className="text-primary relative inline-block">
                Prabhas Mahanti
                <motion.span
                  className="absolute -z-10 inset-0 bg-primary/10 rounded-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-8">
              Transforming{" "}
              <span className="relative inline-block">
                <span className="relative z-10">healthcare</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[0.2em] bg-primary/30"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>{" "}
              and{" "}
              <span className="relative inline-block">
                <span className="relative z-10">fitness</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[0.2em] bg-primary/30"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </span>{" "}
              through{" "}
              <span className="relative inline-block">
                <span className="relative z-10">AI-powered solutions</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[0.2em] bg-primary/30"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                />
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" asChild className="group relative overflow-hidden">
              <a href="#projects">
                View My Work
                <motion.span
                  className="absolute inset-0 bg-primary/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="group">
              <a href="#contact">
                Get In Touch
                <motion.span
                  className="inline-block ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  →
                </motion.span>
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.2,
        }}
      >
        <Button variant="ghost" size="icon" onClick={scrollToAbout} aria-label="Scroll down to about section">
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  )
}
