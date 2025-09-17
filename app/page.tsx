"use client"

import { useRef } from "react"
import SiteHeader from "@/components/site-header"
import { FaqSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { CustomerReviews } from "@/components/customer-reviews"
import { ProductAccordionFeatures } from "@/components/product-accordion-features"
import { ProductFeatures } from "@/components/product-features"
import { ZylumiaHero } from "@/components/zylumia-hero"
import { HeroBanner } from "@/components/hero-banner"
import { StickyOfferBar } from "@/components/sticky-offer-bar"

export default function HomePage() {
  const testimonialsRef = useRef(null)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-grow">
        {/* Hero com Vídeo - Sem efeitos visuais */}
        <ZylumiaHero />

        {/* Seção de Produtos */}
        <section id="product-details" className="scroll-mt-16">
          <h2 className="sr-only">Product Details</h2>
          <HeroBanner />
        </section>

        <section id="reviews" ref={testimonialsRef}>
          <h2 className="sr-only">Customer Reviews</h2>
          <TestimonialsCarousel />
        </section>

        <ProductFeatures />

        <section id="features">
          <h2 className="sr-only">Product Features</h2>
          <ProductAccordionFeatures />
        </section>

        <section id="customer-reviews">
          <h2 className="sr-only">Detailed Customer Reviews</h2>
          <CustomerReviews />
        </section>

        <section id="faq">
          <h2 className="sr-only">Frequently Asked Questions</h2>
          <FaqSection />
        </section>
      </main>
      <SiteFooter />

      {/* Barra Sticky que monitora as ofertas do HeroBanner */}
      <StickyOfferBar testimonialsRef={testimonialsRef} />
    </div>
  )
}
