import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    console.log("[v0] Received order data:", orderData)

    // Aqui você pode salvar no Firebase usando fetch para o Firebase REST API
    const firebaseUrl = "https://banco-de-dados-fba27-default-rtdb.firebaseio.com/orders.json"

    const response = await fetch(firebaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...orderData,
        createdAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`Firebase error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("[v0] Order saved successfully:", result)

    return NextResponse.json({ success: true, orderId: result.name })
  } catch (error) {
    console.error("[v0] Error saving order:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
