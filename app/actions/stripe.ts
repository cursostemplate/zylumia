"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers" // Importar a função 'headers'
import Stripe from "stripe"
import type { CartItem } from "@/contexts/cart-context"

export async function createCheckoutSession(cartItems: CartItem[]) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty.")
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
  })

  const lineItems = cartItems.map((item) => {
    if (!item.priceId) {
      throw new Error(`Product "${item.quantity}" is missing a Stripe Price ID.`)
    }
    return {
      price: item.priceId,
      quantity: item.quantityInCart,
    }
  })

  // Constrói a URL de origem dinamicamente a partir dos cabeçalhos da requisição
  const headersList = headers()
  const host = headersList.get("host")
  const protocol = headersList.get("x-forwarded-proto") || "http"
  const origin = `${protocol}://${host}`

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/payment/cancel`,
  })

  if (session.url) {
    redirect(session.url)
  } else {
    throw new Error("Failed to create Stripe checkout session.")
  }
}
