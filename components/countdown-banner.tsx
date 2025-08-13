"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export function CountdownBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 57 })

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          seconds = 59
          minutes--
        } else if (hours > 0) {
          seconds = 59
          minutes = 59
          hours--
        } else {
          clearInterval(timer)
          return { hours: 0, minutes: 0, seconds: 0 }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black text-white overflow-hidden"
        >
          <div className="container mx-auto px-4 h-16 flex items-center justify-center relative">
            <div className="flex items-center gap-2 md:gap-4 text-center">
              <p className="font-semibold text-sm uppercase tracking-wider">Summer Sale Ends In</p>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="font-mono text-lg font-bold">{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="text-xs text-gray-400">hour</span>
                </div>
                <span className="font-mono text-lg">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-mono text-lg font-bold">{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span className="text-xs text-gray-400">minute</span>
                </div>
                <span className="font-mono text-lg">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-mono text-lg font-bold">{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <span className="text-xs text-gray-400">second</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
              aria-label="Close banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
