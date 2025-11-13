import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log("[v0] Login attempt:", { email })

    // Validação básica
    if (!email || !password) {
      console.log("[v0] Login failed: Missing fields")
      return NextResponse.json({ success: false, error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    const databaseUrl = "https://banco-de-dados-fba27.firebaseio.com"
    const emailId = email.toLowerCase().replace(/[.@]/g, "_")

    console.log("[v0] Checking user:", emailId)

    // Buscar usuário no Firebase Realtime Database
    const checkResponse = await fetch(`${databaseUrl}/users/${emailId}.json`)

    if (!checkResponse.ok) {
      const errorData = await checkResponse.json()
      console.log("[v0] Firebase error:", errorData)
      throw new Error("Erro ao buscar usuário")
    }

    const user = await checkResponse.json()

    if (!user || !user.email) {
      console.log("[v0] Login failed: User not found")
      return NextResponse.json(
        { success: false, error: "Usuário não encontrado. Crie uma conta primeiro." },
        { status: 404 },
      )
    }

    console.log("[v0] User found, login successful:", emailId)

    // Atualizar último login
    await fetch(`${databaseUrl}/users/${emailId}/lastLogin.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Date.now()),
    })

    return NextResponse.json({
      success: true,
      message: "Login realizado com sucesso!",
      user: {
        id: emailId,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error: any) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Ocorreu um erro. Tente novamente." },
      { status: 500 },
    )
  }
}
