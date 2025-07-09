"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X, FileDown, Loader2 } from "lucide-react"

const SECTIONS = [
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
  { key: "projects", label: "Projects" },
  { key: "publications", label: "Publications" },
  { key: "skills", label: "Skills" },
]

export function ResumeBuilder({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [selected, setSelected] = useState<string[]>(SECTIONS.map(s => s.key))
  const [isGenerating, setIsGenerating] = useState(false)

  const toggleSection = (key: string) => {
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  const handleDownload = async () => {
    if (selected.length === 0) return
    
    setIsGenerating(true)
    try {
      // Dynamically import the PDF generation function to avoid SSR issues
      const { generatePDF } = await import("./resume-pdf-wrapper")
      const blob = await generatePDF(selected)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Prabhas_Mahanti_Resume_${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Build Your Custom Resume <FileDown className="h-5 w-5 text-primary" /></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Section selection */}
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Select Sections</h3>
            <div className="space-y-2">
              {SECTIONS.map(section => (
                <label key={section.key} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={selected.includes(section.key)} onCheckedChange={() => toggleSection(section.key)} />
                  <span>{section.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Live preview (placeholder) */}
          <div className="flex-1 bg-muted rounded-lg p-4 min-h-[200px]">
            <h3 className="font-semibold mb-2">Preview</h3>
            <div className="text-sm text-muted-foreground">
              {selected.length === 0 && <div className="italic">No sections selected.</div>}
              {selected.includes("education") && <div className="mb-2"><b>Education</b>: B.Tech in Computer Science AI, Amrita Vishwa Vidyapeetham (2021-2025)</div>}
              {selected.includes("experience") && <div className="mb-2"><b>Experience</b>: GEN AI Engineer at Connected Value Health Solutions, AI/ML Intern at OnFocus Software</div>}
              {selected.includes("projects") && <div className="mb-2"><b>Projects</b>: E-Commerce Platform, Task Management App, AI-Powered Chat Application</div>}
              {selected.includes("publications") && <div className="mb-2"><b>Publications</b>: Handwritten Digit Recognition using CNN (IEEE TEMSCON-ASPAC 2024)</div>}
              {selected.includes("skills") && <div className="mb-2"><b>Skills</b>: Python, React, AWS, LangChain, LLMs, RAG, SQL, etc.</div>}
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-row gap-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}><X className="h-4 w-4 mr-1" /> Close</Button>
          <Button 
            onClick={handleDownload} 
            disabled={selected.length === 0 || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4 mr-1" />
                Download PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 