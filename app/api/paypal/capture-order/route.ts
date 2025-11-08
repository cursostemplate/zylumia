import { type NextRequest, NextResponse } from "next/server"

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_API = "https://api-m.sandbox.paypal.com"

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64")

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json()

    const accessToken = await getPayPalAccessToken()

    const captureResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const captureData = await captureResponse.json()

    if (captureData.status === "COMPLETED") {
      return NextResponse.json({ success: true, data: captureData })
    } else {
      return NextResponse.json({ success: false, error: "Payment not completed" }, { status: 400 })
    }
  } catch (error) {
    console.error("PayPal capture error:", error)
    return NextResponse.json({ success: false, error: "Failed to capture payment" }, { status: 500 })
  }
}
