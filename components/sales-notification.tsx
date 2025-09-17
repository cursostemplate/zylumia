"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, User } from "lucide-react"

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
  { name: "Stephanie M.", location: "Austin, TX", product: "8 Masks" },
  { name: "Nicole T.", location: "Jacksonville, FL", product: "12 Masks" },
  { name: "Michelle K.", location: "Fort Worth, TX", product: "4 Masks" },
  { name: "Kimberly R.", location: "Columbus, OH", product: "16 Masks" },
  { name: "Lisa W.", location: "Charlotte, NC", product: "8 Masks" },
  { name: "Amy S.", location: "San Francisco, CA", product: "24 Masks" },
  { name: "Angela D.", location: "Indianapolis, IN", product: "12 Masks" },
  { name: "Brenda L.", location: "Seattle, WA", product: "4 Masks" },
  { name: "Emma C.", location: "Denver, CO", product: "16 Masks" },
  { name: "Olivia H.", location: "Washington, DC", product: "8 Masks" },
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
            className="bg-white rounded-xl shadow-2xl p-4 flex items-center gap-4 max-w-sm border border-gray-100"
          >
            {/* User Icon */}
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-gray-600" />
            </div>

            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">
                <span className="font-bold">{notification.name}</span> from {notification.location} just purchased{" "}
                <span className="font-semibold text-brand">{notification.product}</span>!
              </p>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="self-start text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
