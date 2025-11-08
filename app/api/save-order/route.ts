import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()
    console.log("[v0] Received order data:", JSON.stringify(orderData, null, 2))

    const firebaseUrl =
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://banco-de-dados-fba27-default-rtdb.firebaseio.com"

    const dataToSave = {
      ...orderData,
      createdAt: orderData.createdAt || new Date().toISOString(),
      timestamp: orderData.timestamp || Date.now(),
    }

    console.log("[v0] Saving to Firebase:", firebaseUrl)

    const orderResponse = await fetch(`${firebaseUrl}/orders.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    })

    if (!orderResponse.ok) {
      const responseText = await orderResponse.text()
      console.error("[v0] Firebase order save error:", responseText)
      throw new Error(`Firebase error: ${orderResponse.statusText} - ${responseText}`)
    }

    const orderResult = await orderResponse.json()
    console.log("[v0] Order saved with ID:", orderResult.name)

    if (orderData.email) {
      const userData = {
        email: orderData.email,
        firstName: orderData.firstName || "",
        lastName: orderData.lastName || "",
        phone: orderData.phone || "",
        country: orderData.country || "",
        address: orderData.address || "",
        city: orderData.city || "",
        state: orderData.state || "",
        zipCode: orderData.zipCode || "",
        apartment: orderData.apartment || "",
        trackingUpdates: orderData.trackingUpdates || false,
        timestamp: dataToSave.timestamp,
        lastUpdated: Date.now(),
      }

      // Use a sanitized email as the key (replace special chars)
      const sanitizedEmail = orderData.email.replace(/[.#$[\]]/g, "_")

      console.log("[v0] Saving/updating user with key:", sanitizedEmail)

      const userResponse = await fetch(`${firebaseUrl}/users/${sanitizedEmail}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!userResponse.ok) {
        const responseText = await userResponse.text()
        console.error("[v0] Firebase user save error:", responseText)
      } else {
        console.log("[v0] User data saved successfully")
      }
    }

    return NextResponse.json({ success: true, orderId: orderResult.name })
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
