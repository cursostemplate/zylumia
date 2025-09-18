"use client"
import { Star, Filter, ChevronLeft, ChevronRight, Play, X, Instagram } from "lucide-react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const products = [
  {
    id: 1,
    name: "Bio-Collagen Mask",
    price: "£21.95",
    originalPrice: "£34.95",
    discount: "37%",
    rating: 5,
    reviewCount: 5000,
    image: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
    description:
      "Premium Korean bio-collagen face mask for anti-aging and deep hydration. Visible results after just one use.",
    quantity: "4 Masks",
    supply: "1 Month Supply",
    save: "28%",
    isPopular: false,
    freeGift: false,
    priceId: "price_1RuNUi7NJwNT4LyHobs3baD6",
  },
  {
    id: 2,
    name: "Anti-Wrinkle Collagen Mask",
    price: "£30.95",
    originalPrice: "£69.90",
    discount: "56%",
    rating: 5,
    reviewCount: 3200,
    image: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
    description: "Advanced anti-wrinkle formula with concentrated collagen peptides. Reduces fine lines and wrinkles.",
    quantity: "8 Masks",
    supply: "2 Month Supply",
    save: "56%",
    isPopular: false,
    freeGift: false,
    priceId: "price_1RuNVc7NJwNT4LyHIzKpUcL1",
  },
  {
    id: 3,
    name: "Premium Collagen Mask",
    price: "£38.95",
    originalPrice: "£104.85",
    discount: "62%",
    rating: 5,
    reviewCount: 4800,
    image: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
    description: "Most popular choice with maximum hydration and anti-aging benefits. Professional-grade skincare.",
    quantity: "12 Masks",
    supply: "3 Month Supply",
    save: "62%",
    isPopular: true,
    freeGift: false,
    priceId: "price_1RuNWg7NJwNT4LyHmKMp8wKv",
  },
  {
    id: 4,
    name: "Luxury Collagen Mask",
    price: "£48.95",
    originalPrice: "£139.80",
    discount: "66%",
    rating: 5,
    reviewCount: 2900,
    image: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
    description:
      "Luxury formula with free gift included for ultimate skincare experience. Clean, science-backed formula.",
    quantity: "16 Masks",
    supply: "4 Month Supply",
    save: "66%",
    isPopular: false,
    freeGift: true,
    priceId: "price_1RuNXf7NJwNT4LyHDmObIlXF",
  },
  {
    id: 5,
    name: "Ultimate Collagen Mask",
    price: "£65.95",
    originalPrice: "£209.70",
    discount: "70%",
    rating: 5,
    reviewCount: 1800,
    image: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
    description: "Ultimate 6-month supply for long-term skin transformation. Professional results at home.",
    quantity: "24 Masks",
    supply: "6 Month Supply",
    save: "70%",
    isPopular: false,
    freeGift: false,
    priceId: "price_1RuNYq7NJwNT4LyHC4QegQ7N",
  },
]

const essenceVideos = [
  {
    id: 1,
    title: "Our Essence - Video 1",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-09-11T21_28_22.681Z_Pippit_202509111828.mp4",
    thumbnail: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
  },
  {
    id: 2,
    title: "Our Essence - Video 2",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-09-11T21_05_36.573Z_Pippit_202509111805.mp4",
    thumbnail: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
  },
  {
    id: 3,
    title: "Our Essence - Video 3",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-08-06T04_35_28.536Z_Pippit_202508060135.mp4",
    thumbnail: "https://storage.googleapis.com/site-zylumia/M%C3%A1scara%20Facial%20Bio-Col%C3%A1gena%20Zylumia.png",
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

export default function SkincarePage() {
  const { addToCart } = useCart()
  const router = useRouter()
  const [sortBy, setSortBy] = useState("popular")
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const handleAddToCart = (product: any) => {
    addToCart(product)
    trackAddToCart(product)
    router.push("/cart")
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number.parseFloat(a.price.replace("£", "")) - Number.parseFloat(b.price.replace("£", ""))
      case "price-high":
        return Number.parseFloat(b.price.replace("£", "")) - Number.parseFloat(a.price.replace("£", ""))
      case "rating":
        return b.rating - a.rating
      default:
        return b.reviewCount - a.reviewCount
    }
  })

  const nextVideoSlide = () => {
    setCurrentVideoSlide((prev) => (prev + 1) % essenceVideos.length)
  }

  const prevVideoSlide = () => {
    setCurrentVideoSlide((prev) => (prev - 1 + essenceVideos.length) % essenceVideos.length)
  }

  const openVideoModal = (video: any) => {
    setSelectedVideo(video)
    setIsVideoModalOpen(true)
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
    setSelectedVideo(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero Banner com Vídeo */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
          aria-label="Background video showcasing skincare transformation"
        >
          <source
            src="https://storage.googleapis.com/site-zylumia/a07465bbfc814d988daa8d1376c5c359.mp4"
            type="video/mp4"
          />
          <track kind="captions" srcLang="en" label="English captions" />
        </video>
        <div className="absolute inset-0 bg-black/30" />

        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 5, times: [0, 0.8, 1] }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-lora mb-4">Transform Your Skin Today</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover our premium Bio-Collagen masks with exclusive offers
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" className="w-6 h-6" />
              ))}
            </div>
            <span className="text-lg font-semibold">4.6/5 from 5,000+ customers</span>
          </div>
          <Button asChild size="lg" className="bg-brand hover:bg-brand/90 text-white px-8 py-4 text-lg font-semibold">
            <Link href="#products">Shop Now</Link>
          </Button>
        </motion.div>

        {/* Instagram Link */}
        <div className="absolute bottom-4 right-4 z-20">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full"
          >
            <a
              href="https://www.instagram.com/zylumiaa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </Button>
        </div>
      </section>

      <main className="flex-grow bg-gray-50">
        {/* About Zylumia Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold font-lora text-brand text-center mb-8">About Zylumia</h2>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-brand mb-4">The Journey to Rediscover Confidence</h3>
                  <p>
                    At Zylumia, we believe that skincare is more than just about appearance — it's about confidence,
                    renewal, and feeling like yourself again at every stage of life. Over the years, we've seen how the
                    natural aging process can affect not only the texture and radiance of the skin but also a woman's
                    self-esteem. Many of our clients shared the same frustration: despite years of care, their skin that
                    once felt smooth and firm gradually became dull, fragile, and visibly lined, especially on the neck
                    and arms. They tried countless creams, serums, and expensive department store products, but nothing
                    delivered results that lasted.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-brand mb-4">The Frustrating Search for Solutions</h3>
                  <p>
                    We listened carefully. We realized it wasn't about chasing perfection, but about helping women feel
                    renewed, radiant, and confident in their own skin again. Most products on the market only mask the
                    symptoms — providing a quick boost of moisture that fades within hours — but they fail to address
                    the deeper causes of skin aging: the loss of collagen, decreased elasticity, slower cell renewal,
                    and a weakened skin barrier.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-brand mb-4">The Scientific Breakthrough</h3>
                  <p>
                    That's why Zylumia was born. Our mission is to go beyond superficial fixes and create advanced
                    skincare solutions that work at the cellular level. After years of research, testing, and
                    formulation, we developed a unique blend of active ingredients designed to penetrate deeply,
                    stimulate collagen production, repair elasticity, and lock in lasting hydration. The result isn't
                    just temporary softness — it's true restoration.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-brand mb-4">Our Promise to You</h3>
                  <p>
                    At Zylumia, we go beyond empty promises. Our products are backed by science, formulated with
                    intelligent complexes that reinforce collagen and elastin, deep hydration technology that locks in
                    moisture for hours, and carefully selected ingredients that fight the signs of aging where they
                    truly begin. Every formula is clean, cruelty-free, and designed with real women in mind.
                  </p>
                </div>

                <div className="bg-pink-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-brand mb-4">Join the Zylumia Movement</h3>
                  <div className="space-y-3">
                    <p className="italic">
                      ✨ "Nothing worked until Zylumia. After just a few weeks, the skin on my neck and chest looked
                      visibly firmer and smoother. It truly gave me my confidence back." – Carolyn, 61
                    </p>
                    <p className="italic">
                      ✨ "At first, I was skeptical, but it changed everything. My skin is softer, more hydrated, and
                      firmer. I started wearing short sleeves again without hesitation." – Belinda, 56
                    </p>
                    <p className="italic">
                      ✨ "Menopause left my skin dry and tired. Now it glows. I feel like myself again — only better." –
                      Elaine, 59
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Essência Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold font-lora text-brand mb-8">Nossa Essência</h2>

              <div className="prose prose-lg max-w-none text-gray-700 mb-12">
                <p className="text-xl leading-relaxed">
                  At the heart of Zylumia lies our essence: the unwavering belief that every woman deserves to feel
                  radiant and confident in her own skin. Our essence is built on three fundamental pillars that guide
                  everything we do.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-8 text-left">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-brand mb-3">Science & Innovation</h3>
                    <p>
                      We combine cutting-edge research with time-tested ingredients to create formulations that deliver
                      real, visible results.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-brand mb-3">Authenticity & Trust</h3>
                    <p>
                      We believe in transparency, honest communication, and products that live up to their promises
                      without compromise.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-brand mb-3">Empowerment & Confidence</h3>
                    <p>
                      Our mission goes beyond skincare – we're here to help women rediscover their confidence and
                      embrace their natural beauty.
                    </p>
                  </div>
                </div>
              </div>

              {/* Video Carousel */}
              <div className="relative max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-brand mb-6">Discover Our Story</h3>

                <div className="relative overflow-hidden rounded-lg">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentVideoSlide * 100}%)` }}
                  >
                    {essenceVideos.map((video) => (
                      <div key={video.id} className="w-full flex-shrink-0">
                        <div
                          className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
                          onClick={() => openVideoModal(video)}
                        >
                          <NextImage
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="bg-white/90 rounded-full p-4 group-hover:bg-white transition-colors">
                              <Play className="h-8 w-8 text-brand ml-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevVideoSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextVideoSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                  {essenceVideos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVideoSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentVideoSlide ? "bg-brand" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-white" id="products">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-lora text-center mb-4">Skincare Collection</h2>

            {/* Filter and Sort Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-brand">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filter and sort</span>
              </div>
              <span className="text-sm text-muted-foreground">{products.length} products</span>
            </div>

            {/* Products Grid - Dimensões 170x335.37px */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  style={{ width: "170px", height: "335.37px" }}
                >
                  {/* Product Image */}
                  <div className="relative h-[180px] bg-gray-100">
                    <NextImage src={product.image} alt={product.name} fill className="object-cover" />

                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded text-xs font-bold">
                      SAVE {product.discount}
                    </div>

                    {/* Popular Badge */}
                    {product.isPopular && (
                      <div className="absolute top-2 right-2 bg-brand text-white px-2 py-1 rounded text-xs font-bold">
                        POPULAR
                      </div>
                    )}

                    {/* Free Gift Badge */}
                    {product.freeGift && (
                      <div className="absolute top-8 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                        FREE GIFT
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3 flex flex-col h-[155.37px]">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(product.rating)].map((_, i) => (
                          <Star key={i} fill="currentColor" className="w-3 h-3" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-semibold text-xs mb-2 line-clamp-2">{product.name}</h3>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2 flex-grow">{product.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-1 mb-2">
                      <span className="font-bold text-brand text-sm">{product.price}</span>
                      <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-brand hover:bg-brand/90 text-white text-xs font-semibold py-1 h-8"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <video src={selectedVideo.url} controls autoPlay className="w-full h-full rounded-lg" />

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={closeVideoModal}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Back Button */}
              <Button
                variant="ghost"
                className="absolute -top-12 left-0 text-white hover:bg-white/20"
                onClick={closeVideoModal}
              >
                ← Back
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  )
}
