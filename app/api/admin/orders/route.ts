import { NextResponse } from "next/server"

export async function GET() {
  try {
    const firebaseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL

    if (!firebaseUrl) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 })
    }

    // Fetch all orders from Firebase Realtime Database
    const response = await fetch(`${firebaseUrl}/orders.json`)

    if (!response.ok) {
      throw new Error(`Firebase error: ${response.status}`)
    }

    const data = await response.json()

    // Convert Firebase object to array
    const orders = data
      ? Object.entries(data).map(([id, order]) => ({
          id,
          ...(order as any),
        }))
      : []

    return NextResponse.json({ orders })
  } catch (error: any) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders", details: error.message }, { status: 500 })
  }
}
