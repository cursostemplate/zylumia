"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const allReviews = [
  // Page 1
  {
    name: "Emma",
    date: "07/25/2025",
    title: "Incredible Glow-Up!",
    comment:
      "I've never used a face mask that worked this fast. Within minutes, my skin looked dewy, plump, and refreshed—like I just walked out of a spa.",
    image: "https://i.postimg.cc/R0xDk6DD/screenshot-20250807162004.webp",
  },
  {
    name: "Madison",
    date: "07/25/2025",
    title: "Better Than Expensive Facials",
    comment:
      "This mask gave me results that rival high-end facials. My pores looked smaller, my skin was noticeably softer, and the hydration lasted all day.",
    image: "https://i.postimg.cc/Gh4CxDY0/screenshot-20250807165906.webp",
  },
  {
    name: "Chloe",
    date: "07/25/2025",
    title: "Holy Grail for Dry Skin!",
    comment:
      "If you struggle with dryness like me, this is a game-changer. My skin felt instantly quenched, and I woke up with a glow I’ve never seen before.",
    image: "https://i.postimg.cc/DfjhG6Sd/screenshot-20250807165913.webp",
  },
  {
    name: "Olivia",
    date: "07/25/2025",
    title: "Instant Spa Experience at Home",
    comment:
      "This mask makes self-care feel luxurious. The texture, scent, and results make it feel like a full spa treatment. My skin was smoother and more radiant right away!",
    image: "https://i.postimg.cc/MHF886Cr/screenshot-20250807165917.webp",
  },
  {
    name: "Avery",
    date: "07/25/2025",
    title: "Visible Results After One Use",
    comment:
      "I was skeptical at first, but wow! One application and my skin looked brighter, more even, and super hydrated. It’s officially part of my weekly skincare lineup.",
    image: "https://i.postimg.cc/4ydTM7S9/screenshot-20250807165919.webp",
  },
  // Page 2
  {
    name: "Sophia",
    date: "07/24/2025",
    title: "Absolutely amazing!",
    comment:
      "My skin has never felt so soft. I'm recommending this to all my friends. A must-buy for anyone serious about skincare.",
    image: "https://i.postimg.cc/FRjV31SJ/Chat-GPT-Image-14-de-jul-de-2025-01-48-48.webp",
  },
  {
    name: "Isabella",
    date: "07/23/2025",
    title: "A true miracle worker",
    comment:
      "I saw a difference after just one use. My fine lines are less noticeable and my skin is glowing. I'm hooked!",
    image: "https://i.postimg.cc/JnJF63DT/Chat-GPT-Image-12-de-jul-de-2025-14-58-49.webp",
  },
  {
    name: "Mia",
    date: "07/22/2025",
    title: "Worth every penny",
    comment:
      "The quality of this mask is outstanding. It feels so luxurious on the skin and the results speak for themselves. Highly recommend.",
    image: "https://i.postimg.cc/13LGd9R5/Chat-GPT-Image-14-de-jul-de-2025-01-27-16.webp",
  },
  {
    name: "Amelia",
    date: "07/21/2025",
    title: "My new favorite mask",
    comment:
      "I've tried countless masks, but this one is by far the best. It's hydrating, soothing, and leaves my skin looking flawless.",
    image: "https://i.postimg.cc/Hs0jmdtk/Chat-GPT-Image-14-de-jul-de-2025-01-37-37.webp",
  },
  {
    name: "Harper",
    date: "07/20/2025",
    title: "In love with the results",
    comment:
      "This mask has transformed my skin. It's brighter, clearer, and so much smoother. I can't imagine my routine without it.",
    image: "https://i.postimg.cc/sDz06CDr/Chat-GPT-Image-14-de-jul-de-2025-01-45-52.webp",
  },
  // Page 3
  {
    name: "Evelyn",
    date: "07/19/2025",
    title: "Fantastic product!",
    comment:
      "I'm so impressed with how this mask performs. It's gentle yet effective, and my skin looks incredible after using it.",
    image: "https://i.postimg.cc/5ySpdjNM/Chat-GPT-Image-14-de-jul-de-2025-01-47-37.webp",
  },
  {
    name: "Abigail",
    date: "07/18/2025",
    title: "A skincare essential",
    comment:
      "This is a staple in my routine now. It's perfect for a quick pick-me-up or a deep treatment. My skin always thanks me for it.",
    image: "https://i.postimg.cc/zB4khhv5/Chat-GPT-Image-14-de-jul-de-2025-23-27-37-1.webp",
  },
  {
    name: "Emily",
    date: "07/17/2025",
    title: "So hydrating and refreshing",
    comment:
      "My skin feels so hydrated and refreshed after using this mask. It's like a big drink of water for my face. Love it!",
    image: "https://i.postimg.cc/KjyMFD4K/Chat-GPT-Image-14-de-jul-de-2025-23-35-05.webp",
  },
  {
    name: "Elizabeth",
    date: "07/16/2025",
    title: "The best mask I've ever tried",
    comment:
      "Seriously, this mask is a game-changer. The results are immediate and long-lasting. I'm a customer for life.",
    image: "https://i.postimg.cc/ncJPw8Vx/Chat-GPT-Image-14-de-jul-de-2025-23-46-02.webp",
  },
  {
    name: "Mila",
    date: "07/15/2025",
    title: "Five stars!",
    comment:
      "I would give this mask more than five stars if I could. It's simply the best. My skin has never looked better.",
    image: "https://i.postimg.cc/CK7hdCvB/Chat-GPT-Image-14-de-jul-de-2025-23-50-05.webp",
  },
]

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
}

const REVIEWS_PER_PAGE = 5

export function CustomerReviews() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(allReviews.length / REVIEWS_PER_PAGE)

  const displayedReviews = allReviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE)

  return (
    <section className="w-full py-12 md:py-16 bg-background">
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
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" className="w-6 h-6" />
                ))}
              </div>
              <p className="text-muted-foreground">Based on {reviewSummary.total} reviews</p>
              <div className="w-full space-y-2 mt-4">
                {reviewSummary.distribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="text-xs whitespace-nowrap">{item.stars} star</span>
                    <Progress value={(item.count / reviewSummary.total) * 100} className="w-full h-2" />
                    <span className="text-xs text-muted-foreground">{item.count}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-6 w-full bg-brand text-brand-foreground hover:bg-brand/90">
                Write a review
              </Button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            {displayedReviews.map((review, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <NextImage
                      src={review.image}
                      alt={review.name}
                      width={94}
                      height={94}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} fill="currentColor" className="w-5 h-5" />
                        ))}
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
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant="outline"
                    size="icon"
                    className={cn("h-8 w-8", currentPage === page && "bg-brand text-brand-foreground border-brand")}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
