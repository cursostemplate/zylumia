"use client"

import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"

export function CartDrawer() {
  const { cartItems, updateQuantity, removeFromCart, isCartDrawerOpen, closeCartDrawer } = useCart()

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number.parseFloat(item.price.replace("£", ""))
    return total + price * item.quantityInCart
  }, 0)

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
                            onClick={() => updateQuantity(item.id, item.quantityInCart - 1)}
                            className="p-1 rounded-md border hover:bg-muted transition-colors"
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

                <Button className="w-full py-6 text-lg font-semibold" asChild>
                  <Link href="/cart">Proceed to Checkout</Link>
                </Button>

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
