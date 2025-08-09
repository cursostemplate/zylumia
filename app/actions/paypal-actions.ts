"use server"

const PAYPAL_API_BASE =
  process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

async function getAccessToken() {
  const auth = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString(
    "base64",
  )
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to get access token")
  }

  const data = await response.json()
  return data.access_token
}

export async function createOrder(totalAmount: string) {
  const accessToken = await getAccessToken()

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "GBP", // Moeda da sua loja (Libras Esterlinas)
            value: totalAmount,
          },
        },
      ],
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error("Failed to create order:", error)
    throw new Error("Failed to create PayPal order.")
  }

  const data = await response.json()
  return data.id
}

export async function captureOrder(orderID: string) {
  const accessToken = await getAccessToken()

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    console.error("Failed to capture order:", error)
    throw new Error("Failed to capture PayPal order.")
  }

  const data = await response.json()
  // Você pode adicionar lógica aqui para salvar o pedido no seu banco de dados, etc.
  return {
    status: "success",
    data,
  }
}
