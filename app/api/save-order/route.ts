import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    const firebaseUrl = "https://banco-de-dados-fba27.firebaseio.com"

    const dataToSave = {
      ...orderData,
      addedToCart: true, // Flag indicando que produto foi adicionado
      purchaseCompleted: true, // Flag indicando compra finalizada
      createdAt: orderData.createdAt || new Date().toISOString(),
      timestamp: orderData.timestamp || Date.now(),
    }

    const orderResponse = await fetch(`${firebaseUrl}/orders.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    })

    if (!orderResponse.ok) {
      const responseText = await orderResponse.text()
      throw new Error(`Firebase error: ${orderResponse.statusText} - ${responseText}`)
    }

    const orderResult = await orderResponse.json()

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

      const sanitizedEmail = orderData.email.replace(/[.#$[\]]/g, "_")

      await fetch(`${firebaseUrl}/users/${sanitizedEmail}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
    }

    await fetch(`${firebaseUrl}/tracking.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType: "purchase_completed",
        orderId: orderResult.name,
        email: orderData.email,
        total: orderData.total,
        timestamp: Date.now(),
      }),
    })

    return NextResponse.json({ success: true, orderId: orderResult.name })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
