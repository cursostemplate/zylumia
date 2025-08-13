"use client"

import { useRef } from "react"
import SiteHeader from "@/components/site-header"
import { FaqSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"
import { ImageSwiper } from "@/components/ui/image-swiper"
import { ProductDetails } from "@/components/product-details"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { CustomerReviews } from "@/components/customer-reviews"
import { ProductAccordionFeatures } from "@/components/product-accordion-features"
import { ProductFeatures } from "@/components/product-features"

const productImages = [
  "https://i.postimg.cc/ZqG8zTrc/Chat-GPT-Image-13-de-ago-de-2025-00-05-30.webp",
  "https://i.postimg.cc/XqdspnSj/Chat-GPT-Image-13-de-ago-de-2025-00-39-00.webp",
  "https://i.postimg.cc/c1zKJfXL/Transforma-o-de-Pele-com-M-scara.webp",
  "https://i.postimg.cc/wjVbXxt3/Chat-GPT-Image-13-de-ago-de-2025-00-39-12.webp",
]

export default function HomePage() {
  const testimonialsRef = useRef(null)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="md:sticky md:top-24">
              <ImageSwiper images={productImages} />
            </div>
            <div>
              <ProductDetails testimonialsRef={testimonialsRef} />
            </div>
          </div>
        </div>
        <div id="reviews" ref={testimonialsRef}>
          <TestimonialsCarousel />
        </div>
        <ProductFeatures />
        <div id="features">
          <ProductAccordionFeatures />
        </div>
        <div id="customer-reviews">
          <CustomerReviews />
        </div>
        <div id="faq">
          <FaqSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
