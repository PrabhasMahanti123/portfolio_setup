import { GoogleGenerativeAI } from "@google/generative-ai"

export const runtime = "nodejs"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!) // Set your Gemini API key in .env

// Portfolio information context
const PORTFOLIO_CONTEXT = `
You are an AI assistant for Prabhas Mahanti's portfolio website. Here is the comprehensive information about Prabhas:

PERSONAL INFORMATION:
- Name: Prabhas Mahanti
- Education: Bachelors of Technology in Computer Science Artificial Intelligence at Amrita Vishwa Vidyapeetham (2021-2025)
- Location: Vizianagaram, Andhra Pradesh, India
- Role: Generative AI developer and Machine Learning engineer

PROFESSIONAL EXPERIENCE:
1. Associate Software Engineer - GEN AI at Connected Value Health Solutions (Jan 2025 - Present)
   - Built a React based LLM voice agent for human-like calls to automate bookings, reschedules, cancellations, and info via PostgreSQL
   - Integrated with AWS services for real-time data processing and analytics
   - Skills used: AWS, GEN AI, Python, FastAPI

2. AI/ML Intern at OnFocus Software Pvt Ltd. (May 2024 - June 2024)
   - Developed PropGPT using LangChain and RAG to streamline property data workflows
   - Built a dataset of 1,000+ TGRERA-registered properties for accurate real estate information retrieval
   - Skills used: Python, LangChain, OpenAI API, FastAPI, RAG

SKILLS & EXPERTISE:
- Frontend: React, HTML5, CSS3, JavaScript
- Languages: Python, Java, SQL
- Backend: REST APIs, MongoDB, PostgreSQL
- Tools: Git, GitHub, VS Code, Figma, Vercel
- Cloud: AWS
- Concepts: Object-Oriented Programming, Data Structures, Machine Learning, Large Language Models

SPECIALIZATION:
Prabhas specializes in modern AI technologies including:
- Intelligent agents and LLMs
- RAG (Retrieval-Augmented Generation) pipelines
- LangChain framework
- Building scalable and context-aware systems
- Automation and intelligent decision-making

PROJECTS:
- E-Commerce Platform (Next.js, TypeScript, Tailwind CSS, Stripe)
- Task Management App (React, Firebase, Framer Motion, Tailwind CSS)
- Personal Blog (Next.js, MDX, Tailwind CSS, Vercel)
- AI-Powered Chat Application (Next.js, OpenAI, WebSockets, Vercel AI SDK)

RESPONSE GUIDELINES:
When responding to questions, follow these formatting guidelines:

1. **For Experience Questions**: Structure your response with clear sections:
   - Current Role: [Company and position]
   - Previous Experience: [Previous roles]
   - Key Achievements: [Bullet points of main accomplishments]

2. **For Skills Questions**: Organize by categories:
   - Frontend Technologies: [List]
   - Backend & Databases: [List]
   - AI/ML Technologies: [List]
   - Tools & Platforms: [List]

3. **For Project Questions**: Use structured format:
   - Project Name: [Name]
   - Technologies: [Tech stack]
   - Description: [What it does]
   - Key Features: [Bullet points]

4. **For General Questions**: Use clear paragraphs with bullet points where appropriate.

Always be conversational, helpful, and accurate. Use proper formatting with bullet points, clear sections, and organized information. Make responses easy to read and well-structured.
`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    // Add portfolio context to the conversation
    const systemMessage = {
      role: "user" as const,
      parts: [{ text: PORTFOLIO_CONTEXT }]
    }
    
    // Format messages for Gemini: [{role: "user"|"model", parts: [{text: string}]}]
    const formattedMessages = [
      systemMessage,
      ...messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }))
    ]

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const result = await model.generateContent({
      contents: formattedMessages
    })
    const text = result.response.text()

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error in chat route:", error)
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}