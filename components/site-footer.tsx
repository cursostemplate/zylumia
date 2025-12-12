"use client"

import type React from "react"

import { PolicyModal } from "@/components/policy-modal"
import { PrivacyPolicyContent } from "@/components/policies/privacy-policy"
import { ShippingPolicyContent } from "@/components/policies/shipping-policy"
import { RefundPolicyContent } from "@/components/policies/refund-policy"
import { TermsConditionsContent } from "@/components/policies/terms-conditions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import NextImage from "next/image"
import { useState } from "react"
import { subscribeEmail } from "@/lib/firebase-service"

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    const result = await subscribeEmail(email, "", "footer")

    setMessage(result.message)
    setIsSubmitting(false)

    if (result.success) {
      setEmail("")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  return (
    <footer className="bg-cream-100 border-t border-blush-200/50">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <h3 className="font-serif text-3xl font-semibold text-charcoal">Zylumia</h3>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              At Zylumia, we specialize in a single, high-performance skincare solution powered by advanced technology.
              Our expertly formulated mask is designed to nourish, hydrate, and restore confidence—helping you achieve
              luminous, healthy skin with every use.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl font-semibold text-charcoal">Quick links</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <PolicyModal triggerText="Privacy policy" title="Privacy Policy">
                  <PrivacyPolicyContent />
                </PolicyModal>
              </li>
              <li>
                <PolicyModal triggerText="Shipping & delivery policy" title="Shipping & Delivery Policy">
                  <ShippingPolicyContent />
                </PolicyModal>
              </li>
              <li>
                <PolicyModal triggerText="Refunds & Payments" title="Refunds & Payments Policy">
                  <RefundPolicyContent />
                </PolicyModal>
              </li>
              <li>
                <PolicyModal triggerText="Terms and Conditions" title="Terms and Conditions">
                  <TermsConditionsContent />
                </PolicyModal>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl font-semibold text-charcoal">Subscribe to our emails</h3>
            <p className="mt-6 text-muted-foreground">Join our email list for exclusive offers and the latest news.</p>

            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow border-blush-200 focus:border-blush-400 focus:ring-blush-300 bg-white"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-charcoal hover:bg-charcoal-light text-white tracking-wider uppercase text-sm py-6"
              >
                {isSubmitting ? "Subscribing..." : "Sign up"}
              </Button>
              {message && (
                <p
                  className={`text-sm ${message.includes("success") || message.includes("Successfully") ? "text-green-600" : "text-destructive"}`}
                >
                  {message}
                </p>
              )}
            </form>

            {/* Payment Icons */}
            <div className="mt-4">
              <NextImage
                src="/payment-icons.webp"
                alt="Secure payment methods"
                width={200}
                height={32}
                className="object-contain w-full opacity-70"
              />
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-blush-200/50 pt-8 text-center text-muted-foreground">
          <p className="text-sm tracking-wide">&copy; {new Date().getFullYear()} Zylumia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
