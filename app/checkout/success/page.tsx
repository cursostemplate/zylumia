"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCart()
  const [isCapturing, setIsCapturing] = useState(true)

  useEffect(() => {
    const capturePayment = async () => {
      const token = searchParams.get("token")

      if (!token) {
        router.push("/")
        return
      }

      try {
        const response = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: token }),
        })

        const data = await response.json()

        if (data.success) {
          clearCart()
          setIsCapturing(false)
        } else {
          alert("Erro ao processar pagamento")
          router.push("/checkout")
        }
      } catch (error) {
        console.error("Payment capture error:", error)
        alert("Erro ao processar pagamento")
        router.push("/checkout")
      }
    }

    capturePayment()
  }, [searchParams, router, clearCart])

  if (isCapturing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#8c2a42]" />
          <p className="text-lg">Processando seu pagamento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Pedido Confirmado!</h1>
        <p className="text-gray-600 mb-6">
          Obrigado pela sua compra! Você receberá um email de confirmação em breve com os detalhes do rastreamento.
        </p>
        <Button asChild className="w-full bg-[#8c2a42] hover:bg-[#6d1f33]">
          <Link href="/">Voltar para a loja</Link>
        </Button>
      </div>
    </div>
  )
}
