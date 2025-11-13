import { NextResponse } from "next/server"

export async function POST(request: Request) {
  console.log("[v0] ========== SUBSCRIBE API CALLED ==========")

  try {
    const body = await request.json()
    const { email, name, source } = body

    console.log("[v0] Request body:", { email, name, source })

    if (!email) {
      console.error("[v0] ❌ Validation failed: Email is missing")
      return NextResponse.json({ success: false, message: "Email é obrigatório" }, { status: 400 })
    }

    const databaseUrl = "https://banco-de-dados-fba27.firebaseio.com"
    console.log("[v0] Database URL:", databaseUrl)

    console.log("[v0] Step 1: Checking for existing email...")
    const checkResponse = await fetch(`${databaseUrl}/subscribers.json`)
    console.log("[v0] Check response status:", checkResponse.status, checkResponse.ok)

    if (checkResponse.ok) {
      const subscribers = await checkResponse.json()
      const subscriberCount = subscribers ? Object.keys(subscribers).length : 0
      console.log("[v0] Found", subscriberCount, "existing subscribers")

      if (subscribers) {
        const existingEmail = Object.values(subscribers).find((sub: any) => sub.email === email)
        if (existingEmail) {
          console.log("[v0] ❌ Email already registered:", email)
          return NextResponse.json({
            success: false,
            message: "Este email já está cadastrado. Você receberá o cupom em breve!",
          })
        }
      }
    } else {
      const errorText = await checkResponse.text()
      console.error("[v0] ❌ Failed to check existing subscribers:", errorText)
    }

    const subscriberData = {
      email,
      name: name || "",
      source: source || "website",
      subscribedAt: Date.now(),
      createdAt: new Date().toISOString(),
      active: true,
    }

    console.log("[v0] Step 2: Saving new subscriber...")
    console.log("[v0] Subscriber data:", JSON.stringify(subscriberData, null, 2))

    const saveResponse = await fetch(`${databaseUrl}/subscribers.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriberData),
    })

    console.log("[v0] Save response status:", saveResponse.status, saveResponse.ok)

    if (!saveResponse.ok) {
      const errorText = await saveResponse.text()
      console.error("[v0] ❌ Firebase save error:", errorText)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao salvar no banco de dados. Verifique as permissões do Firebase.",
        },
        { status: 500 },
      )
    }

    const result = await saveResponse.json()
    console.log("[v0] ✅ Firebase save successful:", result)

    console.log("[v0] ========== SUBSCRIBE API SUCCESS ==========")
    return NextResponse.json({ success: true, message: "Cadastro realizado com sucesso!" })
  } catch (error: any) {
    console.error("[v0] ========== SUBSCRIBE API ERROR ==========")
    console.error("[v0] Exception details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })

    return NextResponse.json({ success: false, message: `Erro interno: ${error.message}` }, { status: 500 })
  }
}
