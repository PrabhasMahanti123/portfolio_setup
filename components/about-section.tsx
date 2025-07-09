"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ResumeDownload } from "@/components/resume-download"
import { ResumeBuilder } from "@/components/resume-builder"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const imageRef = useRef(null)
  const [resumeBuilderOpen, setResumeBuilderOpen] = useState(false)

  // Parallax effect for image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="py-20 bg-muted/30" aria-label="About me section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div ref={imageRef} variants={itemVariants} className="relative flex justify-center items-center mx-auto" style={{ y: imageY }}>
            <div className="relative aspect-square overflow-hidden rounded-lg flex justify-center items-center">
              <Image
                src="/prabhas_photo.jpg?height=600&width=650"
                alt="Profile"
                width={600}
                height={600}
                className="object-cover"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-lg -z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            <motion.div
              className="absolute -top-6 -left-6 w-16 h-16 border-2 border-primary/20 rounded-lg -z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </motion.div>

          <div>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-2">
              About Me
            </motion.h2>

            <motion.div variants={itemVariants} className="w-20 h-1 bg-primary mb-6" />

            <motion.p variants={itemVariants} className="text-muted-foreground mb-4">
              Hello! I'm a passionate Generative AI developer and Machine Learning engineer with a strong 
              interest in building intelligent, real-world applications.
            </motion.p>

            <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
              With expertise in modern AI technologies like intelligent agents, LLMs, RAG pipelines, and LangChain, 
              I build scalable and context-aware systems that solve real-world problems through automation and intelligent decision-making.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="font-medium mb-2">Education</h3>
                <p className="text-sm text-muted-foreground">
                  Bachelors of Technology in Computer Science Artificial Intelligence
                  <br />
                  Amrita Vishwa Vidyapeetham, 2021-2025
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">
                  Vizianagaram, Andhra Pradesh, India 
                  <br />
                  
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex flex-col gap-2"
            >
              <ResumeDownload />
              <Button variant="outline" onClick={() => setResumeBuilderOpen(true)} type="button">
                Customize & Download Resume
              </Button>
              <ResumeBuilder open={resumeBuilderOpen} onOpenChange={setResumeBuilderOpen} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
