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
import { StickyOfferBar } from "@/components/sticky-offer-bar"

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
        <div id="customer-reviews">
          <CustomerReviews />
        </div>
        <div id="faq">
          <FaqSection />
        </div>
      </main>
      <SiteFooter />

      {/* Barra Sticky que monitora as ofertas do HeroBanner */}
      <StickyOfferBar testimonialsRef={testimonialsRef} />
    </div>
  )
}
