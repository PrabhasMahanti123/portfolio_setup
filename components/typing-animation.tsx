import React, { useEffect, useState } from "react"

type TypingAnimationProps = {
  words: string[]
  typingSpeed?: number // ms per character
  deletingSpeed?: number // ms per character
  pause?: number // ms to pause at end of word
  className?: string
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pause = 1200,
  className = "",
}) => {
  const [displayed, setDisplayed] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentWord = words[wordIndex]

    if (!isDeleting && displayed.length < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length + 1))
      }, typingSpeed)
    } else if (!isDeleting && displayed.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length - 1))
      }, deletingSpeed)
    } else if (isDeleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }, 400)
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause])

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{displayed}</span>
      <span className="w-2 h-6 ml-1 bg-primary rounded animate-pulse" style={{ display: 'inline-block' }} />
    </span>
  )
}

export default TypingAnimation 