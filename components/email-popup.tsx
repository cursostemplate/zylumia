"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { subscribeEmail } from "@/lib/firebase-service"

export function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("emailPopupSeen")

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    const result = await subscribeEmail(email, name, "popup")

    if (result.success) {
      localStorage.setItem("emailPopupSeen", "true")
      setIsSuccess(true)

      // Close popup after 2 seconds
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    } else {
      setErrorMessage(result.message)
    }

    setIsSubmitting(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("emailPopupSeen", "true")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-background rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-64 w-full">
              <Image
                src="https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp"
                alt="Zylumia Bio-Collagen Mask"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="p-8 -mt-8 relative">
              {!isSuccess ? (
                <>
                  <h2 className="font-lora text-3xl font-bold mb-2 text-center">Get 15% Off</h2>
                  <p className="text-muted-foreground text-center mb-6">
                    Subscribe to our newsletter and receive exclusive offers on premium skincare
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name-input" className="sr-only">
                        Your name
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <div>
                      <label htmlFor="email-input" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    {errorMessage && <p className="text-sm text-destructive text-center">{errorMessage}</p>}

                    <Button type="submit" className="w-full py-6 text-lg font-semibold" disabled={isSubmitting}>
                      {isSubmitting ? "Subscribing..." : "Get My Discount"}
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By subscribing, you agree to receive marketing emails from Zylumia
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-lora text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">Check your email for your exclusive discount code</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
