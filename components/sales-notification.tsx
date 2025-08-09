"use client"

import { useState, useEffect } from "react"
import NextImage from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

const salesData = [
  { name: "Jessica L.", location: "New York, NY", product: "4 Masks" },
  { name: "Emily R.", location: "Los Angeles, CA", product: "12 Masks" },
  { name: "Sarah P.", location: "Chicago, IL", product: "8 Masks" },
  { name: "Ashley M.", location: "Houston, TX", product: "16 Masks" },
  { name: "Amanda B.", location: "Phoenix, AZ", product: "4 Masks" },
  { name: "Jennifer S.", location: "Philadelphia, PA", product: "24 Masks" },
  { name: "Megan W.", location: "San Antonio, TX", product: "12 Masks" },
  { name: "Lauren K.", location: "San Diego, CA", product: "8 Masks" },
  { name: "Rachel G.", location: "Dallas, TX", product: "4 Masks" },
  { name: "Heather O.", location: "San Jose, CA", product: "16 Masks" },
]

const productImageUrl = "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp"

export function SalesNotification() {
  const [notification, setNotification] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const showRandomNotification = () => {
      const randomIndex = Math.floor(Math.random() * salesData.length)
      setNotification(salesData[randomIndex])
      setIsVisible(true)

      setTimeout(() => {
        setIsVisible(false)
      }, 5000) // Hide after 5 seconds
    }

    const interval = setInterval(() => {
      showRandomNotification()
    }, 8000) // Show a new notification every 8 seconds

    // Show the first notification after a short delay
    const initialTimeout = setTimeout(showRandomNotification, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(initialTimeout)
    }
  }, [])

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {isVisible && notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ ease: "easeInOut" }}
            className="bg-white rounded-lg shadow-2xl p-4 flex items-center gap-4 max-w-sm border"
          >
            <NextImage src={productImageUrl} alt="Product Image" width={60} height={60} className="rounded-md" />
            <div className="flex-grow">
              <p className="font-bold text-sm">{notification.name}</p>
              <p className="text-xs text-muted-foreground">{notification.location}</p>
              <p className="text-sm mt-1">
                Just purchased <span className="font-semibold">{notification.product}</span>!
              </p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="self-start text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
