"use client"
import { useState } from "react"
import NextImage from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bannerImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <section className="bg-gradient-to-br from-pink-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Título Principal */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-lora text-brand mb-4">
              Wake Up to
              <br />
              <span className="text-brand">Glass Skin</span>
            </h1>

            {/* Rating */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" className="w-5 h-5" />
                ))}
              </div>
              <span className="text-sm font-semibold">Rated 4.6 by 5000+ customers</span>
            </div>
          </div>

          {/* Banner Principal */}
          <div className="relative bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-center justify-center relative">
              {/* Seta Esquerda */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Imagem Principal - 358x358px */}
              <div className="w-[358px] h-[358px] relative">
                <NextImage
                  src={bannerImages[currentImageIndex].main}
                  alt={bannerImages[currentImageIndex].alt}
                  width={358}
                  height={358}
                  className="w-full h-full object-cover rounded-lg"
                  priority
                />
              </div>

              {/* Seta Direita */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Indicadores de Slide */}
            <div className="flex justify-center gap-2 mt-6">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-brand w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails - 63x63px */}
          <div className="flex justify-center gap-3 overflow-x-auto pb-2">
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

          {/* Call to Action */}
          <div className="text-center mt-8">
            <Button
              size="lg"
              className="bg-brand hover:bg-brand/90 text-brand-foreground px-8 py-4 text-lg font-semibold"
            >
              Shop Now - Transform Your Skin
            </Button>
            <p className="text-sm text-muted-foreground mt-2">Free shipping worldwide • 60-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </section>
  )
}
