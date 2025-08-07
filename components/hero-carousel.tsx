'use client'

import * as React from "react"
import NextImage from "next/image" // Renomeado de Image para NextImage
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"

const slides = [
  {
    image: "/placeholder.svg?height=900&width=1600",
    title: "DRESS TO IMPRESS",
    subtitle: "LOOKS PARA AS OCASIÕES MAIS ESPECIAIS",
    buttonText: "Ver Coleção",
  },
  {
    image: "/placeholder.svg?height=900&width=1600",
    title: "ALFAIATARIA MODERNA",
    subtitle: "ELEGÂNCIA E CONFORTO PARA O DIA A DIA",
    buttonText: "Descobrir",
  },
  {
    image: "/placeholder.svg?height=900&width=1600",
    title: "NOITE DE GALA",
    subtitle: "PEÇAS EXCLUSIVAS PARA BRILHAR",
    buttonText: "Explorar",
  },
]

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <Card className="border-none rounded-none">
              <CardContent className="relative flex aspect-video items-center justify-center p-0">
                <NextImage // Usando NextImage
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  width={1600}
                  height={900}
                  className="w-full h-full object-cover"
                  priority={index === 0} // Otimiza o carregamento da primeira imagem
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                  <h2 className="font-libre-baskerville text-4xl md:text-6xl font-bold uppercase tracking-widest">
                    {slide.title}
                  </h2>
                  <p className="mt-2 mb-6 text-lg md:text-xl tracking-wider">
                    {slide.subtitle}
                  </p>
                  <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-300 px-8 py-6 text-base font-semibold">
                    {slide.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 md:left-8 h-10 w-10 text-white bg-black/20 hover:bg-black/50 border-none" />
      <CarouselNext className="absolute right-4 md:right-8 h-10 w-10 text-white bg-black/20 hover:bg-black/50 border-none" />
    </Carousel>
  )
}
