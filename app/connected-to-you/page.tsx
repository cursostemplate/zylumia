"use client"

import { useState } from "react"
import SiteHeader from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Instagram, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {
  Stories,
  StoriesContent,
  Story,
  StoryVideo,
  StoryOverlay,
  StoryAuthor,
  StoryAuthorImage,
  StoryAuthorName,
} from "@/components/ui/stories-carousel"

const essenceVideos = [
  {
    id: 1,
    title: "Our Essence - Video 1",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-09-11T21_28_22.681Z_Pippit_202509111828.mp4",
    author: "Zylumia Team",
    fallback: "ZT",
  },
  {
    id: 2,
    title: "Our Essence - Video 2",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-09-11T21_05_36.573Z_Pippit_202509111805.mp4",
    author: "Zylumia Team",
    fallback: "ZT",
  },
  {
    id: 3,
    title: "Our Essence - Video 3",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-08-06T04_35_28.536Z_Pippit_202508060135.mp4",
    author: "Zylumia Team",
    fallback: "ZT",
  },
  // Repetindo os 3 vídeos mais duas vezes como solicitado
  {
    id: 4,
    title: "Our Essence - Video 1 (Repeat)",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-09-11T21_28_22.681Z_Pippit_202509111828.mp4",
    author: "Zylumia Team",
    fallback: "ZT",
  },
  {
    id: 5,
    title: "Our Essence - Video 2 (Repeat)",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-09-11T21_05_36.573Z_Pippit_202509111805.mp4",
    author: "Zylumia Team",
    fallback: "ZT",
  },
  {
    id: 6,
    title: "Our Essence - Video 3 (Repeat)",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-08-06T04_35_28.536Z_Pippit_202508060135.mp4",
    author: "Zylumia Team",
    fallback: "ZT",
  },
  {
    id: 7,
    title: "Our Essence - Video 1 (Final)",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-09-11T21_28_22.681Z_Pippit_202509111828.mp4",
    author: "Zylumia Team",
    fallback: "ZT",
  },
  {
    id: 8,
    title: "Our Essence - Video 2 (Final)",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-09-11T21_05_36.573Z_Pippit_202509111805.mp4",
    author: "Zylumia Team",
    fallback: "ZT",
  },
  {
    id: 9,
    title: "Our Essence - Video 3 (Final)",
    url: "https://storage.googleapis.com/site-zylumia/ai_talking_photo_2025-08-06T04_35_28.536Z_Pippit_202508060135.mp4",
    author: "Zylumia Team",
    fallback: "ZT",
  },
]

export default function ConnectedToYouPage() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const openVideoModal = (video: any) => {
    setSelectedVideo(video)
    setIsVideoModalOpen(true)
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
    setSelectedVideo(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-grow bg-white">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-lora text-brand mb-6">Connected to You</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Reinforcing proximity and human connection through authentic skincare
              </p>

              {/* Instagram Link */}
              <div className="flex justify-center mb-12">
                <Button
                  asChild
                  variant="outline"
                  className="border-brand text-brand hover:bg-brand hover:text-white bg-transparent"
                >
                  <a
                    href="https://www.instagram.com/zylumiaa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="h-5 w-5" />
                    Follow us on Instagram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Essência Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold font-lora text-brand text-center mb-8">Nossa Essência</h2>

              <div className="prose prose-lg max-w-none text-gray-700 mb-12">
                <p className="text-xl leading-relaxed text-center mb-12">
                  At the heart of Zylumia lies our essence: the unwavering belief that every woman deserves to feel
                  radiant and confident in her own skin. Our essence is built on three fundamental pillars that guide
                  everything we do.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  <div className="bg-white p-8 rounded-lg shadow-lg border border-pink-100">
                    <h3 className="text-2xl font-bold text-brand mb-4">Science & Innovation</h3>
                    <p className="text-lg leading-relaxed">
                      We combine cutting-edge research with time-tested ingredients to create formulations that deliver
                      real, visible results. Every product is backed by scientific evidence and rigorous testing.
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-lg border border-pink-100">
                    <h3 className="text-2xl font-bold text-brand mb-4">Authenticity & Trust</h3>
                    <p className="text-lg leading-relaxed">
                      We believe in transparency, honest communication, and products that live up to their promises
                      without compromise. Our commitment to authenticity builds lasting trust with our community.
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-lg border border-pink-100">
                    <h3 className="text-2xl font-bold text-brand mb-4">Empowerment & Confidence</h3>
                    <p className="text-lg leading-relaxed">
                      Our mission goes beyond skincare – we're here to help women rediscover their confidence and
                      embrace their natural beauty at every stage of life.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stories Carousel */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-brand mb-4">Discover Our Story</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Watch our journey and connect with the authentic stories behind Zylumia
                </p>
              </div>

              <div className="mb-12">
                <Stories>
                  <StoriesContent>
                    {essenceVideos.map((video) => (
                      <Story key={video.id} className="aspect-[3/4] w-[200px]" onClick={() => openVideoModal(video)}>
                        <StoryVideo src={video.url} />
                        <StoryOverlay />
                        <StoryAuthor>
                          <StoryAuthorImage fallback={video.fallback} name={video.author} />
                          <StoryAuthorName>{video.author}</StoryAuthorName>
                        </StoryAuthor>
                      </Story>
                    ))}
                  </StoriesContent>
                </Stories>
              </div>

              {/* Connection Message */}
              <div className="bg-brand/5 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-brand mb-4">We're Connected to You</h3>
                <p className="text-lg leading-relaxed">
                  Every product we create, every story we share, and every moment we spend perfecting our formulas is
                  driven by our connection to you. We understand your skincare journey because we've been on it too.
                  Together, we're building a community of confident, radiant women who support each other's beauty
                  journey.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <video src={selectedVideo.url} controls autoPlay className="w-full h-full rounded-lg" />

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={closeVideoModal}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Back Button */}
              <Button
                variant="ghost"
                className="absolute -top-12 left-0 text-white hover:bg-white/20"
                onClick={closeVideoModal}
              >
                ← Back
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  )
}
