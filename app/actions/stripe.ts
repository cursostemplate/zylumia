"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
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
    if (!item.priceId || item.priceId.includes("COLE_SEU_PRICE_ID_AQUI")) {
      throw new Error(`Product "${item.quantity}" is missing a valid Stripe Price ID.`)
    }
    return {
      price: item.priceId,
      quantity: item.quantityInCart,
    }
  })

  // Solução definitiva para a criação da URL
  const headersList = headers()
  const origin = headersList.get("origin")

  if (!origin) {
    throw new Error("Could not determine the request origin.")
  }

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
