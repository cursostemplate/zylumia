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

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          source: "popup",
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: `Bem-vindo ${name}! Seu cupom de desconto está pronto.`,
          duration: 5000,
        })

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
        }).catch((err) => console.error("Failed to track popup:", err))

        setIsOpen(false)
        setTimeout(() => {
          setShowCouponPopup(true)
        }, 300)
      } else {
        toast({
          title: "Erro no cadastro",
          description: result.message || "Ocorreu um erro. Por favor, tente novamente.",
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Não foi possível completar o cadastro. Verifique sua conexão e tente novamente.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
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
      {/* Primeiro Popup - Coleta de Nome e Email */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-cream-100 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label="Close popup"
              >
                <X className="h-5 w-5 text-charcoal" />
              </button>

              <div className="p-10 pt-14">
                <div className="text-center mb-8">
                  <div className="inline-block bg-[#FFB5C0] text-charcoal px-5 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-5">
                    Exclusive Offer
                  </div>
                  <h2 className="font-serif text-4xl font-semibold text-charcoal mb-3">Get 70% Off</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Subscribe to our newsletter and receive exclusive offers on premium skincare
                  </p>
                </div>

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
                      className="w-full px-5 py-4 rounded-xl border border-blush-200 bg-white focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-400 transition-all text-charcoal placeholder:text-muted-foreground"
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
                      className="w-full px-5 py-4 rounded-xl border border-blush-200 bg-white focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-400 transition-all text-charcoal placeholder:text-muted-foreground"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-6 text-sm font-medium tracking-widest uppercase bg-charcoal hover:bg-charcoal-light text-white rounded-xl transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Get My Discount"}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-6">
                  By subscribing, you agree to receive marketing emails from Zylumia
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Segundo Popup - Cupom de Desconto com imagem do produto */}
      <AnimatePresence>
        {showCouponPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={handleCloseCoupon}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-cream-100 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseCoupon}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
                aria-label="Close coupon popup"
              >
                <X className="h-5 w-5 text-charcoal" />
              </button>

              {/* Imagem do Produto */}
              <div className="relative h-72 w-full bg-gradient-to-b from-blush-100 to-blush-50">
                <Image
                  src="https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp"
                  alt="Zylumia Bio-Collagen Mask - Special Offer"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>

              {/* Conteúdo do Cupom */}
              <div className="p-8 bg-cream-100">
                <div className="text-center mb-6">
                  <div className="inline-block bg-[#FFB5C0] text-charcoal px-5 py-1.5 rounded-full mb-4">
                    <span className="text-xs font-medium tracking-widest uppercase">Exclusive Offer</span>
                  </div>
                  <h2 className="font-serif text-5xl font-semibold mb-3 text-charcoal">70% OFF</h2>
                  <p className="text-lg text-muted-foreground mb-4">Your Exclusive Discount Code</p>
                  <div className="bg-white border-2 border-dashed border-[#FFB5C0] rounded-xl p-4 mb-4 inline-block">
                    <p className="text-3xl font-bold text-[#E89DA8] tracking-widest font-mono">ZYLUMIA70</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use this code at checkout to get 70% off on your Bio-Collagen Mask!
                  </p>
                </div>

                {/* Botão para Checkout */}
                <Button
                  onClick={handleGoToCheckout}
                  className="w-full py-6 text-sm font-medium tracking-widest uppercase bg-charcoal hover:bg-charcoal-light text-white rounded-xl shadow-lg transition-all hover:shadow-xl"
                >
                  Claim My Discount Now
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-5">
                  Limited time offer. Don&apos;t miss out on this amazing deal!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
