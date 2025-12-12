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
          className="bg-gradient-to-r from-[#FFB5C0] via-[#FFCDD5] to-[#FFB5C0] text-charcoal overflow-hidden"
        >
          <div className="container mx-auto px-4 h-14 flex items-center justify-center relative">
            <div className="flex items-center gap-3 md:gap-6 text-center">
              <p className="font-serif text-sm md:text-base font-medium tracking-wide">Summer Sale Ends In</p>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center bg-white/30 backdrop-blur-sm px-2 py-1 rounded">
                  <span className="font-mono text-lg font-bold text-charcoal">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-charcoal/70 uppercase tracking-wider">hours</span>
                </div>
                <span className="font-mono text-lg text-charcoal/60">:</span>
                <div className="flex flex-col items-center bg-white/30 backdrop-blur-sm px-2 py-1 rounded">
                  <span className="font-mono text-lg font-bold text-charcoal">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-charcoal/70 uppercase tracking-wider">mins</span>
                </div>
                <span className="font-mono text-lg text-charcoal/60">:</span>
                <div className="flex flex-col items-center bg-white/30 backdrop-blur-sm px-2 py-1 rounded">
                  <span className="font-mono text-lg font-bold text-charcoal">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-charcoal/70 uppercase tracking-wider">secs</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-charcoal/60 hover:text-charcoal hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
