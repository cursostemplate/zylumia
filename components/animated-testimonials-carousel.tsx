"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import NextImage from "next/image"

const testimonials = [
  {
    name: "ESMALTE SYMONE",
    quote:
      "I used to avoid anything with collagen because I have acne-prone skin, but this mask completely changed my mind. It really helped reduce redness and made my breakouts heal much faster. I'm honestly impressed with the results.",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_00_23.png",
  },
  {
    name: "ELIF S.",
    quote:
      "My skin looked tired and dull from work stress. After using this mask a few times, I noticed it felt firmer, smoother, and more refreshed. It's like a full reset for my face — I feel confident without makeup again!",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_36_12.png",
  },
  {
    name: "KIRSTEN C.",
    quote:
      "I started noticing smile lines and wanted something gentle to smooth them out. This collagen mask really helped — my skin feels firmer and more elastic. It's not an overnight miracle, but with regular use, the difference is undeniable.",
    image: "https://storage.googleapis.com/site-zylumia/ChatGPT%20Image%2011%20de%20set.%20de%202025%2C%2021_36_12.png",
  },
]

type Testimonial = {
  quote: string
  name: string
  image: string
}

const AnimatedTestimonialsCarousel = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[]
  autoplay?: boolean
}) => {
  const [active, setActive] = useState(0)

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [autoplay, handleNext])

  const isActive = (index: number) => index === active

  const randomRotate = () => `${Math.floor(Math.random() * 16) - 8}deg`

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <div className="relative h-80 w-full max-w-xs">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.image}
                  initial={{ opacity: 0, scale: 0.9, y: 50, rotate: randomRotate() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.5,
                    scale: isActive(index) ? 1 : 0.9,
                    y: isActive(index) ? 0 : 20,
                    zIndex: isActive(index) ? testimonials.length : testimonials.length - Math.abs(index - active),
                    rotate: isActive(index) ? "0deg" : randomRotate(),
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: "1000px" }}
                >
                  <NextImage
                    src={testimonial.image}
                    alt={`Testimonial from ${testimonial.name}`}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover shadow-2xl"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text and Controls Section */}
        <div className="flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-brand font-lora">Bio-Collagen Mask</h3>
                <div className="flex text-yellow-400 text-2xl mt-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" className="w-6 h-6" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider font-semibold">
                  – {testimonials[active].name}
                </p>
                <motion.p className="text-lg text-muted-foreground italic">"{testimonials[active].quote}"</motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-4 pt-12">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 transition-colors hover:bg-brand/20 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              <ArrowLeft className="h-5 w-5 text-brand transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 transition-colors hover:bg-brand/20 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              <ArrowRight className="h-5 w-5 text-brand transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AnimatedTestimonialsSection() {
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
        <AnimatedTestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  )
}
