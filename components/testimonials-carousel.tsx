'use client'

import * as React from "react"
import NextImage from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    name: "ESMALTE SYMONE",
    quote: "“I used to avoid anything with collagen because I have acne-prone skin, but this mask completely changed my mind. It really helped reduce redness and made my breakouts heal much faster. I’m honestly impressed with the results.”",
    image: "https://i.postimg.cc/KvQybN2g/screenshot-20250807171508.webp",
  },
  {
    name: "ELIF S.",
    quote: "“My skin looked tired and dull from work stress. After using this mask a few times, I noticed it felt firmer, smoother, and more refreshed. It’s like a full reset for my face — I feel confident without makeup again!”",
    image: "https://i.postimg.cc/VvDZxKCf/screenshot-20250807171513.webp",
  },
  {
    name: "KIRSTEN C.",
    quote: "“I started noticing smile lines and wanted something gentle to smooth them out. This collagen mask really helped — my skin feels firmer and more elastic. It’s not an overnight miracle, but with regular use, the difference is undeniable.”",
    image: "https://i.postimg.cc/nLBRFFDw/screenshot-20250807171515.webp",
  },
  {
    name: "VANESSA JOHNSON",
    quote: "“I barely have time for skincare, but this collagen mask became my go-to before bed. It leaves my skin looking refreshed and radiant — even after sleepless nights. I honestly look more awake than I feel!”",
    image: "https://i.postimg.cc/d3t4jGSz/screenshot-20250807171517.webp",
  },
  {
    name: "MARIANA T.",
    quote: "“My skin felt dry and lacked that healthy glow. After a few uses of this mask, I noticed smoother texture, tighter pores, and an overall brighter complexion. It quickly became a must-have in my routine.”",
    image: "https://i.postimg.cc/9QQjJFM9/screenshot-20250807200913.webp",
  },
]

export function TestimonialsCarousel() {
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold font-lora tracking-tighter sm:text-4xl text-brand">
              Your Glow-Up Starts Here — Just Like Theirs
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here's what some of them have to say about their favorite product
            </p>
          </div>
        </div>
        <div className="py-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <Card className="pt-6">
                      <CardContent className="flex flex-col items-center text-center gap-4">
                        <NextImage
                          src={testimonial.image}
                          alt={`Testimonial from ${testimonial.name}`}
                          width={190}
                          height={190}
                          className="rounded-lg object-cover w-[190px] h-[190px]"
                        />
                        <div className="text-yellow-400 text-2xl">
                          {'★★★★★'}
                        </div>
                        <p className="text-base text-muted-foreground italic">
                          {testimonial.quote}
                        </p>
                        <p className="font-semibold uppercase tracking-wider">
                          – {testimonial.name}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
