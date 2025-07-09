"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Brain, Award, GraduationCap, Rocket } from "lucide-react"

type TimelineItem = {
  id: number
  date: string
  title: string
  company: string
  description: string
  skills: string[]
}

const iconForTitle = (title: string) => {
  if (title.toLowerCase().includes("engineer")) return <Briefcase className="h-7 w-7 text-primary" />
  if (title.toLowerCase().includes("ai") || title.toLowerCase().includes("ml")) return <Brain className="h-7 w-7 text-primary" />
  if (title.toLowerCase().includes("intern")) return <Award className="h-7 w-7 text-primary" />
  if (title.toLowerCase().includes("student") || title.toLowerCase().includes("bachelor")) return <GraduationCap className="h-7 w-7 text-primary" />
  return <Rocket className="h-7 w-7 text-primary" />
}

export function TimelineSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      date: "Jan 2025 - Present",
      title: "Asscoiate Software Engineer - GEN AI",
      company: "Connected Value Health Solutions",
      description:
        "Built a React based LLM voice agent for human-like calls to automate bookings, reschedules, cancellations, and info via PostgreSQL. Integrated with AWS services for real-time data processing and analytics.",
      skills: ["AWS", "GEN AI", "Python", "FastAPI"],
    },
    {
      id: 2,
      date: "May 2024 - June 2024",
      title: "AI/ML Intern",
      company: "OnFocus Software Pvt Ltd.",
      description:
        "Developed PropGPT using LangChain and RAG to streamline property data workflows and built a dataset of 1,000+ TGRERA-registered properties for accurate real estate information retrieval.",
      skills: ["Python", "LangChain", "OpenAI API", "FastAPI", "Rag"],
    },
  ]

  return (
    <section id="experience" className="py-20" aria-label="Professional experience timeline">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">My Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional experience and career milestones.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated Timeline Line */}
          <motion.div
            ref={containerRef}
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 -translate-x-1/2 w-1 bg-gradient-to-b from-primary/80 via-primary/30 to-transparent rounded-full z-0"
            style={{ minHeight: "100%" }}
          />

          <div className="flex flex-col gap-16 relative z-10">
            {timelineItems.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
                isLast={index === timelineItems.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({
  item,
  index,
  isLeft,
  isLast,
}: {
  item: TimelineItem
  index: number
  isLeft: boolean
  isLast: boolean
}) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.5 })

  // Animation for card entry
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const x = useTransform(scrollYProgress, [0, 0.5], [isLeft ? -60 : 60, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x }}
      className={`relative flex flex-col md:flex-row items-center md:items-stretch ${isLeft ? "md:justify-start" : "md:justify-end"}`}
    >
      {/* Icon and Dot */}
      <div className="flex flex-col items-center md:items-center md:w-1/2 md:order-none order-2">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 * index }}
          className="z-20 mb-2 md:mb-0 md:mt-0 bg-background p-2 rounded-full shadow-lg border-2 border-primary/40"
        >
          {iconForTitle(item.title)}
        </motion.div>
        {/* Timeline Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.15 * index }}
          className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-md z-10"
        />
        {/* Connector (hide for last) */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: 60 } : { height: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            className="w-1 bg-primary/30 rounded-full my-1"
            style={{ height: 60 }}
          />
        )}
      </div>
      {/* Card */}
      <motion.div
        className={`md:w-1/2 w-full ${isLeft ? "md:pr-12 md:pl-0" : "md:pl-12 md:pr-0"} order-1 md:order-none`}
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.1 * index, type: "spring", stiffness: 120 }}
      >
        <Card className="bg-white/10 backdrop-blur-md shadow-xl border border-white/10">
          <CardContent className="p-6">
            <Badge variant="outline" className="mb-2">
              {item.date}
            </Badge>
            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
            <p className="text-primary font-medium mb-3">{item.company}</p>
            <p className="text-muted-foreground mb-4">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
