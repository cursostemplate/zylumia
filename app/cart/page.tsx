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
import { Loader2, Shield, Truck, RotateCcw, Lock, CheckCircle, X, Minus, Plus, Trash2 } from "lucide-react"
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
            <>
              {/* Mobile Cart Layout */}
              <div className="lg:hidden">
                <div className="bg-white">
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
                  </div>
                </div>
              </div>

              {/* Desktop Cart Layout */}
              <div className="hidden lg:block">
                <div className="container mx-auto px-4 py-8">
                  <h1 className="text-3xl font-bold font-lora mb-8">Your Cart</h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 border p-4 rounded-lg bg-white shadow-sm">
                          <NextImage
                            src={item.image}
                            alt={item.quantity}
                            width={80}
                            height={80}
                            className="rounded-md"
                          />
                          <div className="flex-grow">
                            <h2 className="font-bold">{item.quantity}</h2>
                            <p className="text-sm text-muted-foreground">{item.supply}</p>
                            <p className="font-bold text-lg">{item.price}</p>

                            {/* Badges de Garantia */}
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center gap-1 text-xs text-black bg-gray-100 px-2 py-1 rounded-full">
                                <CheckCircle className="h-3 w-3" />
                                <span>60-Day Guarantee</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-black bg-gray-100 px-2 py-1 rounded-full">
                                <Truck className="h-3 w-3" />
                                <span>Free Shipping</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Seção de Garantias e Segurança */}
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Shield className="h-5 w-5 text-black" />
                          Your Purchase is Protected
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <RotateCcw className="h-5 w-5 text-black" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">60-Day Money Back</p>
                              <p className="text-xs text-muted-foreground">100% Satisfaction Guarantee</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <Truck className="h-5 w-5 text-black" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">Free Worldwide Shipping</p>
                              <p className="text-xs text-muted-foreground">3-5 Business Days Delivery</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <Shield className="h-5 w-5 text-black" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">Quality Guaranteed</p>
                              <p className="text-xs text-muted-foreground">Premium Korean Formula</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <div className="border p-4 rounded-lg space-y-4 bg-white shadow-sm">
                        <h2 className="text-xl font-bold">Order Summary</h2>
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>£{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <Truck className="h-4 w-4 text-black" />
                            Shipping
                          </span>
                          <span className="font-semibold text-black">FREE</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-4">
                          <span>Total</span>
                          <span>£{total.toFixed(2)}</span>
                        </div>

                        {/* SSL Security Information */}
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Lock className="h-4 w-4 text-black" />
                            <span className="font-bold text-sm text-black">SSL SECURE PAYMENT</span>
                          </div>
                          <p className="text-xs text-black">
                            Your Personal Details Are Securely Encrypted With 256-Bit-SSL
                          </p>
                        </div>

                        {isFourMasksOffer ? (
                          <Button asChild className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white border-0">
                            <a href={fourMasksPaymentLink} className="flex items-center justify-center gap-2">
                              <Lock className="h-4 w-4 text-white" />
                              Secure Checkout
                            </a>
                          </Button>
                        ) : (
                          <form action={handleCheckout} className="w-full">
                            <Button
                              type="submit"
                              className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white border-0 flex items-center justify-center gap-2"
                              disabled={isPending}
                            >
                              {isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <Lock className="h-4 w-4 text-white" />
                                  Secure Checkout
                                </>
                              )}
                            </Button>
                          </form>
                        )}

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                          <div className="text-center">
                            <div className="bg-gray-100 p-2 rounded-full w-fit mx-auto mb-1">
                              <Shield className="h-4 w-4 text-black" />
                            </div>
                            <p className="text-xs font-semibold text-black">Secure Payment</p>
                          </div>
                          <div className="text-center">
                            <div className="bg-gray-100 p-2 rounded-full w-fit mx-auto mb-1">
                              <RotateCcw className="h-4 w-4 text-black" />
                            </div>
                            <p className="text-xs font-semibold text-black">Money Back</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Seção de Testimonials - apenas no desktop */}
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
