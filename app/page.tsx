import { HeroSection } from "../components/hero-section"
import { AboutSection } from "../components/about-section"
import { ProjectsSection } from "../components/projects-section"
import { SkillsSection } from "../components/skills-section"
import { TimelineSection } from "../components/timeline-section"
import { ContactSection } from "../components/contact-section"
import { Footer } from "../components/footer"
import { FloatingChatButton } from "../components/chat/floating-chat-button"
import { PublicationsSection } from "../components/publications-section"

console.log({
  HeroSection,
  AboutSection,
  ProjectsSection,
  SkillsSection,
  TimelineSection,
  ContactSection,
  Footer,
  FloatingChatButton,
  PublicationsSection,
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <PublicationsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
      <FloatingChatButton />
    </main>
  )
}
