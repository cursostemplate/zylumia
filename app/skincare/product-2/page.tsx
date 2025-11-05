"use client"

import { useState } from "react"
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

const productImages = [
  "https://ae-pic-a1.aliexpress-media.com/kf/S638886bbc3cf4999975f5fdd5852ea45k.jpg_960x960q75.jpg_.avif",
  "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
  "https://i.postimg.cc/ZqG8zTrc/Chat-GPT-Image-13-de-ago-de-2025-00-05-30.webp",
]

const benefits = [
  "Reduces wrinkles while you sleep",
  "Firms and tightens skin overnight",
  "Rich in peptides and retinol",
  "Non-greasy, fast-absorbing formula",
  "Clinically proven anti-aging results",
]

const offers = [
  {
    id: 201,
    quantity: "1 Night Cream",
    supply: "50ml Jar",
    save: "30%",
    price: "£34.95",
    originalPrice: "£49.95",
    image: "https://ae-pic-a1.aliexpress-media.com/kf/S638886bbc3cf4999975f5fdd5852ea45k.jpg_960x960q75.jpg_.avif",
    isPopular: false,
    freeGift: false,
    priceId: "price_cream_1",
  },
  {
    id: 202,
    quantity: "2 Night Creams",
    supply: "100ml Total",
    save: "40%",
    price: "£59.95",
    originalPrice: "£99.90",
    image: "https://ae-pic-a1.aliexpress-media.com/kf/S638886bbc3cf4999975f5fdd5852ea45k.jpg_960x960q75.jpg_.avif",
    isPopular: true,
    freeGift: false,
    priceId: "price_cream_2",
  },
  {
    id: 203,
    quantity: "3 Night Creams",
    supply: "150ml Total",
    save: "50%",
    price: "£74.95",
    originalPrice: "£149.85",
    image: "https://ae-pic-a1.aliexpress-media.com/kf/S638886bbc3cf4999975f5fdd5852ea45k.jpg_960x960q75.jpg_.avif",
    isPopular: false,
    freeGift: true,
    priceId: "price_cream_3",
  },
]

export default function Product2Page() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedOfferId, setSelectedOfferId] = useState(202)
  const { addToCart, openCartDrawer } = useCart()

  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const handleAddToCart = () => {
    if (selectedOffer) {
      addToCart(selectedOffer)
      openCartDrawer()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link href="/skincare" className="text-brand hover:underline">
              ← Back to Skincare
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="relative">
                <div className="aspect-square bg-white rounded-lg overflow-hidden">
                  <NextImage
                    src={productImages[currentImageIndex]}
                    alt="Anti-Aging Night Cream"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 justify-center">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-brand" : "border-gray-200"
                    }`}
                  >
                    <NextImage
                      src={image}
                      alt={`Product view ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold font-lora text-brand">Anti-Aging Night Cream</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" className="w-5 h-5" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.7/5 (1,890+ reviews)</span>
                </div>
              </div>

              <div className="space-y-3">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-pink-400 flex-shrink-0" />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-pink-100 text-brand rounded-lg text-center">
                <p className="font-semibold">Night Special - Extra 10% Off!</p>
              </div>

              <div className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`border rounded-lg p-4 relative cursor-pointer transition-all flex items-center gap-4 ${
                      selectedOfferId === offer.id
                        ? "border-brand border-2 bg-brand/5"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedOfferId(offer.id)}
                  >
                    {offer.isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </div>
                    )}
                    {offer.freeGift && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">
                        +1 FREE GIFT
                      </div>
                    )}

                    <NextImage src={offer.image} alt={offer.quantity} width={48} height={48} className="rounded-md" />

                    <div className="flex-1">
                      <p className="font-bold">{offer.quantity}</p>
                      <p className="text-sm text-muted-foreground">{offer.supply}</p>
                    </div>

                    <div className="text-center mx-2">
                      <div className="bg-brand text-brand-foreground text-xs font-bold px-2 py-1 rounded-md">
                        SAVE {offer.save}
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
                className="w-full h-12 bg-black hover:bg-gray-800 text-white text-lg font-bold"
              >
                ADD TO CART
              </Button>

              <div className="flex justify-center">
                <NextImage
                  src="/payment-icons.webp"
                  alt="Secure payment methods"
                  width={300}
                  height={50}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
