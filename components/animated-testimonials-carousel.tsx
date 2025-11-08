"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "ESMALTE SYMONE",
    quote:
      "Eu tinha medo de experimentar qualquer coisa com colágeno por causa da minha pele propensa a acne, mas este produto realmente reduziu a vermelhidade e ajudou minhas cicatrizarem mais rápido.",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_00_23.png",
  },
  {
    name: "ELIF S.",
    quote:
      "Minha pele estava muito cansada por causa do trabalho. Mas após usar essa máscara algumas vezes, ela ficou mais viçosa e firme. É como um reset para o rosto!",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_36_12.png",
  },
  {
    name: "KIRSTEN C.",
    quote:
      "Comecei a notar linhas de sorriso e queria algo suave para amenizá-las. Esta máscara de colágeno realmente ajudou — minha pele está mais firme e elástica.",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_36_12.png",
  },
  {
    name: "VANESSA JOHNSON",
    quote:
      "Mal tenho tempo para cuidados com a pele, mas esta máscara de colágeno se tornou minha preferida antes de dormir. Deixa minha pele renovada e radiante — mesmo depois de noites sem dormir!",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_00_23.png",
  },
  {
    name: "MARIANA T.",
    quote:
      "Minha pele estava seca e sem aquele brilho saudável. Após alguns usos desta máscara, notei textura mais suave, poros menores e uma tez mais brilhante.",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_36_12.png",
  },
]

export function AnimatedTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="w-full py-12 md:py-16 bg-pink-50/30 dark:bg-brand/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold font-lora tracking-tighter sm:text-4xl text-brand">
              Your Glow-Up Starts Here — Just Like Theirs
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here's what some of them have to say about their favorite product
            </p>
          </div>
        </div>

        <div className="relative max-w-md mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="flex-shrink-0 w-full flex flex-col items-center text-center px-4">
                  <div className="w-full max-w-[280px] mb-4 mx-auto">
                    <NextImage
                      src={testimonial.image}
                      alt={`Testimonial from ${testimonial.name}`}
                      width={280}
                      height={497}
                      className="w-full h-auto rounded-2xl object-cover shadow-lg"
                      style={{ aspectRatio: "130.95/233.38" }}
                    />
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" className="w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4 max-w-[280px]">"{testimonial.quote}"</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground">– {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-lg"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-6 w-6 text-brand" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-lg"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6 text-brand" />
          </Button>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "w-8 bg-brand" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
