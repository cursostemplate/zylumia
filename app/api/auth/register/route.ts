import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    console.log("[v0] Registration attempt:", { name, email })

    // Validação básica
    if (!name || !email || !password) {
      console.log("[v0] Registration failed: Missing fields")
      return NextResponse.json({ success: false, error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    if (password.length < 6) {
      console.log("[v0] Registration failed: Password too short")
      return NextResponse.json({ success: false, error: "A senha deve ter pelo menos 6 caracteres" }, { status: 400 })
    }

    const databaseUrl = "https://banco-de-dados-fba27.firebaseio.com"
    const emailId = email.toLowerCase().replace(/[.@]/g, "_")

    console.log("[v0] Checking if user exists:", emailId)

    // Verificar se o usuário já existe
    const checkResponse = await fetch(`${databaseUrl}/users/${emailId}.json`)

    if (!checkResponse.ok && checkResponse.status !== 404) {
      const errorData = await checkResponse.json()
      console.log("[v0] Firebase check error:", errorData)
      throw new Error("Erro ao verificar usuário existente")
    }

    const existingUser = await checkResponse.json()

    if (existingUser && existingUser.email) {
      console.log("[v0] Registration failed: User already exists")
      return NextResponse.json({ success: false, error: "Este email já está cadastrado" }, { status: 400 })
    }

    console.log("[v0] Creating new user...")

    // Criar novo usuário no Firebase Realtime Database
    const userData = {
      name,
      email: email.toLowerCase(),
      createdAt: Date.now(),
      type: "registered_user",
    }

    const saveResponse = await fetch(`${databaseUrl}/users/${emailId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })

    if (!saveResponse.ok) {
      const errorData = await saveResponse.json()
      console.log("[v0] Firebase error:", errorData)
      throw new Error(errorData.error || "Falha ao criar usuário")
    }

    console.log("[v0] User created successfully:", emailId)

    return NextResponse.json({
      success: true,
      message: "Conta criada com sucesso!",
      user: {
        id: emailId,
        name,
        email: email.toLowerCase(),
      },
    })
  } catch (error: any) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Ocorreu um erro. Tente novamente." },
      { status: 500 },
    )
  }
}
