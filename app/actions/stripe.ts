"use server"

import { redirect } from "next/navigation"
import Stripe from "stripe"
import type { CartItem } from "@/contexts/cart-context"

export async function createCheckoutSession(cartItems: CartItem[]) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty.")
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
  })

  // Mapeia os itens do carrinho para o formato que a Stripe espera, usando o priceId
  const lineItems = cartItems.map((item) => {
    if (!item.priceId) {
      throw new Error(`Product "${item.quantity}" is missing a Stripe Price ID.`)
    }
    return {
      price: item.priceId,
      quantity: item.quantityInCart,
    }
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
  })

  if (session.url) {
    redirect(session.url)
  } else {
    throw new Error("Failed to create Stripe checkout session.")
  }
}
