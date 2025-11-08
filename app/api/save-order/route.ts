import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    const firebaseUrl = "https://banco-de-dados-fba27-default-rtdb.firebaseio.com/orders.json"

    const dataToSave = {
      ...orderData,
      createdAt: new Date().toISOString(),
      timestamp: Date.now(),
    }

    const response = await fetch(firebaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    })

    if (!response.ok) {
      const responseText = await response.text()
      throw new Error(`Firebase error: ${response.statusText} - ${responseText}`)
    }

    const result = await response.json()

    return NextResponse.json({ success: true, orderId: result.name })
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
