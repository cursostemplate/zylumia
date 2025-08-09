"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import NextImage from "next/image"
import SiteHeader from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PayPalButtons, type OnApproveData, type CreateOrderData } from "@paypal/react-paypal-js"
import { createOrder, captureOrder } from "@/app/actions/paypal-actions"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function CartPage() {
  const { cartItems } = useCart()
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number.parseFloat(item.price.replace("£", ""))
    return acc + price * item.quantityInCart
  }, 0)

  const shipping = 0 // Frete grátis
  const total = subtotal + shipping

  const handleCreateOrder = async (data: CreateOrderData, actions: any) => {
    try {
      setPaymentStatus("processing")
      const orderID = await createOrder(total.toFixed(2))
      return orderID
    } catch (error) {
      console.error("Error creating PayPal order:", error)
      setErrorMessage("Could not initiate PayPal checkout. Please try again.")
      setPaymentStatus("error")
      return ""
    }
  }

  const handleOnApprove = async (data: OnApproveData, actions: any) => {
    try {
      const result = await captureOrder(data.orderID)
      if (result.status === "success") {
        setPaymentStatus("success")
        // Aqui você pode limpar o carrinho, redirecionar o usuário, etc.
      } else {
        throw new Error("Payment capture failed.")
      }
    } catch (error) {
      console.error("Error capturing PayPal order:", error)
      setErrorMessage("There was an issue with your payment. Please contact support.")
      setPaymentStatus("error")
    }
  }

  const handleOnError = (err: any) => {
    console.error("PayPal Checkout Error:", err)
    setErrorMessage("An unexpected error occurred with PayPal. Please try again or select another payment method.")
    setPaymentStatus("error")
  }

  if (paymentStatus === "success") {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold font-lora mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">Thank you for your order. A confirmation email has been sent to you.</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-lora mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border p-4 rounded-lg">
                  <NextImage src={item.image} alt={item.quantity} width={80} height={80} className="rounded-md" />
                  <div className="flex-grow">
                    <h2 className="font-bold">{item.quantity}</h2>
                    <p className="text-sm text-muted-foreground">{item.supply}</p>
                  </div>
                  <p className="font-bold text-lg">{item.price}</p>
                </div>
              ))}
            </div>
            <div className="md:col-span-1">
              <div className="border p-4 rounded-lg space-y-4">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>

                {paymentStatus === "error" && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                    <div className="flex">
                      <div className="py-1">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                      </div>
                      <div>
                        <p className="font-bold">Payment Error</p>
                        <p className="text-sm">{errorMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {paymentStatus === "processing" ? (
                  <div className="flex justify-center items-center p-4">
                    <p>Processing payment...</p>
                  </div>
                ) : (
                  <div className="mt-4">
                    <PayPalButtons
                      style={{ layout: "vertical", color: "black" }}
                      createOrder={handleCreateOrder}
                      onApprove={handleOnApprove}
                      onError={handleOnError}
                      onCancel={() => setPaymentStatus("idle")}
                    />
                  </div>
                )}

                <div className="flex justify-center pt-2">
                  <NextImage
                    src="https://i.postimg.cc/0QjNK0gz/a6e71fce-61c4-4021-97a0-1b79cdcfc845-removebg-preview.webp"
                    alt="Payment methods"
                    width={250}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
