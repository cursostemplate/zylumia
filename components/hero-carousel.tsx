"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "PROFESSIONAL RESULTS",
    subtitle: "EXPERIENCE THE POWER OF COLLAGEN",
    buttonText: "Shop Now",
  },
  {
    title: "RADIANT TRANSFORMATION",
    subtitle: "UNLOCK YOUR SKIN'S POTENTIAL",
    buttonText: "Try Now",
  },
  {
    title: "BIO-COLLAGEN DEEP MASK",
    subtitle: "PREMIUM KOREAN SKINCARE FORMULA",
    buttonText: "Discover",
  },
  {
    title: "LUXURY SKINCARE",
    subtitle: "VISIBLE RESULTS AFTER JUST ONE USE",
    buttonText: "Get Started",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full">
      <Card className="border-none rounded-none">
        <CardContent className="relative flex aspect-video items-center justify-center p-0 bg-gradient-to-br from-brand/20 via-brand/10 to-brand/5">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4">
            <h2 className="font-libre-baskerville text-4xl md:text-6xl font-bold uppercase tracking-widest text-brand">
              {slides[currentSlide].title}
            </h2>
            <p className="mt-2 mb-6 text-lg md:text-xl tracking-wider text-muted-foreground">
              {slides[currentSlide].subtitle}
            </p>
            <Button className="bg-brand hover:bg-brand/90 text-brand-foreground px-8 py-6 text-base font-semibold">
              {slides[currentSlide].buttonText}
            </Button>
          </div>

          {/* Indicadores de slide */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-brand" : "bg-brand/30"}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
