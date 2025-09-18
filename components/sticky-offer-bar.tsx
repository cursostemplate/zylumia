"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { motion, AnimatePresence, useInView } from "framer-motion"

const offers = [
  {
    id: 1,
    quantity: "4 Masks",
    supply: "1 Month Supply",
    save: "28%",
    price: "£21.95",
    originalPrice: "£34.95",
    image: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
    isPopular: false,
    freeGift: false,
    priceId: "price_1RuNUi7NJwNT4LyHobs3baD6",
  },
  {
    id: 2,
    quantity: "8 Masks",
    supply: "2 Month Supply",
    save: "56%",
    price: "£30.95",
    originalPrice: "£69.90",
    image: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
    isPopular: false,
    freeGift: false,
    priceId: "price_1RuNVc7NJwNT4LyHIzKpUcL1",
  },
  {
    id: 3,
    quantity: "12 Masks",
    supply: "3 Month Supply",
    save: "62%",
    price: "£38.95",
    originalPrice: "£104.85",
    image: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
    isPopular: true,
    freeGift: false,
    priceId: "price_1RuNWg7NJwNT4LyHmKMp8wKv",
  },
  {
    id: 4,
    quantity: "16 Masks",
    supply: "4 Month Supply",
    save: "66%",
    price: "£48.95",
    originalPrice: "£139.80",
    image: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
    isPopular: false,
    freeGift: true,
    priceId: "price_1RuNXf7NJwNT4LyHDmObIlXF",
  },
  {
    id: 5,
    quantity: "24 Masks",
    supply: "6 Month Supply",
    save: "70%",
    price: "£65.95",
    originalPrice: "£209.70",
    image: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
    isPopular: false,
    freeGift: false,
    priceId: "price_1RuNYq7NJwNT4LyHC4QegQ7N",
  },
]

// Função para enviar evento para Google Analytics
const trackAddToCart = (item: any) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: "GBP",
      value: Number.parseFloat(item.price.replace("£", "")),
      items: [
        {
          item_id: item.id.toString(),
          item_name: `Bio-Collagen ${item.quantity}`,
          item_category: "Skincare",
          item_variant: item.supply,
          quantity: 1,
          price: Number.parseFloat(item.price.replace("£", "")),
        },
      ],
    })
  }
}

export function StickyOfferBar({ testimonialsRef }: { testimonialsRef?: React.RefObject<HTMLDivElement> }) {
  const [showStickyButton, setShowStickyButton] = useState(false)
  const [selectedOfferId, setSelectedOfferId] = useState(3) // Padrão: 12 Masks
  const { addToCart } = useCart()
  const router = useRouter()
  const isInView = useInView(testimonialsRef, { once: true })

  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId)

  // Monitora scroll para mostrar/esconder barra sticky
  useEffect(() => {
    if (isInView && testimonialsRef?.current) {
      const handleScroll = () => {
        if (testimonialsRef.current) {
          const { top } = testimonialsRef.current.getBoundingClientRect()
          setShowStickyButton(top < window.innerHeight)
        }
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [isInView, testimonialsRef])

  // Escuta mudanças na seleção de ofertas do HeroBanner
  useEffect(() => {
    const handleOfferChange = (event: CustomEvent) => {
      setSelectedOfferId(event.detail.offerId)
    }

    window.addEventListener("offerSelected", handleOfferChange as EventListener)
    return () => window.removeEventListener("offerSelected", handleOfferChange as EventListener)
  }, [])

  const handleAddToCart = () => {
    if (selectedOffer) {
      addToCart(selectedOffer)
      trackAddToCart(selectedOffer)
      router.push("/cart")
    }
  }

  if (!testimonialsRef) return null

  return (
    <AnimatePresence>
      {showStickyButton && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3 border-t shadow-lg z-50"
        >
          <div className="container mx-auto px-4">
            {/* Layout Mobile */}
            <div className="flex items-center justify-between gap-3 sm:hidden">
              <Button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-black hover:bg-gray-800 text-white text-sm font-bold rounded-lg"
              >
                ADD TO CART
              </Button>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-right">
                  <p className="font-bold text-xs leading-tight text-black">{selectedOffer?.quantity}</p>
                  <p className="font-bold text-sm leading-tight text-black">{selectedOffer?.price}</p>
                </div>
                <NextImage
                  src={selectedOffer?.image || ""}
                  alt="Selected offer"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </div>
            </div>

            {/* Layout Desktop */}
            <div className="hidden sm:flex items-center justify-between gap-3 max-w-sm mx-auto">
              <Button
                onClick={handleAddToCart}
                className="flex-shrink-0 h-12 bg-black hover:bg-gray-800 text-white text-base font-bold px-6 rounded-lg"
              >
                ADD TO CART
              </Button>
              <div className="flex items-center gap-3 min-w-0">
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-sm leading-tight text-black">{selectedOffer?.quantity}</p>
                  <p className="font-bold text-lg leading-tight text-black">{selectedOffer?.price}</p>
                </div>
                <NextImage
                  src={selectedOffer?.image || ""}
                  alt="Selected offer"
                  width={48}
                  height={48}
                  className="rounded-md flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
