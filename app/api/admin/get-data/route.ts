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

    return Response.json({
      orders,
      users,
      timestamp: Date.now(),
    })
  } catch (error: any) {
    console.error("Error fetching admin data:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
