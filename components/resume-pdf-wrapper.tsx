"use client"

import React from "react"

// This component wraps the PDF generation to avoid SSR issues
export async function generatePDF(selectedSections: string[]) {
  // Only import and use react-pdf on the client side
  if (typeof window === "undefined") {
    throw new Error("PDF generation is only available on the client side")
  }

  try {
    const { Document, Page, Text, View, StyleSheet, pdf } = await import("@react-pdf/renderer")
    
    const styles = StyleSheet.create({
      page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 30,
        fontSize: 12,
      },
      header: {
        marginBottom: 20,
        borderBottom: "2 solid #3b82f6",
        paddingBottom: 10,
      },
      name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#3b82f6",
        marginBottom: 5,
      },
      title: {
        fontSize: 16,
        color: "#6b7280",
        marginBottom: 5,
      },
      contact: {
        fontSize: 10,
        color: "#6b7280",
        marginBottom: 5,
      },
      section: {
        marginBottom: 15,
      },
      sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#374151",
        marginBottom: 8,
        borderBottom: "1 solid #e5e7eb",
        paddingBottom: 3,
      },
      item: {
        marginBottom: 8,
      },
      itemTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#374151",
        marginBottom: 2,
      },
      itemSubtitle: {
        fontSize: 10,
        color: "#6b7280",
        marginBottom: 2,
      },
      itemDescription: {
        fontSize: 10,
        color: "#4b5563",
        marginBottom: 2,
      },
      skills: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
      },
      skill: {
        backgroundColor: "#f3f4f6",
        padding: "3 8",
        borderRadius: 3,
        fontSize: 9,
        color: "#374151",
      },
    })

    const ResumePDF = ({ selectedSections }: { selectedSections: string[] }) => (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>Prabhas Mahanti</Text>
            <Text style={styles.title}>Generative AI Developer & Machine Learning Engineer</Text>
            <Text style={styles.contact}>prabhasnaidu2004@gmail.com | Vizianagaram, Andhra Pradesh, India</Text>
          </View>

          {/* Education */}
          {selectedSections.includes("education") && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>Bachelors of Technology in Computer Science Artificial Intelligence</Text>
                <Text style={styles.itemSubtitle}>Amrita Vishwa Vidyapeetham | 2021-2025</Text>
              </View>
            </View>
          )}

          {/* Experience */}
          {selectedSections.includes("experience") && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>Associate Software Engineer - GEN AI</Text>
                <Text style={styles.itemSubtitle}>Connected Value Health Solutions | Jan 2025 - Present</Text>
                <Text style={styles.itemDescription}>• Built a React based LLM voice agent for human-like calls to automate bookings, reschedules, cancellations, and info via PostgreSQL</Text>
                <Text style={styles.itemDescription}>• Integrated with AWS services for real-time data processing and analytics</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>AI/ML Intern</Text>
                <Text style={styles.itemSubtitle}>OnFocus Software Pvt Ltd. | May 2024 - June 2024</Text>
                <Text style={styles.itemDescription}>• Developed PropGPT using LangChain and RAG to streamline property data workflows</Text>
                <Text style={styles.itemDescription}>• Built a dataset of 1,000+ TGRERA-registered properties for accurate real estate information retrieval</Text>
              </View>
            </View>
          )}

          {/* Projects */}
          {selectedSections.includes("projects") && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>MedGPT</Text>
                <Text style={styles.itemDescription}>A conversational AI assistant that helps users analyze their medical symptoms and recommends nearby doctors in Chennai.</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>GYM Pro Manager</Text>
                <Text style={styles.itemDescription}>A gym management system that allows administrators to manage users and create workout slots, while users can book these slots.</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>Q&A Chatbot for Government Schemes</Text>
                <Text style={styles.itemDescription}>A chatbot that answers questions about government schemes and provides information about the schemes.</Text>
              </View>
            </View>
          )}

          {/* Publications */}
          {selectedSections.includes("publications") && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Publications</Text>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>Handwritten Digit Recognition using Convolutional Neural Network</Text>
                <Text style={styles.itemSubtitle}>Technology & Engineering Management Conference - Asia Pacific (TEMSCON-ASPAC), IEEE | 2024</Text>
                <Text style={styles.itemDescription}>DOI: 10.1109/AIDE57418.2024.10531394</Text>
              </View>
            </View>
          )}

          {/* Skills */}
          {selectedSections.includes("skills") && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills & Technologies</Text>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>Frontend:</Text>
                <View style={styles.skills}>
                  <Text style={styles.skill}>React</Text>
                  <Text style={styles.skill}>HTML5</Text>
                  <Text style={styles.skill}>CSS3</Text>
                  <Text style={styles.skill}>JavaScript</Text>
                </View>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>Languages:</Text>
                <View style={styles.skills}>
                  <Text style={styles.skill}>Python</Text>
                  <Text style={styles.skill}>Java</Text>
                  <Text style={styles.skill}>SQL</Text>
                </View>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>Backend & Cloud:</Text>
                <View style={styles.skills}>
                  <Text style={styles.skill}>REST APIs</Text>
                  <Text style={styles.skill}>MongoDB</Text>
                  <Text style={styles.skill}>PostgreSQL</Text>
                  <Text style={styles.skill}>AWS</Text>
                </View>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>AI/ML:</Text>
                <View style={styles.skills}>
                  <Text style={styles.skill}>LangChain</Text>
                  <Text style={styles.skill}>LLMs</Text>
                  <Text style={styles.skill}>RAG</Text>
                  <Text style={styles.skill}>Machine Learning</Text>
                </View>
              </View>
            </View>
          )}
        </Page>
      </Document>
    )

    const blob = await pdf(<ResumePDF selectedSections={selectedSections} />).toBlob()
    return blob
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw new Error("Failed to generate PDF")
  }
} 