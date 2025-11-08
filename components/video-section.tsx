"use client"

import { useRef, useState } from "react"
import { Play, Pause } from "lucide-react"

const videos = [
  "https://storage.googleapis.com/site-zylumia/video%203.mp4",
  "https://storage.googleapis.com/site-zylumia/V%C3%ADdeo%20sem%20t%C3%ADtulo%20%E2%80%90%20Feito%20com%20o%20Clipchamp.mp4",
  "https://storage.googleapis.com/site-zylumia/V%C3%ADdeo%20sem%20t%C3%ADtulo%20%E2%80%90%20Feito%20com%20o%20Clipchamp%20(60).mp4",
  "https://storage.googleapis.com/site-zylumia/video%204.1.mp4",
]

function VideoPlayer({ src, index }: { src: string; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasMetadata, setHasMetadata] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="relative w-full group bg-[#f5f5f5] rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        preload="auto"
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        onLoadedMetadata={() => {
          setIsLoaded(true)
          setHasMetadata(true)
          if (videoRef.current) {
            videoRef.current.currentTime = 0.1
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full rounded-lg shadow-lg object-cover"
        style={{ aspectRatio: "130.95 / 233.38" }}
        poster={`${src}#t=0.1`}
      />

      {!hasMetadata && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f5f5f5]">
          <div className="w-12 h-12 border-4 border-[#8c2a42] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center transition-opacity"
        style={{
          opacity: isPlaying ? 0 : 1,
          pointerEvents: isPlaying ? "none" : "auto",
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          style={{ backgroundColor: "#8c2a42" }}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white fill-white" />
          ) : (
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          )}
        </div>
      </button>

      {isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: "#8c2a42" }}
        >
          <Pause className="w-4 h-4 text-white fill-white" />
        </button>
      )}

      <style jsx>{`
        video::-webkit-media-controls-play-button {
          background-color: #8c2a42;
          border-radius: 50%;
        }
        video::-webkit-media-controls-current-time-display,
        video::-webkit-media-controls-time-remaining-display {
          color: #8c2a42;
        }
        video::-webkit-media-controls-timeline {
          background-color: #e5e7eb;
          border-radius: 4px;
          height: 4px;
        }
        video::-webkit-media-controls-timeline::-webkit-slider-thumb {
          background-color: #8c2a42;
        }
        video::-moz-range-progress {
          background-color: #8c2a42;
        }
        video::-moz-range-thumb {
          background-color: #8c2a42;
        }
      `}</style>
    </div>
  )
}

export function VideoSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold font-lora tracking-tighter sm:text-4xl text-brand">Discover Our Story</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Watch our journey and connect with the authentic stories behind Zylumia
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {videos.map((videoUrl, index) => (
            <VideoPlayer key={index} src={videoUrl} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
