import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export function PublicationsSection() {
  return (
    <section id="publications" className="py-20 bg-muted/30" aria-label="Publications">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Publications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are my academic and professional publications.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a
                  href="https://ieeexplore.ieee.org/document/10531394"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-2"
                >
                  Handwritten Digit Recognition using Convolutional Neural Network
                  <ExternalLink className="h-4 w-4 inline-block" />
                </a>
              </h3>
              <div className="text-sm text-muted-foreground mb-2">
                <span>Prabhas Mahanti, et al.</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                <span>Technology & Engineering Management Conference - Asia Pacific (TEMSCON-ASPAC), IEEE</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Published: 2024 &nbsp;|&nbsp; <span>DOI: <a href="https://ieeexplore.ieee.org/document/10531394" target="_blank" rel="noopener noreferrer" className="underline">10.1109/AIDE57418.2024.10531394</a></span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 