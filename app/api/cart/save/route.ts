import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, cartItems, shippingProtection } = body

    console.log("[v0] Saving cart to Firebase:", { userId, itemCount: cartItems?.length })

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const databaseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://banco-de-dados-fba27.firebaseio.com"
    const sanitizedUserId = userId.replace(/[.#$[\]]/g, "_")

    const response = await fetch(`${databaseUrl}/carts/${sanitizedUserId}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems || [],
        shippingProtection: shippingProtection || false,
        updatedAt: Date.now(),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Firebase cart save error:", errorText)
      return NextResponse.json({ success: false, error: "Failed to save cart to Firebase" }, { status: 500 })
    }

    console.log("[v0] Cart saved successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error saving cart:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
