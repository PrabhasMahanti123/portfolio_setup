import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { href: "https://github.com/PrabhasMahanti123", icon: <Github className="h-5 w-5" />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/prabhas-naidu-mahanti-995a39284/", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
    // { href: "https://twitter.com/yourusername", icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    { href: "prabhasnaidu2004@gmail.com", icon: <Mail className="h-5 w-5" />, label: "Email" },
  ]

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-6 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">Designed and built with ❤️ by Prabhas😊</p>
            <p>© {currentYear} Prabhas. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
