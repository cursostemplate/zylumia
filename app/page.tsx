'use client'

import { useRef } from 'react'
import SiteHeader from '@/components/site-header'
import { FaqSection } from '@/components/faq-section'
import { SiteFooter } from '@/components/site-footer'
import { ImageSwiper } from '@/components/ui/image-swiper'
import { ProductDetails } from '@/components/product-details'
import { TestimonialsCarousel } from '@/components/testimonials-carousel'
import { CustomerReviews } from '@/components/customer-reviews'
import { ProductAccordionFeatures } from '@/components/product-accordion-features'

const productImages = [
  'https://i.postimg.cc/8PdPm2Bq/screenshot-20250713232114.jpg',
  'https://i.postimg.cc/qMVPyFkK/screenshot-20250807170341.jpg',
  'https://i.postimg.cc/QNTLBDrs/screenshot-20250807170346.jpg',
  'https://i.postimg.cc/BbDRRTCt/screenshot-20250807170513.jpg'
]

export default function HomePage() {
  const testimonialsRef = useRef(null);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 md:py-12">
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
