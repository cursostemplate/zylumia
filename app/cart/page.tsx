"use client"

import { useTransition } from "react"
import { useCart } from "@/contexts/cart-context"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SalesNotification } from "@/components/sales-notification"
import { createCheckoutSession } from "@/app/actions/stripe"
import { Loader2, Minus, Plus, Trash2 } from "lucide-react"
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

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId)
  }

  // Verifica se a oferta específica de "4 Masks" (ID 1) está no carrinho
  const isFourMasksOffer = cartItems.length === 1 && cartItems[0]?.id === 1
  const fourMasksPaymentLink = "https://buy.stripe.com/7sYdR39I40oj7gf8Xde3e00"

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

        {/* Open Graph */}
        <meta property="og:title" content="Shopping Cart - Zylumia" />
        <meta
          property="og:description"
          content="Review your Bio-Collagen face mask order. Secure checkout with free shipping."
        />
        <meta property="og:url" content="https://zylumia.com/cart" />
        <meta property="og:type" content="website" />

        {/* Structured Data for Shopping Cart */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Shopping Cart",
              description: "Review your Bio-Collagen face mask order",
              url: "https://zylumia.com/cart",
              isPartOf: {
                "@type": "WebSite",
                name: "Zylumia",
                url: "https://zylumia.com",
              },
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://zylumia.com/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Shopping Cart",
                    item: "https://zylumia.com/cart",
                  },
                ],
              },
            }),
          }}
        />
      </Head>

      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold font-lora mb-8">Your Cart</h1>
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Your cart is empty.</p>
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border p-4 rounded-lg">
                    <NextImage src={item.image} alt={item.quantity} width={80} height={80} className="rounded-md" />
                    <div className="flex-grow">
                      <h2 className="font-bold">{item.quantity}</h2>
                      <p className="text-sm text-muted-foreground">{item.supply}</p>
                      <p className="font-bold text-lg">{item.price}</p>
                    </div>

                    {/* Controles de Quantidade */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => handleQuantityChange(item.id, item.quantityInCart - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantityInCart}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => handleQuantityChange(item.id, item.quantityInCart + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Botão de Remover */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="md:col-span-1">
                <div className="border p-4 rounded-lg space-y-4">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-4">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>

                  {isFourMasksOffer ? (
                    <Button asChild className="w-full bg-brand hover:bg-brand/90 text-brand-foreground">
                      <a href={fourMasksPaymentLink}>Proceed to Checkout</a>
                    </Button>
                  ) : (
                    <form action={handleCheckout} className="w-full">
                      <Button
                        type="submit"
                        className="w-full bg-brand hover:bg-brand/90 text-brand-foreground"
                        disabled={isPending}
                      >
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Proceed to Checkout"}
                      </Button>
                    </form>
                  )}

                  <div className="flex justify-center pt-2">
                    <NextImage
                      src="https://i.postimg.cc/rsXXQ6fr/Chat-GPT-Image-11-de-ago-de-2025-00-22-50.webp"
                      alt="Secure payment methods"
                      width={250}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        <SiteFooter />
        <SalesNotification />
      </div>
    </>
  )
}
