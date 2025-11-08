import { type NextRequest, NextResponse } from "next/server"

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_API = "https://api-m.sandbox.paypal.com" // Use "https://api-m.paypal.com" for production

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
    const body = await req.json()
    const { cartItems, email, shippingAddress } = body

    // Calculate total
    const total = cartItems.reduce((acc: number, item: any) => {
      const price = Number.parseFloat(item.price.replace("£", ""))
      return acc + price * item.quantityInCart
    }, 0)

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken()

    // Create PayPal order
    const orderResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: (total * 1.27).toFixed(2), // Convert GBP to USD (approximate)
            },
            description: "Zylumia Bio-Collagen Face Masks",
            shipping: {
              name: {
                full_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
              },
              address: {
                address_line_1: shippingAddress.address,
                address_line_2: shippingAddress.apartment,
                admin_area_2: shippingAddress.city,
                admin_area_1: shippingAddress.state,
                postal_code: shippingAddress.zipCode,
                country_code: shippingAddress.country,
              },
            },
          },
        ],
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
          shipping_preference: "SET_PROVIDED_ADDRESS",
        },
      }),
    })

    const orderData = await orderResponse.json()

    // Find approval URL
    const approvalUrl = orderData.links?.find((link: any) => link.rel === "approve")?.href

    return NextResponse.json({
      orderId: orderData.id,
      approvalUrl,
    })
  } catch (error) {
    console.error("PayPal order creation error:", error)
    return NextResponse.json({ error: "Failed to create PayPal order" }, { status: 500 })
  }
}
