"use client"

import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"

const testimonials = [
  {
    id: "esmalte",
    name: "ESMALTE SYMONE",
    quote:
      "Eu tinha medo de experimentar qualquer coisa com colágeno por causa da minha pele propensa a acne, mas este produto realmente reduziu a vermelhidade e ajudou minhas cicatrizes a curarem mais rápido.",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_00_23.png",
  },
  {
    id: "elif",
    name: "ELIF S.",
    quote:
      "Minha pele estava muito cansada por causa do trabalho. Mas após usar essa máscara algumas vezes, ela ficou mais viçosa e firme. É como um reset para o rosto!",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_36_12.png",
  },
  {
    id: "kirsten",
    name: "KIRSTEN C.",
    quote:
      "Comecei a notar linhas de sorriso e queria algo suave para amenizá-las. Esta máscara de colágeno realmente ajudou — minha pele está mais firme e elástica.",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_36_12.png",
  },
  {
    id: "vanessa",
    name: "VANESSA JOHNSON",
    quote:
      "Mal tenho tempo para cuidados com a pele, mas esta máscara de colágeno se tornou minha preferida antes de dormir. Deixa minha pele renovada e radiante — mesmo depois de noites sem dormir!",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_00_23.png",
  },
  {
    id: "mariana",
    name: "MARIANA T.",
    quote:
      "Minha pele estava seca e sem aquele brilho saudável. Após alguns usos desta máscara, notei textura mais suave, poros menores e uma tez mais brilhante.",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_36_12.png",
  },
]

export function AnimatedTestimonialsSection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) {
      return
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }
    updateSelection()
    carouselApi.on("select", updateSelection)
    return () => {
      carouselApi.off("select", updateSelection)
    }
  }, [carouselApi])

  return (
    <section className="py-16 md:py-24 bg-pink-50/30 dark:bg-brand/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold font-lora tracking-tight md:text-4xl lg:text-5xl text-brand">
              Your Glow-Up Starts Here — Just Like Theirs
            </h2>
            <p className="max-w-lg text-muted-foreground md:text-lg">
              Here's what some of them have to say about their favorite product
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev()
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto rounded-full border-brand/20 hover:bg-brand hover:text-white"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext()
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto rounded-full border-brand/20 hover:bg-brand hover:text-white"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: true,
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-4 md:ml-[max(4rem,calc(50vw-600px))] mr-4 md:mr-[max(0rem,calc(50vw-700px))]">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="max-w-[300px] md:max-w-[340px] lg:max-w-[380px] pl-4">
                <div className="group rounded-2xl overflow-hidden">
                  <div className="relative h-[450px] md:h-[500px] w-full overflow-hidden rounded-2xl">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={`Testimonial from ${testimonial.name}`}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8c2a42]/90 via-[#8c2a42]/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white">
                      {/* Stars */}
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} fill="currentColor" className="w-4 h-4" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-sm md:text-base leading-relaxed mb-4 line-clamp-4">"{testimonial.quote}"</p>

                      {/* Name */}
                      <p className="text-xs font-bold uppercase tracking-wider">– {testimonial.name}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots Navigation */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-brand" : "w-2 bg-brand/30"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <Button
            size="icon"
            variant="outline"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="rounded-full border-brand/20 hover:bg-brand hover:text-white"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            className="rounded-full border-brand/20 hover:bg-brand hover:text-white"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
