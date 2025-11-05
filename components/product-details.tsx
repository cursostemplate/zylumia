"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Star, CheckCircle2 } from "lucide-react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { motion, AnimatePresence, useInView } from "framer-motion"

const benefits = [
  "Collagen Boost for your skin",
  "Instant glow after 1 mask a week",
  "Helps reducing acne and bad skin",
  "Smooths wrinkles & fine lines in days",
  "Trusted Korean Beauty Formula",
]

const offers = [
  {
    id: 1,
    quantity: "4 Masks",
    supply: "1 Month Supply",
    save: "28%",
    price: "£21.95",
    originalPrice: "£34.95",
    image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
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
    image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
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
    image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
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
    image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
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
    image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
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

export function ProductDetails({ testimonialsRef }: { testimonialsRef?: React.RefObject<HTMLDivElement> }) {
  const [selectedOfferId, setSelectedOfferId] = useState(3)
  const { addToCart, openCartDrawer } = useCart()
  const [showStickyButton, setShowStickyButton] = useState(false)
  const isInView = useInView(testimonialsRef, { once: true })

  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId)

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

  // Força re-render da barra sticky quando a oferta selecionada muda
  useEffect(() => {
    // Trigger re-render to update sticky bar
  }, [selectedOfferId])

  const handleAddToCart = () => {
    if (selectedOffer) {
      addToCart(selectedOffer)
      trackAddToCart(selectedOffer)
      openCartDrawer()
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold">Bio-Collagen Mask</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-green-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" className="w-5 h-5" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.6/5 (5000+ reviews)</span>
          </div>
        </div>

        <div className="space-y-2">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-pink-400 flex-shrink-0" />
              <p dangerouslySetInnerHTML={{ __html: benefit.replace(/(\w+\s\w+)/, "<strong>$1</strong>") }} />
            </div>
          ))}
        </div>

        <div className="my-2 p-3 text-center bg-pink-100 text-brand rounded-lg">
          <p className="font-semibold">Summer Sale - Limited stock available!</p>
        </div>

        <div className="text-center my-2">
          <p className="font-semibold text-muted-foreground tracking-widest text-sm uppercase font-bold">
            LIMITED TIME OFFER
          </p>
        </div>

        <div className="space-y-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={cn(
                "border rounded-lg p-3 relative cursor-pointer transition-all flex items-center gap-4",
                selectedOfferId === offer.id
                  ? "border-brand border-[3px] bg-brand/5"
                  : "border-gray-200 bg-gray-50 hover:border-gray-400",
              )}
              onClick={() => setSelectedOfferId(offer.id)}
            >
              {offer.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Most Popular
                </div>
              )}
              {offer.freeGift && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">
                  +1 FREE GIFT
                </div>
              )}

              <NextImage src={offer.image} alt={offer.quantity} width={48} height={48} className="rounded-md" />

              <div className="flex-1">
                <p className="font-bold text-base">{offer.quantity}</p>
                <p className="text-sm text-muted-foreground">{offer.supply}</p>
              </div>
              <div className="text-center mx-2 flex-shrink-0">
                <div className="bg-brand text-brand-foreground text-xs font-bold px-2 py-1 rounded-md flex flex-col items-center">
                  <span>SAVE</span>
                  <span>{offer.save}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{offer.price}</p>
                <p className="text-sm text-muted-foreground line-through">{offer.originalPrice}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full h-[49px] bg-black hover:bg-gray-800 text-white text-lg font-bold mt-4"
          style={{ maxWidth: "370px", margin: "1rem auto 0" }}
        >
          ADD TO CART
        </Button>

        <div className="flex justify-center mt-4">
          <NextImage
            src="https://i.postimg.cc/rsXXQ6fr/Chat-GPT-Image-11-de-ago-de-2025-00-22-50.webp"
            alt="Secure payment methods"
            width={300}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Testimonial Compacto */}
        <div className="mt-6 p-3 border-t bg-gray-50/50 rounded-lg">
          <div className="flex items-start gap-3">
            <NextImage
              src="https://m.media-amazon.com/images/M/MV5BNTljODNiNTgtZWI4Mi00ZTI1LTk4ZGUtZTcxZmU0OGUzNjc1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
              alt="Dra. Sandra Lee"
              width={50}
              height={50}
              className="rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <p className="text-muted-foreground italic text-sm leading-relaxed">
                "As a dermatologist, I'm genuinely impressed by this formulation and results."
              </p>
              <p className="mt-2 font-semibold text-xs text-foreground">Dra. Sandra Lee, Dermatologist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Sticky Responsiva */}
      {testimonialsRef && (
        <AnimatePresence>
          {showStickyButton && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm p-3 border-t z-50"
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
                      <p className="font-bold text-xs leading-tight">{selectedOffer?.quantity}</p>
                      <p className="font-bold text-sm leading-tight">{selectedOffer?.price}</p>
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
                      <p className="font-bold text-sm leading-tight">{selectedOffer?.quantity}</p>
                      <p className="font-bold text-lg leading-tight">{selectedOffer?.price}</p>
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
      )}
    </>
  )
}
