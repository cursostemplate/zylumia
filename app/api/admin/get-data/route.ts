export async function GET() {
  try {
    const databaseUrl = "https://banco-de-dados-fba27.firebaseio.com"

    // Fetch orders
    const ordersResponse = await fetch(`${databaseUrl}/orders.json`)

    if (!ordersResponse.ok) {
      throw new Error(`Failed to fetch orders: ${ordersResponse.status} ${await ordersResponse.text()}`)
    }

    const ordersData = await ordersResponse.json()

    // Fetch users
    const usersResponse = await fetch(`${databaseUrl}/users.json`)

    if (!usersResponse.ok) {
      throw new Error(`Failed to fetch users: ${usersResponse.status} ${await usersResponse.text()}`)
    }

    const usersData = await usersResponse.json()

    const subscribersResponse = await fetch(`${databaseUrl}/subscribers.json`)
    const subscribersData = subscribersResponse.ok ? await subscribersResponse.json() : null

    const trackingResponse = await fetch(`${databaseUrl}/tracking.json`)
    const trackingData = trackingResponse.ok ? await trackingResponse.json() : null

    // Convert to arrays
    const orders = ordersData
      ? Object.entries(ordersData).map(([id, order]) => ({
          id,
          ...(order as any),
        }))
      : []

    const users = usersData
      ? Object.entries(usersData).map(([id, user]) => ({
          id,
          ...(user as any),
        }))
      : []

    const subscribers = subscribersData
      ? Object.entries(subscribersData).map(([id, subscriber]) => ({
          id,
          ...(subscriber as any),
        }))
      : []

    const trackingEvents = trackingData
      ? Object.entries(trackingData).map(([id, event]) => ({
          id,
          ...(event as any),
        }))
      : []

    return new Response(
      JSON.stringify({
        orders,
        users,
        subscribers,
        trackingEvents,
        timestamp: Date.now(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error: any) {
    console.error("Error fetching admin data:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
