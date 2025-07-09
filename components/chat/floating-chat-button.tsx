"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatDialog } from "@/components/chat/chat-dialog"
import { SafeSvg } from "@/components/safe-svg"

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AnimatePresence>{isOpen && <ChatDialog onClose={() => setIsOpen(false)} />}</AnimatePresence>

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isOpen ? "close" : "chat"}
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <SafeSvg icon={X} props={{ className: "h-6 w-6" }} />
              ) : (
                <SafeSvg icon={MessageSquare} props={{ className: "h-6 w-6" }} />
              )}
            </motion.div>
          </AnimatePresence>
        </Button>
      </motion.div>
    </>
  )
}
