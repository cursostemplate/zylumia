import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId } = body

    console.log("[v0] Loading cart from Firebase for user:", userId)

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const databaseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://banco-de-dados-fba27.firebaseio.com"
    const sanitizedUserId = userId.replace(/[.#$[\]]/g, "_")

    const response = await fetch(`${databaseUrl}/carts/${sanitizedUserId}.json`)

    if (!response.ok) {
      console.error("[v0] Firebase cart load error:", response.status)
      return NextResponse.json({ success: true, cart: null })
    }

    const cartData = await response.json()
    console.log("[v0] Cart loaded successfully:", cartData ? "Found" : "Empty")

    return NextResponse.json({
      success: true,
      cart: cartData,
    })
  } catch (error) {
    console.error("[v0] Error loading cart:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
