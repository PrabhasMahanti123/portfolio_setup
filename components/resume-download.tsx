import React from "react"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

export function ResumeDownload() {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button asChild className="gap-2" type="button">
        <a href="/PrabhasMahanti_Resume.pdf" download target="_blank" rel="noopener noreferrer">
          <FileText className="h-4 w-4" />
          Download PDF
        </a>
      </Button>
      <Button asChild className="gap-2" type="button" variant="outline" disabled>
        <a href="/PrabhasMahanti_Resume.docx" download target="_blank" rel="noopener noreferrer">
          <Download className="h-4 w-4" />
          Download DOCX
        </a>
      </Button>
      <Button asChild className="gap-2" type="button" variant="outline" disabled>
        <a href="/PrabhasMahanti_Resume.txt" download target="_blank" rel="noopener noreferrer">
          <Download className="h-4 w-4" />
          Download TXT
        </a>
      </Button>
    </div>
  )
} 