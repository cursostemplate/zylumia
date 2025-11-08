export async function GET() {
  try {
    const databaseUrl = "https://banco-de-dados-fba27.firebaseio.com"

    // Fetch orders
    const ordersResponse = await fetch(`${databaseUrl}/orders.json`)
    const ordersData = await ordersResponse.json()

    // Fetch users
    const usersResponse = await fetch(`${databaseUrl}/users.json`)
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
