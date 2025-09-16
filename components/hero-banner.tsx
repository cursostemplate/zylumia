"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import NextImage from "next/image"
import { ChevronLeft, ChevronRight, Star, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const bannerImages = [
  {
    main: "https://i.postimg.cc/ZqG8zTrc/Chat-GPT-Image-13-de-ago-de-2025-00-05-30.webp",
    thumb: "https://i.postimg.cc/ZqG8zTrc/Chat-GPT-Image-13-de-ago-de-2025-00-05-30.webp",
    alt: "Bio-Collagen Mask Results",
  },
  {
    main: "https://i.postimg.cc/XqdspnSj/Chat-GPT-Image-13-de-ago-de-2025-00-39-00.webp",
    thumb: "https://i.postimg.cc/XqdspnSj/Chat-GPT-Image-13-de-ago-de-2025-00-39-00.webp",
    alt: "Premium Skincare Product",
  },
  {
    main: "https://i.postimg.cc/c1zKJfXL/Transforma-o-de-Pele-com-M-scara.webp",
    thumb: "https://i.postimg.cc/c1zKJfXL/Transforma-o-de-Pele-com-M-scara.webp",
    alt: "Skin Transformation",
  },
  {
    main: "https://i.postimg.cc/wjVbXxt3/Chat-GPT-Image-13-de-ago-de-2025-00-39-12.webp",
    thumb: "https://i.postimg.cc/wjVbXxt3/Chat-GPT-Image-13-de-ago-de-2025-00-39-12.webp",
    alt: "Collagen Mask Application",
  },
  {
    main: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
    thumb: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
    alt: "Bio-Collagen Face Mask",
  },
  {
    main: "https://i.postimg.cc/KvQybN2g/screenshot-20250807171508.webp",
    thumb: "https://i.postimg.cc/KvQybN2g/screenshot-20250807171508.webp",
    alt: "Customer Results",
  },
  {
    main: "https://i.postimg.cc/VvDZxKCf/screenshot-20250807171513.webp",
    thumb: "https://i.postimg.cc/VvDZxKCf/screenshot-20250807171513.webp",
    alt: "Before After Results",
  },
  {
    main: "https://i.postimg.cc/nLBRFFDw/screenshot-20250807171515.webp",
    thumb: "https://i.postimg.cc/nLBRFFDw/screenshot-20250807171515.webp",
    alt: "Satisfied Customer",
  },
]

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

export function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedOfferId, setSelectedOfferId] = useState(3)
  const { addToCart } = useCart()
  const router = useRouter()
  const thumbnailScrollRef = useRef<HTMLDivElement>(null)
  const desktopThumbnailScrollRef = useRef<HTMLDivElement>(null)

  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId)

  // Notifica mudança de oferta para a barra sticky
  useEffect(() => {
    const event = new CustomEvent("offerSelected", {
      detail: { offerId: selectedOfferId },
    })
    window.dispatchEvent(event)
  }, [selectedOfferId])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bannerImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const scrollThumbnails = (direction: "left" | "right", ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollAmount = 150 // Quantidade de pixels para rolar
      const currentScroll = ref.current.scrollLeft
      const targetScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

      ref.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      })
    }
  }

  const handleAddToCart = () => {
    if (selectedOffer) {
      addToCart(selectedOffer)
      router.push("/cart")
    }
  }

  return (
    <section className="bg-gradient-to-br from-pink-50 to-white py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Layout Mobile - Centralizado com novas dimensões */}
        <div className="lg:hidden">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-lora text-brand mb-4">
              Wake Up to
              <br />
              <span className="text-brand">Glass Skin</span>
            </h1>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" className="w-5 h-5" />
                ))}
              </div>
              <span className="text-sm font-semibold">Rated 4.6 by 5000+ customers</span>
            </div>
          </div>

          {/* Container das imagens com dimensões específicas para mobile */}
          <div className="mb-6">
            <div className="flex items-center justify-center relative mb-6">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="w-[374px] h-[374px] relative">
                <NextImage
                  src={bannerImages[currentImageIndex].main}
                  alt={bannerImages[currentImageIndex].alt}
                  width={374}
                  height={374}
                  className="w-full h-full object-cover rounded-lg"
                  priority
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Carrossel de Thumbnails Mobile */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-md"
                onClick={() => scrollThumbnails("left", thumbnailScrollRef)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div
                ref={thumbnailScrollRef}
                className="flex gap-3 overflow-x-auto pb-2 px-8 scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {bannerImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`flex-shrink-0 w-[63px] h-[63px] rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-brand shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <NextImage
                      src={image.thumb}
                      alt={image.alt}
                      width={63}
                      height={63}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-md"
                onClick={() => scrollThumbnails("right", thumbnailScrollRef)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl font-bold">Bio-Collagen Mask</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-green-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" className="w-4 h-4" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.6/5 (5000+ reviews)</span>
                </div>
              </div>

              <div className="space-y-2">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <p className="text-sm">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="my-2 p-3 text-center bg-pink-100 text-brand rounded-lg">
                <p className="font-semibold text-sm">Summer Sale - Limited stock available!</p>
              </div>

              <div className="text-center my-2">
                <p className="font-bold text-lg uppercase tracking-widest text-brand">LIMITED TIME OFFER</p>
              </div>

              <div className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className={cn(
                      "border rounded-lg p-3 relative cursor-pointer transition-all flex items-center gap-3 shadow-sm",
                      selectedOfferId === offer.id
                        ? "border-brand border-[2px] bg-brand/5 shadow-md"
                        : "border-gray-200 bg-gray-50 hover:border-gray-400",
                    )}
                    onClick={() => setSelectedOfferId(offer.id)}
                  >
                    {offer.isPopular && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
                        Most Popular
                      </div>
                    )}
                    {offer.freeGift && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-bold px-2 py-1 rounded-full">
                        +1 FREE GIFT
                      </div>
                    )}

                    <NextImage src={offer.image} alt={offer.quantity} width={40} height={40} className="rounded-md" />

                    <div className="flex-1">
                      <p className="font-bold text-sm">{offer.quantity}</p>
                      <p className="text-xs text-muted-foreground">{offer.supply}</p>
                    </div>
                    <div className="text-center mx-2 flex-shrink-0">
                      <div className="bg-brand text-brand-foreground text-xs font-bold px-2 py-1 rounded-md flex flex-col items-center">
                        <span>SAVE</span>
                        <span>{offer.save}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-base">{offer.price}</p>
                      <p className="text-xs text-muted-foreground line-through">{offer.originalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full h-12 bg-black hover:bg-gray-800 text-white text-base font-bold mt-4"
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>

        {/* Layout Desktop - Reorganizado como antes: Imagens à esquerda, Ofertas à direita */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Imagens à Esquerda */}
            <div className="space-y-6">
              <div className="text-left">
                <h1 className="text-5xl font-bold font-lora text-brand mb-4">
                  Wake Up to
                  <br />
                  <span className="text-brand">Glass Skin</span>
                </h1>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" className="w-5 h-5" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">Rated 4.6 by 5000+ customers</span>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center relative mb-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <div className="w-[374px] h-[374px] relative">
                    <NextImage
                      src={bannerImages[currentImageIndex].main}
                      alt={bannerImages[currentImageIndex].alt}
                      width={374}
                      height={374}
                      className="w-full h-full object-cover rounded-lg"
                      priority
                    />
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* Carrossel de Thumbnails Desktop */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-md"
                    onClick={() => scrollThumbnails("left", desktopThumbnailScrollRef)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div
                    ref={desktopThumbnailScrollRef}
                    className="flex gap-3 overflow-x-auto pb-2 px-8 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {bannerImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`flex-shrink-0 w-[63px] h-[63px] rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? "border-brand shadow-lg scale-105"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <NextImage
                          src={image.thumb}
                          alt={image.alt}
                          width={63}
                          height={63}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-md"
                    onClick={() => scrollThumbnails("right", desktopThumbnailScrollRef)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Ofertas à Direita */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold">Bio-Collagen Mask</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-green-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" className="w-5 h-5" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.6/5 (5000+ reviews)</span>
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

              <div className="my-4 p-4 text-center bg-pink-100 text-brand rounded-lg">
                <p className="font-semibold">Summer Sale - Limited stock available!</p>
              </div>

              <div className="text-center my-4">
                <p className="font-bold text-xl uppercase tracking-widest text-brand">LIMITED TIME OFFER</p>
              </div>

              <div className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className={cn(
                      "border rounded-lg p-4 relative cursor-pointer transition-all flex items-center gap-4 shadow-sm",
                      selectedOfferId === offer.id
                        ? "border-brand border-[3px] bg-brand/5 shadow-md"
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
                className="w-full h-[49px] bg-black hover:bg-gray-800 text-white text-lg font-bold mt-6"
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
