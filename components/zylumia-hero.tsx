"use client"

import { Hero } from "@/components/ui/hero"
import { Star, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ZylumiaHero() {
  return (
    <Hero
      videoUrl="https://storage.googleapis.com/videemio-89i/3d9c2a330e694bfebe832d4fb41f598f.mp4"
      title={
        <motion.span
          className="font-lora"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 5, times: [0, 0.8, 1] }}
        >
          Transform Your Skin with{" "}
          <span className="bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">ZYLUMIA</span>
        </motion.span>
      }
      subtitle={
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 5, times: [0, 0.8, 1] }}
        >
          Experience the power of Korean Bio-Collagen technology.
          <br className="hidden sm:block" />
          Visible results after just one use. Trusted by 5,000+ customers worldwide.
          <br className="hidden md:block" />
          <span className="inline-flex items-center gap-2 mt-2 text-yellow-300">
            <div className="flex" role="img" aria-label="5 star rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              ))}
            </div>
            <span className="font-semibold">4.6/5 from 5,000+ reviews</span>
          </span>
        </motion.span>
      }
      actions={[
        {
          label: "Shop Now",
          href: "#product-details",
          variant: "default",
        },
        {
          label: "Learn More",
          href: "#features",
          variant: "outline",
        },
      ]}
      titleClassName="font-lora font-extrabold"
      subtitleClassName="font-medium"
      actionsClassName="mt-6 sm:mt-8 md:mt-10"
      gradient={false}
      blur={false}
    >
      {/* Instagram Link */}
      <div className="absolute bottom-4 right-4 z-20">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full"
        >
          <a
            href="https://www.instagram.com/zylumiaa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
        </Button>
      </div>
    </Hero>
  )
}
