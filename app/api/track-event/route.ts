import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const eventData = await request.json()
    const firebaseUrl = "https://banco-de-dados-fba27.firebaseio.com"

    const trackingData = {
      ...eventData,
      timestamp: Date.now(),
      createdAt: new Date().toISOString(),
    }

    const response = await fetch(`${firebaseUrl}/tracking.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingData),
    })

    if (!response.ok) {
      const responseText = await response.text()
      throw new Error(`Firebase error: ${response.statusText} - ${responseText}`)
    }

    const result = await response.json()

    return NextResponse.json({ success: true, trackingId: result.name })
  } catch (error) {
    console.error("Tracking API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
