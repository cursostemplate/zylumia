"use client"

import { Testimonial } from "@/components/ui/testimonial-card"
import { Star } from "lucide-react"

const cartTestimonials = [
  {
    name: "Jessica L.",
    role: "Marketing Manager",
    company: "New York",
    rating: 5,
    image: "https://i.postimg.cc/KvQybN2g/screenshot-20250807171508.webp",
    testimonial:
      "I was skeptical about collagen masks, but this one completely changed my mind! My skin feels firmer and looks more radiant. The results were visible after just one use!",
  },
  {
    name: "Emily R.",
    role: "Teacher",
    company: "Los Angeles",
    rating: 5,
    image: "https://i.postimg.cc/VvDZxKCf/screenshot-20250807171513.webp",
    testimonial:
      "This mask is incredible! My skin looked tired from work stress, but after using it, I feel confident without makeup again. It's like a reset button for my face.",
  },
  {
    name: "Sarah P.",
    role: "Nurse",
    company: "Chicago",
    rating: 5,
    image: "https://i.postimg.cc/nLBRFFDw/screenshot-20250807171515.webp",
    testimonial:
      "I've tried many skincare products, but nothing compares to this collagen mask. My fine lines are less noticeable and my skin feels so much smoother!",
  },
  {
    name: "Ashley M.",
    role: "Designer",
    company: "Houston",
    rating: 5,
    image: "https://i.postimg.cc/d3t4jGSz/screenshot-20250807171517.webp",
    testimonial:
      "Amazing results! I barely have time for skincare, but this mask works while I sleep. I wake up with glowing, refreshed skin every time I use it.",
  },
  {
    name: "Amanda B.",
    role: "Entrepreneur",
    company: "Phoenix",
    rating: 5,
    image: "https://i.postimg.cc/9QQjJFM9/screenshot-20250807200913.webp",
    testimonial:
      "My skin felt dry and lacked that healthy glow. After using this mask, I noticed smoother texture and brighter complexion. It's now a must-have in my routine!",
  },
  {
    name: "Jennifer S.",
    role: "Consultant",
    company: "Philadelphia",
    rating: 5,
    image: "https://i.postimg.cc/R0xDk6DD/screenshot-20250807162004.webp",
    testimonial:
      "This mask gave me results that rival expensive facials! My pores look smaller, my skin is softer, and the hydration lasts all day. Absolutely love it!",
  },
]

export function CartTestimonials() {
  return (
    <section className="py-12 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-lora text-brand mb-2">Join Thousands of Happy Customers</h2>
          <p className="text-muted-foreground">
            See what our customers are saying about their Bio-Collagen Mask experience
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {cartTestimonials.map((testimonial) => (
            <Testimonial key={testimonial.name} {...testimonial} />
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-semibold">4.6/5 from 5,000+ verified customers</span>
          </div>
        </div>
      </div>
    </section>
  )
}
