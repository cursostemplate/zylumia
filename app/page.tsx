import SiteHeader from '@/components/site-header'
import { FaqSection } from '@/components/faq-section'
import { SiteFooter } from '@/components/site-footer'
import { ImageSwiper } from '@/components/ui/image-swiper'
import { ProductDetails } from '@/components/product-details'
import { TestimonialsCarousel } from '@/components/testimonials-carousel'
import { CustomerReviews } from '@/components/customer-reviews'

const productImages = [
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screenshot-20250806171418-0rNvoVp8bOsL3utXlRnIPTwTjepJoO.png',
  'https://ui.lukacho.com/_next/static/media/2.6a8dd51d.webp',
  'https://ui.lukacho.com/_next/static/media/3.d95288b3.webp',
  'https://ui.lukacho.com/_next/static/media/4.0de1e023.webp'
]

export default function HomePage() {
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
                    <ProductDetails />
                </div>
            </div>
        </div>
        <TestimonialsCarousel />
        <CustomerReviews />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  )
}
