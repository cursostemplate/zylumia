'use client'

import { Star } from 'lucide-react'
import NextImage from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const reviews = [
  {
    name: "Emma",
    date: "07/25/2025",
    title: "Incredible Glow-Up!",
    comment: "I've never used a face mask that worked this fast. Within minutes, my skin looked dewy, plump, and refreshed—like I just walked out of a spa. My husband even noticed the difference!",
    image: "https://i.postimg.cc/R0xDk6DD/screenshot-20250807162004.webp",
  },
  {
    name: "Madison",
    date: "07/25/2025",
    title: "Better Than Expensive Facials",
    comment: "This mask gave me results that rival high-end facials. My pores looked smaller, my skin was noticeably softer, and the hydration lasted all day. Definitely a must-have in my skincare routine!",
    image: "https://i.postimg.cc/Gh4CxDY0/screenshot-20250807165906.webp",
  },
  {
    name: "Chloe",
    date: "07/25/2025",
    title: "Holy Grail for Dry Skin!",
    comment: "If you struggle with dryness like me, this is a game-changer. My skin felt instantly quenched, and I woke up with a glow I’ve never seen before. Can’t recommend it enough!",
    image: "https://i.postimg.cc/DfjhG6Sd/screenshot-20250807165913.webp",
  },
  {
    name: "Olivia",
    date: "07/25/2025",
    title: "Instant Spa Experience at Home",
    comment: "This mask makes self-care feel luxurious. The texture, scent, and results make it feel like a full spa treatment. My skin was smoother and more radiant right away!",
    image: "https://i.postimg.cc/MHF886Cr/screenshot-20250807165917.webp",
  },
  {
    name: "Avery",
    date: "07/25/2025",
    title: "Visible Results After One Use",
    comment: "I was skeptical at first, but wow! One application and my skin looked brighter, more even, and super hydrated. It’s officially part of my weekly skincare lineup.",
    image: "https://i.postimg.cc/4ydTM7S9/screenshot-20250807165919.webp",
  },
];

const reviewSummary = {
  average: 4.9,
  total: 1280,
  distribution: [
    { stars: 5, count: 1200 },
    { stars: 4, count: 63 },
    { stars: 3, count: 9 },
    { stars: 2, count: 5 },
    { stars: 1, count: 3 },
  ],
};

export function CustomerReviews() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold font-lora tracking-tighter sm:text-5xl">Customer Reviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center md:items-start p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{reviewSummary.average.toFixed(2)} out of 5</span>
              </div>
              <div className="flex text-yellow-400 my-2">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-6 h-6" />)}
              </div>
              <p className="text-muted-foreground">Based on {reviewSummary.total} reviews</p>
              <div className="w-full space-y-2 mt-4">
                {reviewSummary.distribution.map(item => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="text-xs whitespace-nowrap">{item.stars} star</span>
                    <Progress value={(item.count / reviewSummary.total) * 100} className="w-full h-2" />
                    <span className="text-xs text-muted-foreground">{item.count}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-6 w-full bg-brand text-brand-foreground hover:bg-brand/90">Write a review</Button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <NextImage src={review.image} alt={review.name} width={94} height={94} className="rounded-md object-cover" />
                    <div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
                      </div>
                      <p className="font-bold mt-1">{review.name}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">{review.title}</h3>
                  <p className="text-muted-foreground mt-1">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
