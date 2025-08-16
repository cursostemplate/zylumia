"use client"

import { useRef } from "react"
import SiteHeader from "@/components/site-header"
import { FaqSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { CustomerReviews } from "@/components/customer-reviews"
import { ProductAccordionFeatures } from "@/components/product-accordion-features"
import { ProductFeatures } from "@/components/product-features"
import { HeroBanner } from "@/components/hero-banner"
import { ProductDetails } from "@/components/product-details"

export default function HomePage() {
  const testimonialsRef = useRef(null)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-grow">
        {/* Banner Principal com Layout Otimizado */}
        <HeroBanner />

        <div id="reviews" ref={testimonialsRef}>
          <TestimonialsCarousel />
        </div>
        <ProductFeatures />
        <div id="features">
          <ProductAccordionFeatures />
        </div>
        <div id="product-details">
          <div className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <ProductDetails testimonialsRef={testimonialsRef} />
              </div>
            </div>
          </div>
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
