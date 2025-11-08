"use client"

import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export function CartDrawer() {
  const { cartItems, updateQuantity, removeFromCart, isCartDrawerOpen, closeCartDrawer } = useCart()

  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds

  const [shippingProtection, setShippingProtection] = useState(false)

  useEffect(() => {
    if (!isCartDrawerOpen || cartItems.length === 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 15 * 60 // Reset to 15 minutes
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isCartDrawerOpen, cartItems.length])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number.parseFloat(item.price.replace("£", ""))
    return total + price * item.quantityInCart
  }, 0)

  const shippingProtectionCost = 5
  const total = shippingProtection ? subtotal + shippingProtectionCost : subtotal

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeCartDrawer}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full md:max-w-md bg-background z-50 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 id="cart-title" className="font-lora text-2xl font-bold">
                Shopping Cart
              </h2>
              <button
                onClick={closeCartDrawer}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {cartItems.length > 0 && (
              <div className="px-6 py-3 border-b" style={{ backgroundColor: "#8c2a42" }}>
                <p className="text-sm text-center">
                  <span className="font-semibold text-white">Estoque limitado! Carrinho reservado para </span>
                  <span className="font-mono font-bold text-white">{formatTime(timeLeft)}</span>
                </p>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="font-lora text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">Add some products to get started</p>
                  <Button onClick={closeCartDrawer} asChild>
                    <Link href="/#product-details">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-lg border bg-card">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.quantity}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-1">{item.quantity}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{item.supply}</p>
                        <p className="font-bold text-lg">{item.price}</p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantityInCart - 1))}
                            className="p-1 rounded-md border hover:bg-muted transition-colors disabled:opacity-50"
                            disabled={item.quantityInCart <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantityInCart}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantityInCart + 1)}
                            className="p-1 rounded-md border hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 h-fit rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Subtotal:</span>
                  <span className="font-bold">£{subtotal.toFixed(2)}</span>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 relative flex-shrink-0">
                          <Image
                            src="https://storage.googleapis.com/site-zylumia/shipping_protection.webp"
                            alt="Shipping protection"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-semibold text-sm">Proteção de envio</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Proteja seu pedido contra danos, perdas ou roubo durante o transporte
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">£{shippingProtectionCost.toFixed(2)}</span>
                      <button
                        onClick={() => setShippingProtection(!shippingProtection)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          shippingProtection ? "bg-[#8c2a42]" : "bg-gray-300"
                        }`}
                        aria-label="Toggle shipping protection"
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            shippingProtection ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {shippingProtection && (
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
                    <span>Total:</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                )}

                <Button className="w-full py-6 text-lg font-semibold" asChild>
                  <Link href="/cart">Proceed to Checkout</Link>
                </Button>

                <div className="flex justify-center pt-2">
                  <Image
                    src="https://zylumia.com/payment-icons.webp"
                    alt="Payment methods"
                    width={300}
                    height={40}
                    className="opacity-70"
                  />
                </div>

                <button
                  onClick={closeCartDrawer}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
