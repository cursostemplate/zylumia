"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function EmailPopup() {
  const router = useRouter()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [showCouponPopup, setShowCouponPopup] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log("[v0] === POPUP SUBMIT STARTED ===")
    console.log("[v0] Form data:", { email, name })

    try {
      console.log("[v0] Calling /api/subscribe...")
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          source: "popup",
        }),
      })

      console.log("[v0] Response received - Status:", response.status, "OK:", response.ok)

      const result = await response.json()
      console.log("[v0] Response body:", JSON.stringify(result, null, 2))

      if (result.success) {
        console.log("[v0] SUCCESS - Showing success toast")
        toast({
          title: "✅ Cadastro realizado com sucesso!",
          description: `Bem-vindo ${name}! Seu cupom de desconto está pronto.`,
          duration: 5000,
        })

        console.log("[v0] Tracking popup event...")
        await fetch("/api/track-event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventType: "popup_interaction",
            email: email,
            name: name,
            action: "submitted",
            timestamp: Date.now(),
          }),
        }).catch((err) => console.error("[v0] Failed to track popup:", err))

        console.log("[v0] Closing first popup and showing coupon...")
        setIsOpen(false)
        setTimeout(() => {
          setShowCouponPopup(true)
        }, 300)
      } else {
        console.error("[v0] FAILED - API returned success=false")
        console.error("[v0] Error message:", result.message)
        toast({
          title: "❌ Erro no cadastro",
          description: result.message || "Ocorreu um erro. Por favor, tente novamente.",
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      console.error("[v0] EXCEPTION - Error in handleSubmit:", error)
      console.error("[v0] Error details:", {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      })

      toast({
        title: "❌ Erro de conexão",
        description: "Não foi possível completar o cadastro. Verifique sua conexão e tente novamente.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
      console.log("[v0] === POPUP SUBMIT FINISHED ===")
    }
  }

  const handleClose = () => {
    setIsOpen(false)

    fetch("/api/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "popup_interaction",
        action: "closed",
        timestamp: Date.now(),
      }),
    }).catch((err) => console.error("Failed to track popup close:", err))
  }

  const handleCloseCoupon = () => {
    setShowCouponPopup(false)

    fetch("/api/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "coupon_popup_interaction",
        action: "closed",
        timestamp: Date.now(),
      }),
    }).catch((err) => console.error("Failed to track coupon close:", err))
  }

  const handleGoToCheckout = () => {
    setShowCouponPopup(false)

    fetch("/api/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "coupon_popup_interaction",
        action: "go_to_checkout",
        timestamp: Date.now(),
      }),
    }).catch((err) => console.error("Failed to track checkout click:", err))

    router.push("/cart")
  }

  return (
    <>
      {/* Primeiro Popup - Email e Nome */}
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
                <h2 className="font-lora text-3xl font-bold mb-2 text-center">Get 70% Off</h2>
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

                  <Button type="submit" className="w-full py-6 text-lg font-semibold" disabled={isSubmitting}>
                    {isSubmitting ? "Subscribing..." : "Get My Discount"}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By subscribing, you agree to receive marketing emails from Zylumia
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Segundo Popup - Cupom de Desconto */}
      <AnimatePresence>
        {showCouponPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
            onClick={handleCloseCoupon}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-background rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseCoupon}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
                aria-label="Close coupon popup"
              >
                <X className="h-5 w-5 text-gray-800" />
              </button>

              {/* Imagem do Produto */}
              <div className="relative h-80 w-full">
                <Image
                  src="https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp"
                  alt="Zylumia Bio-Collagen Mask - Special Offer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Conteúdo do Cupom */}
              <div className="p-8 bg-gradient-to-b from-background to-gray-50">
                <div className="text-center mb-6">
                  <div className="inline-block bg-[#8c2a42] text-white px-6 py-2 rounded-full mb-4">
                    <span className="text-sm font-semibold">EXCLUSIVE OFFER</span>
                  </div>
                  <h2 className="font-lora text-4xl font-bold mb-3 text-gray-900">70% OFF</h2>
                  <p className="text-xl text-gray-700 mb-2">Your Exclusive Discount Code</p>
                  <div className="bg-white border-2 border-dashed border-[#8c2a42] rounded-lg p-4 mb-4 inline-block">
                    <p className="text-3xl font-bold text-[#8c2a42] tracking-wider">ZYLUMIA70</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    Use this code at checkout to get 70% off on your Bio-Collagen Mask!
                  </p>
                </div>

                {/* Botão para Checkout */}
                <Button
                  onClick={handleGoToCheckout}
                  className="w-full py-6 text-lg font-semibold bg-black hover:bg-gray-800 text-white rounded-xl shadow-lg transition-all hover:shadow-xl"
                >
                  Claim My Discount Now
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Limited time offer. Don't miss out on this amazing deal!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
