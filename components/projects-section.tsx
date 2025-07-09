"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl: string
  featured?: boolean
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [currentProject, setCurrentProject] = useState<number>(0)

  const projects: Project[] = [
    {
      id: 1,
      title: "MedGPT",
      description:
        "MedGPT is a conversational AI assistant that helps users analyze their medical symptoms and recommends nearby doctors in Chennai.",
      image: "/medgpt.png",
      tags: ["Python", "SQL", "Streamlit", "AWS Bedrock", "Langchain"],
      liveUrl: "https://github.com/PrabhasMahanti123/MedGPT",
      githubUrl: "https://github.com/PrabhasMahanti123/MedGPT",
      featured: true,
    },
    {
      id: 2,
      title: "GYM Pro Manager",
      description:
        "Gym Pro Manager is to streamline gym management allows administrators to manage users and create workout slots, while users can book these slots, view workout guides, and manage their appointments.",
      image: "/gym_pro_manager.png",
      tags: ["React", "MongoDB", "Node.js", "Express.js", "Tailwind CSS"],
      liveUrl: "https://github.com/PrabhasMahanti123/Gym_Pro_Manager",
      githubUrl: "https://github.com/PrabhasMahanti123/Gym_Pro_Manager",
      featured: true,
    },
    {
      id: 3,
      title: "Q&A Chatbot for Government Schemes",
      description: "A chatbot that answers questions about government schemes and provides information about the schemes.",
      image: "/Yojana_sathi.webp?height=600&width=800",
      tags: ["Python", "Langchain", "Mistral", "Streamlit"],
      liveUrl: "https://github.com/PrabhasMahanti123/mistral_api/tree/main",
      githubUrl: "https://github.com/PrabhasMahanti123/mistral_api/tree/main",
    },
    // {
    //   id: 4,
    //   title: "AI-Powered Chat Application",
    //   description:
    //     "A real-time chat application with AI-powered responses and natural language processing capabilities.",
    //   image: "/Yojana_sathi.webp",
    //   tags: ["Next.js", "OpenAI", "WebSockets", "Vercel AI SDK"],
    //   liveUrl: "#",
    //   githubUrl: "#",
    //   featured: true,
    // },
  ]

  const featuredProjects = projects.filter((project) => project.featured)

  const categories = [
    "all",
    ...Array.from(new Set(projects.flatMap((p) => p.tags))).filter(
      (tag) => tag !== "Node.js" && tag !== "Express.js"
    ),
  ]
  if (!categories.includes("PostgreSQL")) {
    categories.push("PostgreSQL")
  }

  const filteredProjects = activeCategory === "all" ? projects : projects.filter((p) => p.tags.includes(activeCategory))

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const nextProject = () => {
    setCurrentProject((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1))
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1))
  }

  return (
    <section id="projects" className="py-20" aria-label="Projects showcase">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was built with a focus on performance, accessibility, and
            responsive design.
          </p>
        </div>

        {/* Featured Project Carousel */}
        <div className="mb-20">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <span className="w-8 h-0.5 bg-primary mr-3"></span>
            Featured Projects
          </h3>

          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
              <Button
                variant="secondary"
                size="icon"
                onClick={prevProject}
                className="rounded-full opacity-80 hover:opacity-100"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <Button
                variant="secondary"
                size="icon"
                onClick={nextProject}
                className="rounded-full opacity-80 hover:opacity-100"
                aria-label="Next project"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[16/9] max-h-[400px] w-full"
              >
                <Image
                  src={featuredProjects[currentProject].image || "/placeholder.svg"}
                  alt={featuredProjects[currentProject].title}
                  width={1280}
                  height={720}
                  className="object-cover object-center w-full h-full rounded-xl"
                  style={{ maxHeight: 400 }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{featuredProjects[currentProject].title}</h3>
                  <p className="text-muted-foreground mb-4 max-w-2xl">{featuredProjects[currentProject].description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProjects[currentProject].tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a href={featuredProjects[currentProject].githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    {/* <Button size="sm" className="gap-2" asChild>
                      <a href={featuredProjects[currentProject].liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Live 
                      </a>
                    </Button> */}
                  </div>
                </div>

                {/* Pagination dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {featuredProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProject(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentProject ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    {/* <Button size="sm" className="gap-2" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
