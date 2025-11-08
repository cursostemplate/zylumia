import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    const firebaseUrl =
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://banco-de-dados-fba27-default-rtdb.firebaseio.com"

    const dataToSave = {
      ...orderData,
      createdAt: new Date().toISOString(),
      timestamp: Date.now(),
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

    const userData = {
      email: orderData.email,
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      phone: orderData.phone,
      country: orderData.country,
      timestamp: dataToSave.timestamp,
      lastUpdated: Date.now(),
    }

    // Check if user already exists
    const usersCheckResponse = await fetch(`${firebaseUrl}/users.json?orderBy="email"&equalTo="${orderData.email}"`)
    const existingUsers = await usersCheckResponse.json()

    if (existingUsers && Object.keys(existingUsers).length > 0) {
      // Update existing user
      const userId = Object.keys(existingUsers)[0]
      await fetch(`${firebaseUrl}/users/${userId}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, timestamp: existingUsers[userId].timestamp }),
      })
    } else {
      // Create new user
      await fetch(`${firebaseUrl}/users.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
    }

    return NextResponse.json({ success: true, orderId: orderResult.name })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
