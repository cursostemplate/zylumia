"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import Image from "next/image"
import { PolicyModal } from "@/components/policy-modal"
import { Truck, Shield, Leaf } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { cartItems } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [shippingProtection, setShippingProtection] = useState(false)

  useEffect(() => {
    if (user?.id) {
      loadShippingProtection()
    }
  }, [user?.id])

  const loadShippingProtection = async () => {
    if (!user?.id) return

    try {
      const response = await fetch("/api/cart/load", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      })

      const data = await response.json()
      if (data.success && data.cart) {
        setShippingProtection(data.cart.shippingProtection || false)
      }
    } catch (error) {
      console.error("Error loading shipping protection:", error)
    }
  }

  const handleShippingProtectionChange = async (checked: boolean) => {
    setShippingProtection(checked)

    if (user?.id) {
      try {
        await fetch("/api/cart/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            cartItems,
            shippingProtection: checked,
          }),
        })
      } catch (error) {
        console.error("Error saving shipping protection:", error)
      }
    }
  }

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number.parseFloat(item.price.replace("£", ""))
    return acc + price * item.quantityInCart
  }, 0)

  const shippingProtectionPrice = shippingProtection ? 2.99 : 0
  const totalGBP = subtotal + shippingProtectionPrice
  const totalUSD = totalGBP * 1.27

  const originalPrice = subtotal / 0.3
  const savings = originalPrice - subtotal

  const validateAndSaveOrder = async (paypalOrderId?: string) => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de continuar.",
        variant: "destructive",
      })
      return false
    }

    const orderData = {
      items: cartItems.map((item) => ({
        id: item.id,
        quantity: item.title,
        supply: item.supply,
        price: item.price,
        quantityInCart: item.quantityInCart,
        image: item.image,
      })),
      subtotal,
      total: totalGBP,
      shippingProtection,
      shippingProtectionPrice,
      paypalOrderId: paypalOrderId || "",
      status: paypalOrderId ? "completed" : "pending",
      type: "order",
      timestamp: Date.now(),
    }

    try {
      const response = await fetch("/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (!result.success) {
        toast({
          title: "Erro ao salvar pedido",
          description: result.error || "Ocorreu um erro ao salvar seu pedido.",
          variant: "destructive",
        })
        return false
      }

      if (paypalOrderId) {
        toast({
          title: "Pedido realizado com sucesso!",
          description: "Seu pedido foi salvo e está sendo processado.",
        })
      }
      return true
    } catch (error) {
      toast({
        title: "Erro ao salvar pedido",
        description: "Ocorreu um erro ao salvar seu pedido. Tente novamente.",
        variant: "destructive",
      })
      return false
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="flex justify-center">
            <h1 className="text-3xl font-bold text-[#8c2a42]">ZYLUMIA</h1>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Resumo do Pedido</h2>

          {/* Product Items */}
          <div className="space-y-4 mb-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
                <Link href="/" className="text-[#8c2a42] hover:underline font-medium">
                  Continuar comprando
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border flex-shrink-0 bg-gray-50">
                    <Image
                      src={item.image || "https://storage.googleapis.com/site-zylumia/product1.webp"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-[#8c2a42] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                      {item.quantityInCart}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.quantity}</p>
                    <p className="text-xs text-gray-400">{item.supply}</p>
                  </div>
                  <div className="font-semibold text-sm">
                    £{(Number.parseFloat(item.price.replace("£", "")) * item.quantityInCart).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <>
              {/* Benefits Icons */}
              <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b">
                <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                  <Truck className="w-6 h-6 text-[#8c2a42] mb-2" />
                  <p className="text-xs font-medium text-gray-700">Frete Grátis</p>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-6 h-6 text-[#8c2a42] mb-2" />
                  <p className="text-xs font-medium text-gray-700">Compra Segura</p>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                  <Leaf className="w-6 h-6 text-[#8c2a42] mb-2" />
                  <p className="text-xs font-medium text-gray-700">100% Natural</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Checkbox
                    id="shipping-protection"
                    checked={shippingProtection}
                    onCheckedChange={handleShippingProtectionChange}
                  />
                  <div className="flex-1">
                    <Label htmlFor="shipping-protection" className="font-medium cursor-pointer">
                      Proteção de envio (+£2.99)
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Proteja seu pedido contra perda, dano ou roubo durante o envio
                    </p>
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">£{subtotal.toFixed(2)}</span>
                </div>
                {shippingProtection && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Proteção de envio</span>
                    <span className="font-medium">£{shippingProtectionPrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envio</span>
                  <span className="font-medium text-green-600">GRÁTIS</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total</span>
                  <span>
                    <span className="text-sm text-gray-500 mr-2">USD</span>${totalUSD.toFixed(2)}
                  </span>
                </div>

                {/* Savings Banner */}
                <div className="bg-[#8c2a42] rounded-lg p-4 mt-4">
                  <div className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-white">Você está economizando £{savings.toFixed(2)}!</p>
                      <p className="text-xs text-white/90 mt-1">
                        Preço original: £{originalPrice.toFixed(2)} • Desconto de 70% aplicado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PayPal Button */}
              <div className="mb-6">
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                    currency: "USD",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical", label: "checkout" }}
                    createOrder={(data, actions) => {
                      const orderTotal = Math.max(totalUSD, 0.01).toFixed(2)
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "USD",
                              value: orderTotal,
                            },
                          },
                        ],
                      })
                    }}
                    onApprove={async (data, actions) => {
                      if (actions.order) {
                        const order = await actions.order.capture()
                        await validateAndSaveOrder(order.id)
                        window.location.href = "/checkout/success"
                      }
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err)
                      toast({
                        title: "Erro no pagamento",
                        description: "Ocorreu um erro ao processar seu pagamento. Tente novamente.",
                        variant: "destructive",
                      })
                    }}
                    onCancel={(data) => {
                      toast({
                        title: "Pagamento cancelado",
                        description: "Você cancelou o pagamento.",
                      })
                    }}
                  />
                </PayPalScriptProvider>
              </div>

              {/* Footer Links */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 border-t pt-6">
                <PolicyModal triggerText="Política de reembolso" title="Política de Reembolso">
                  <div className="space-y-4">
                    <p>
                      Temos uma política de devolução de 30 dias, o que significa que você tem 30 dias após receber seu
                      item para solicitar uma devolução.
                    </p>
                    <p>
                      Para ser elegível para uma devolução, seu item deve estar nas mesmas condições em que você o
                      recebeu, não usado ou não usado, com etiquetas e em sua embalagem original.
                    </p>
                  </div>
                </PolicyModal>

                <PolicyModal triggerText="Envio" title="Política de Envio">
                  <div className="space-y-4">
                    <p>
                      Oferecemos frete grátis para todos os países. Os pedidos são processados dentro de 1-2 dias úteis
                      e normalmente chegam em 7-14 dias úteis.
                    </p>
                  </div>
                </PolicyModal>

                <PolicyModal triggerText="Política de Privacidade" title="Política de Privacidade">
                  <div className="space-y-4">
                    <p>
                      Na Zylumia, levamos sua privacidade a sério. Esta política descreve como coletamos, usamos e
                      protegemos suas informações pessoais.
                    </p>
                  </div>
                </PolicyModal>

                <PolicyModal triggerText="Contato" title="Contato">
                  <div className="space-y-4">
                    <p>
                      <strong>Email:</strong> support@zylumia.com
                    </p>
                    <p>
                      <strong>Horário:</strong> Segunda a Sexta: 9h às 18h (GMT)
                    </p>
                  </div>
                </PolicyModal>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
