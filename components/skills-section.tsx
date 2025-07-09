"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { 
  Code, 
  Layout, 
  Database, 
  Workflow, 
  Brain, 
  Cloud, 
  Sparkles,
  Star,
  Zap,
  Target,
  ArrowRight,
  CheckCircle
} from "lucide-react"
import TypingAnimation from "@/components/typing-animation"

type SkillCategory = {
  title: string
  icon: React.ReactNode
  skills: string[]
  color: string
  gradient: string
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      icon: <div className="bg-sky-100 dark:bg-sky-900 p-2 rounded-full"><Layout className="h-5 w-5 text-sky-600 dark:text-sky-300" /></div>,
      skills: ["React", "HTML5", "CSS3", "JavaScript"],
      color: "text-sky-400 dark:text-sky-300",
      gradient: ""
    },
    {
      title: "Languages",
      icon: <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full"><Code className="h-5 w-5 text-green-600 dark:text-green-300" /></div>,
      skills: ["Python", "Java", "SQL"],
      color: "text-green-400 dark:text-green-300",
      gradient: ""
    },
    {
      title: "Backend",
      icon: <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full"><Database className="h-5 w-5 text-purple-600 dark:text-purple-300" /></div>,
      skills: ["REST APIs", "MongoDB", "PostgreSQL"],
      color: "text-purple-400 dark:text-purple-300",
      gradient: ""
    },
    {
      title: "Tools",
      icon: <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full"><Workflow className="h-5 w-5 text-orange-500 dark:text-orange-300" /></div>,
      skills: ["Git", "GitHub", "VS Code", "Figma"],
      color: "text-orange-400 dark:text-orange-300",
      gradient: ""
    },
    {
      title: "Cloud",
      icon: <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full"><Cloud className="h-5 w-5 text-yellow-500 dark:text-yellow-300" /></div>,
      skills: ["AWS"],
      color: "text-yellow-400 dark:text-yellow-300",
      gradient: ""
    },
    {
      title: "AI/ML",
      icon: <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full"><Brain className="h-5 w-5 text-indigo-500 dark:text-indigo-300" /></div>,
      skills: ["Machine Learning", "Large Language Models", "Data Structures", "OOP"],
      color: "text-indigo-400 dark:text-indigo-300",
      gradient: ""
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      },
    },
  }

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    },
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden" aria-label="Skills and expertise">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
            </div>
            <Badge variant="outline" className="text-sm font-medium border-primary/30 text-primary">
              My Arsenal
            </Badge>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive toolkit of technologies and frameworks I use to bring ideas to life
          </p>
          {/* Key Skills Typing Animation - moved outside the card */}
          <div className="flex flex-col items-center justify-center mt-8 mb-2">
            <span className="text-base md:text-lg text-muted-foreground font-medium mb-1">Key Skills:</span>
            <TypingAnimation
              words={skillCategories.flatMap((cat) => cat.skills)}
              typingSpeed={80}
              deletingSpeed={40}
              pause={1200}
              className="text-primary font-semibold text-lg md:text-xl"
            />
          </div>
        </motion.div>

        {/* Skills Grid - Hexagonal Layout */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Main Card */}
              <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-md transition-all duration-500">
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/10 rounded-full blur-sm group-hover:bg-white/20 transition-colors duration-300" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/5 rounded-full blur-sm" />
                
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={skillVariants}
                      className="flex items-center gap-3 group/skill"
                    >
                      <div className={`w-2 h-2 rounded-full ${category.color} opacity-80 group-hover/skill:scale-150 transition-transform duration-300`} />
                      <span className="text-sm font-medium text-foreground/90 group-hover/skill:text-foreground transition-colors duration-300">
                        {skill}
                      </span>
                      <CheckCircle className="h-4 w-4 text-primary/60 ml-auto opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">6 Categories</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">20+ Skills</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Always Learning</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
