"use client"

import { useTransition } from "react"
import { useCart } from "@/contexts/cart-context"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SalesNotification } from "@/components/sales-notification"
import { CartTestimonials } from "@/components/cart-testimonials"
import { createCheckoutSession } from "@/app/actions/stripe"
import { Loader2, X, Minus, Plus, Trash2, CheckCircle, Lock, Clock, Shield, Truck } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()
  const [isPending, startTransition] = useTransition()

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number.parseFloat(item.price.replace("£", ""))
    return acc + price * item.quantityInCart
  }, 0)

  const shipping = 0 // Frete grátis
  const total = subtotal + shipping

  const handleCheckout = () => {
    startTransition(async () => {
      await createCheckoutSession(cartItems)
    })
  }

  // Verifica se a oferta específica de "4 Masks" (ID 1) está no carrinho
  const isFourMasksOffer = cartItems.length === 1 && cartItems[0]?.id === 1
  const fourMasksPaymentLink = "https://buy.stripe.com/7sYdR39I40oj7gf8Xde3e00"

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  return (
    <>
      <Head>
        <title>Shopping Cart - Zylumia | Bio-Collagen Face Masks</title>
        <meta
          name="description"
          content="Review your Bio-Collagen face mask order. Secure checkout with free shipping worldwide. 60-day money-back guarantee."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://zylumia.com/cart" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-grow bg-gray-50">
          {cartItems.length === 0 ? (
            <div className="container mx-auto px-4 py-8">
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Your cart is empty.</p>
                <Button asChild>
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-8">
              {/* Layout Idêntico para Mobile e Desktop */}
              <div className="bg-white max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h1 className="text-lg font-semibold">Your Cart • {cartItems.length}</h1>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                      <X className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {/* Free Shipping Unlocked */}
                <div className="px-4 py-3 text-center">
                  <p className="text-sm font-medium text-gray-700 mb-2">Free shipping unlocked!</p>

                  {/* Progress Bar */}
                  <div className="relative w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="absolute top-0 left-0 h-full bg-red-600 rounded-full w-full"></div>
                    <div className="absolute -right-1 -top-1 w-4 h-4 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-2 h-2 text-white" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <span className="text-xs text-gray-500">Free Shipping</span>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="px-4 pb-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <NextImage
                        src={item.image}
                        alt={item.quantity}
                        width={60}
                        height={60}
                        className="rounded-md flex-shrink-0"
                      />

                      <div className="flex-grow min-w-0">
                        <h3 className="font-medium text-sm text-gray-900 truncate">{item.quantity}</h3>
                        <p className="text-xs text-gray-500">{item.supply}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-transparent"
                            onClick={() => handleQuantityChange(item.id, item.quantityInCart - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantityInCart}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-transparent"
                            onClick={() => handleQuantityChange(item.id, item.quantityInCart + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="text-xs text-gray-400 line-through">{item.originalPrice}</p>
                            <p className="font-bold text-sm">{item.price}</p>
                            <p className="text-xs text-red-600">(Save {item.save})</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="px-4 py-3 text-center bg-pink-50">
                  <p className="text-sm text-pink-700 font-medium">88% of customers also bought this</p>
                </div>

                {/* Trust Badges - NOVA SEÇÃO */}
                <div className="px-4 py-4 bg-gray-50 border-t border-b">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-800">Secure Checkout</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-800">30-Day Money Back Guarantee</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-800">Encrypted SSL Payment</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-800">Free Shipping (3-5 business days)</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Section */}
                <div className="p-4 bg-white border-t">
                  {/* Checkout Button - 344x50.5px */}
                  <div className="w-[344px] mx-auto">
                    {isFourMasksOffer ? (
                      <Button
                        asChild
                        className="w-full h-[50.5px] bg-black hover:bg-gray-800 text-white font-semibold text-base rounded-lg"
                      >
                        <a href={fourMasksPaymentLink} className="flex items-center justify-center">
                          Checkout • £{total.toFixed(2)}
                        </a>
                      </Button>
                    ) : (
                      <form action={handleCheckout} className="w-full">
                        <Button
                          type="submit"
                          className="w-full h-[50.5px] bg-black hover:bg-gray-800 text-white font-semibold text-base rounded-lg"
                          disabled={isPending}
                        >
                          {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            `Checkout • £${total.toFixed(2)}`
                          )}
                        </Button>
                      </form>
                    )}

                    {/* Payment Icons - 344x50.5px */}
                    <div className="w-full h-[50.5px] mt-3 flex items-center justify-center">
                      <NextImage
                        src="/payment-icons.webp"
                        alt="Secure payment methods"
                        width={344}
                        height={50.5}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Simplified Footer */}
                  <div className="text-center mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">&copy; 2025 Zylumia.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Seção de Testimonials */}
          <div className="hidden lg:block">
            <CartTestimonials />
          </div>
        </main>
        <SiteFooter />
        <SalesNotification />
      </div>
    </>
  )
}
