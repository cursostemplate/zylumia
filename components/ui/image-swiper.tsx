'use client'
import * as React from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ImageSwiperProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[]
}

export function ImageSwiper({ images, className, ...props }: ImageSwiperProps) {
  const [imgIndex, setImgIndex] = React.useState(0)
  const dragX = useMotionValue(0)

  const onDragEnd = () => {
    const x = dragX.get()
    if (x <= -10 && imgIndex < images.length - 1) {
      setImgIndex((prev) => prev + 1)
    } else if (x >= 10 && imgIndex > 0) {
      setImgIndex((prev) => prev - 1)
    }
  }

  return (
    <div
      className={cn(
        'group relative aspect-square h-full w-full overflow-hidden rounded-lg',
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 z-10">
        {imgIndex > 0 && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 md:left-5">
            <Button
              variant="ghost"
              size="icon"
              className="pointer-events-auto h-8 w-8 rounded-full bg-white/80 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => setImgIndex((prev) => prev - 1)}
            >
              <ChevronLeft className="h-4 w-4 text-neutral-600" />
            </Button>
          </div>
        )}

        {imgIndex < images.length - 1 && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 md:right-5">
            <Button
              variant="ghost"
              size="icon"
              className="pointer-events-auto h-8 w-8 rounded-full bg-white/80 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => setImgIndex((prev) => prev + 1)}
            >
              <ChevronRight className="h-4 w-4 text-neutral-600" />
            </Button>
          </div>
        )}
        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIndex(i)}
              className={cn(
                "h-2 w-2 rounded-full bg-white/50 transition-all pointer-events-auto",
                i === imgIndex ? "w-4 bg-white" : "hover:bg-white/75"
              )}
            />
          ))}
        </div>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0
        }}
        dragMomentum={false}
        style={{
          x: dragX
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`
        }}
        onDragEnd={onDragEnd}
        transition={{ damping: 18, stiffness: 90, type: 'spring', duration: 0.2 }}
        className=" flex h-full cursor-grab items-center rounded-[inherit] active:cursor-grabbing">
        {images.map((src, i) => {
          return (
            <motion.div
              key={i}
              className="h-full w-full shrink-0 overflow-hidden bg-neutral-100 object-cover first:rounded-l-[inherit] last:rounded-r-[inherit]">
              <img src={src || "/placeholder.svg"} alt={`Product image ${i+1}`} className="pointer-events-none h-full w-full object-cover" />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
