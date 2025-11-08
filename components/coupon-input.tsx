"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { validateCoupon } from "@/lib/firebase-service"
import { useAuth } from "@/contexts/auth-context"

interface CouponInputProps {
  onCouponApplied: (discount: number, code: string) => void
}

export function CouponInput({ onCouponApplied }: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [message, setMessage] = useState("")
  const [isApplied, setIsApplied] = useState(false)
  const { user } = useAuth()

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setMessage("Please enter a coupon code")
      return
    }

    setIsValidating(true)
    setMessage("")

    const result = await validateCoupon(couponCode, user?.email)

    if (result.success) {
      onCouponApplied(result.discount, couponCode.toUpperCase())
      setIsApplied(true)
      setMessage(`Coupon applied! ${result.discount}% discount`)
    } else {
      setMessage(result.message)
    }

    setIsValidating(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          disabled={isApplied}
          className="flex-grow"
        />
        <Button onClick={handleApplyCoupon} disabled={isValidating || isApplied} variant="outline">
          {isValidating ? "Validating..." : isApplied ? "Applied" : "Apply"}
        </Button>
      </div>
      {message && (
        <p
          className={`text-sm ${message.includes("applied") || message.includes("success") ? "text-green-600" : "text-destructive"}`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
