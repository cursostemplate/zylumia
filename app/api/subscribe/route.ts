import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, source } = body

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const databaseUrl = "https://banco-de-dados-fba27.firebaseio.com"

    // Check if email already exists
    const checkResponse = await fetch(`${databaseUrl}/subscribers.json`)
    if (checkResponse.ok) {
      const subscribers = await checkResponse.json()
      if (subscribers) {
        const existingEmail = Object.values(subscribers).find((sub: any) => sub.email === email)
        if (existingEmail) {
          return NextResponse.json({ success: false, message: "Email already subscribed" })
        }
      }
    }

    // Save new subscriber
    const saveResponse = await fetch(`${databaseUrl}/subscribers.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name: name || "",
        source: source || "website",
        subscribedAt: Date.now(),
        active: true,
      }),
    })

    if (!saveResponse.ok) {
      const errorData = await saveResponse.json()
      console.error("Firebase error:", errorData)
      return NextResponse.json({ success: false, message: "Failed to save subscriber" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Successfully subscribed!" })
  } catch (error: any) {
    console.error("Error in subscribe API:", error)
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 })
  }
}
