"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import NextImage from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ShieldCheck } from "lucide-react"

const COUNTRIES = [
  {
    value: "AU",
    label: "Austrália",
    states: [
      "Australian Capital Territory",
      "New South Wales",
      "Northern Territory",
      "Queensland",
      "South Australia",
      "Tasmania",
      "Victoria",
      "Western Australia",
    ],
  },
  {
    value: "CA",
    label: "Canadá",
    states: [
      "Alberta",
      "British Columbia",
      "Manitoba",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Nova Scotia",
      "Ontario",
      "Prince Edward Island",
      "Quebec",
      "Saskatchewan",
    ],
  },
  {
    value: "NZ",
    label: "Nova Zelândia",
    states: [
      "Auckland",
      "Bay of Plenty",
      "Canterbury",
      "Gisborne",
      "Hawke's Bay",
      "Manawatu-Wanganui",
      "Marlborough",
      "Nelson",
      "Northland",
      "Otago",
      "Southland",
      "Taranaki",
      "Tasman",
      "Waikato",
      "Wellington",
      "West Coast",
    ],
  },
  { value: "GB", label: "Reino Unido", states: ["England", "Northern Ireland", "Scotland", "Wales"] },
  {
    value: "US",
    label: "Estados Unidos",
    states: [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ],
  },
]

export default function CheckoutPage() {
  const { cartItems } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  // Form states
  const [email, setEmail] = useState("")
  const [sendUpdates, setSendUpdates] = useState(false)
  const [country, setCountry] = useState("US")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [apartment, setApartment] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [saveInfo, setSaveInfo] = useState(false)
  const [discountCode, setDiscountCode] = useState("")

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/")
    }
  }, [cartItems, router])

  if (cartItems.length === 0) {
    return null
  }

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number.parseFloat(item.price.replace("£", ""))
    return acc + price * item.quantityInCart
  }, 0)

  const selectedCountry = COUNTRIES.find((c) => c.value === country)

  const handlePayPalCheckout = async () => {
    setIsProcessing(true)

    try {
      // Aqui você vai implementar a lógica do PayPal
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          email,
          shippingAddress: {
            firstName,
            lastName,
            address,
            apartment,
            city,
            state,
            zipCode,
            country,
          },
        }),
      })

      const data = await response.json()

      if (data.approvalUrl) {
        window.location.href = data.approvalUrl
      }
    } catch (error) {
      console.error("PayPal checkout error:", error)
      alert("Erro ao processar pagamento. Por favor, tente novamente.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Column - Form */}
          <div className="px-6 py-8 lg:px-12 lg:py-12">
            {/* Logo */}
            <div className="mb-8">
              <Link href="/" className="text-2xl font-bold text-[#8c2a42]">
                ZYLUMIA
              </Link>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/cart" className="hover:text-gray-900">
                Carrinho
              </Link>
              <span>&gt;</span>
              <span className="text-gray-900">Informações</span>
              <span>&gt;</span>
              <span>Envio</span>
              <span>&gt;</span>
              <span>Pagamento</span>
            </div>

            {/* PayPal Express Button */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 text-center mb-3">Pagamento expresso</p>
              <Button
                onClick={handlePayPalCheckout}
                disabled={isProcessing}
                className="w-full h-12 bg-[#FFC439] hover:bg-[#FFB900] text-black font-semibold rounded-md"
              >
                <svg className="w-20 h-6" viewBox="0 0 100 32" fill="currentColor">
                  <path d="M 12 4.917 L 4.2 4.917 C 3.7 4.917 3.2 5.317 3.1 5.817 L 0 25.817 C -0.1 26.217 0.2 26.517 0.6 26.517 L 4.3 26.517 C 4.8 26.517 5.3 26.117 5.4 25.617 L 6.2 20.217 C 6.3 19.717 6.8 19.317 7.3 19.317 L 9.8 19.317 C 14.9 19.317 17.9 16.817 18.7 11.917 C 19 9.817 18.7 8.117 17.7 6.917 C 16.6 5.617 14.6 4.917 12 4.917 Z M 12.9 12.217 C 12.5 15.017 10.3 15.017 8.3 15.017 L 7.1 15.017 L 7.9 10.017 C 7.9 9.717 8.2 9.517 8.5 9.517 L 9 9.517 C 10.4 9.517 11.7 9.517 12.4 10.317 C 12.9 10.817 13.1 11.417 12.9 12.217 Z"></path>
                  <path d="M 35.2 12.117 L 31.5 12.117 C 31.2 12.117 30.9 12.317 30.9 12.617 L 30.7 13.617 L 30.4 13.217 C 29.6 12.017 27.8 11.617 26 11.617 C 21.9 11.617 18.4 14.717 17.7 19.117 C 17.3 21.317 17.8 23.417 19.1 24.817 C 20.2 26.117 21.9 26.717 23.8 26.717 C 27.1 26.717 29 24.617 29 24.617 L 28.8 25.617 C 28.7 26.017 29 26.417 29.4 26.417 L 32.8 26.417 C 33.3 26.417 33.8 26.017 33.9 25.517 L 35.9 12.717 C 36 12.517 35.6 12.117 35.2 12.117 Z M 30.1 19.317 C 29.7 21.417 28.1 22.917 25.9 22.917 C 24.8 22.917 24 22.617 23.5 21.917 C 23 21.217 22.8 20.317 23 19.317 C 23.4 17.217 25.1 15.717 27.2 15.717 C 28.3 15.717 29.1 16.117 29.6 16.717 C 30.2 17.417 30.3 18.317 30.1 19.317 Z"></path>
                  <path d="M 55.1 12.117 L 51.4 12.117 C 51 12.117 50.7 12.317 50.5 12.617 L 45.3 20.217 L 43.1 12.917 C 43 12.417 42.5 12.117 42.1 12.117 L 38.4 12.117 C 38 12.117 37.6 12.517 37.8 13.017 L 41.9 25.117 L 38 30.517 C 37.7 30.917 38 31.517 38.5 31.517 L 42.2 31.517 C 42.6 31.517 42.9 31.317 43.1 31.017 L 55.8 13.117 C 56.1 12.717 55.6 12.117 55.1 12.117 Z"></path>
                  <path d="M 67.5 4.917 L 59.7 4.917 C 59.2 4.917 58.7 5.317 58.6 5.817 L 55.5 25.817 C 55.4 26.217 55.7 26.517 56.1 26.517 L 60.1 26.517 C 60.5 26.517 60.8 26.217 60.8 25.817 L 61.7 20.217 C 61.8 19.717 62.3 19.317 62.8 19.317 L 65.3 19.317 C 70.4 19.317 73.4 16.817 74.2 11.917 C 74.5 9.817 74.2 8.117 73.2 6.917 C 72.1 5.617 70.1 4.917 67.5 4.917 Z M 68.4 12.217 C 68 15.017 65.8 15.017 63.8 15.017 L 62.6 15.017 L 63.4 10.017 C 63.4 9.717 63.7 9.517 64 9.517 L 64.5 9.517 C 65.9 9.517 67.2 9.517 67.9 10.317 C 68.4 10.817 68.6 11.417 68.4 12.217 Z"></path>
                  <path d="M 90.7 12.117 L 87 12.117 C 86.7 12.117 86.4 12.317 86.4 12.617 L 86.2 13.617 L 85.9 13.217 C 85.1 12.017 83.3 11.617 81.5 11.617 C 77.4 11.617 73.9 14.717 73.2 19.117 C 72.8 21.317 73.3 23.417 74.6 24.817 C 75.7 26.117 77.4 26.717 79.3 26.717 C 82.6 26.717 84.5 24.617 84.5 24.617 L 84.3 25.617 C 84.2 26.017 84.5 26.417 84.9 26.417 L 88.3 26.417 C 88.8 26.417 89.3 26.017 89.4 25.517 L 91.4 12.717 C 91.5 12.517 91.1 12.117 90.7 12.117 Z M 85.6 19.317 C 85.2 21.417 83.6 22.917 81.4 22.917 C 80.3 22.917 79.5 22.617 79 21.917 C 78.5 21.217 78.3 20.317 78.5 19.317 C 78.9 17.217 80.6 15.717 82.7 15.717 C 83.8 15.717 84.6 16.117 85.1 16.717 C 85.7 17.417 85.8 18.317 85.6 19.317 Z"></path>
                  <path d="M 95.1 5.417 L 91.9 25.817 C 91.8 26.217 92.1 26.517 92.5 26.517 L 95.7 26.517 C 96.2 26.517 96.7 26.117 96.8 25.617 L 100 5.617 C 100.1 5.217 99.8 4.917 99.4 4.917 L 95.8 4.917 C 95.4 4.917 95.2 5.117 95.1 5.417 Z"></path>
                </svg>
              </Button>
              <p className="text-center text-sm text-gray-500 my-3">OU</p>
            </div>

            {/* Contact */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Contato</h2>
                <Link href="/login" className="text-sm text-[#8c2a42] hover:underline">
                  Entrar
                </Link>
              </div>
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
              <div className="flex items-center gap-2 mt-3">
                <Checkbox
                  id="updates"
                  checked={sendUpdates}
                  onCheckedChange={(checked) => setSendUpdates(checked as boolean)}
                />
                <label htmlFor="updates" className="text-sm text-gray-700 cursor-pointer">
                  Envie-me atualizações de rastreamento e do pedido em tempo real
                </label>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Endereço para envio</h2>

              <div className="space-y-4">
                {/* Country */}
                <div>
                  <Label htmlFor="country">País/Região</Label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value)
                      setState("")
                    }}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c2a42]"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Primeiro nome</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                {/* Apartment */}
                <div>
                  <Label htmlFor="apartment">Apartamento, suíte, etc. (opcional)</Label>
                  <Input
                    id="apartment"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* City, State, ZIP */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado</Label>
                    <select
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c2a42]"
                      required
                    >
                      <option value="">Selecione</option>
                      {selectedCountry?.states.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input
                      id="zipCode"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                {/* Save Info */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="saveInfo"
                    checked={saveInfo}
                    onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
                  />
                  <label htmlFor="saveInfo" className="text-sm text-gray-700 cursor-pointer">
                    Guarde esta informação para a próxima vez
                  </label>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Link href="/cart" className="flex items-center gap-2 text-[#8c2a42] hover:underline">
                <ChevronLeft className="w-4 h-4" />
                Voltar ao carrinho
              </Link>
              <Button
                onClick={handlePayPalCheckout}
                disabled={isProcessing || !email || !firstName || !lastName || !address || !city || !state || !zipCode}
                className="bg-[#8c2a42] hover:bg-[#6d1f33] text-white px-8"
              >
                {isProcessing ? "Processando..." : "Continuar com o envio"}
              </Button>
            </div>

            {/* Footer Links */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 justify-center">
                <Link href="/refund-policy" className="hover:text-gray-900">
                  Política de reembolso
                </Link>
                <Link href="/shipping" className="hover:text-gray-900">
                  Envio
                </Link>
                <Link href="/privacy-policy" className="hover:text-gray-900">
                  Política de Privacidade
                </Link>
                <Link href="/terms" className="hover:text-gray-900">
                  Termos de serviço
                </Link>
                <Link href="/contact" className="hover:text-gray-900">
                  Contato
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-gray-50 px-6 py-8 lg:px-12 lg:py-12 border-l">
            <div className="sticky top-8">
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative">
                      <NextImage
                        src={item.image}
                        alt={item.quantity}
                        width={64}
                        height={64}
                        className="rounded-lg border"
                      />
                      <div className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantityInCart}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.quantity}</p>
                      <p className="text-xs text-gray-500">{item.supply}</p>
                    </div>
                    <p className="font-semibold">{item.price}</p>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="flex gap-2 mb-6">
                <Input
                  placeholder="Código de desconto"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" className="text-[#8c2a42] border-[#8c2a42] bg-transparent">
                  Aplicar
                </Button>
              </div>

              {/* Pricing Summary */}
              <div className="space-y-3 pt-6 border-t">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    Envio
                    <span className="text-xs text-gray-500">(calculated at next step)</span>
                  </span>
                  <span className="text-gray-500">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-normal">USD</span>
                    <span className="ml-2">${(subtotal * 1.27).toFixed(2)}</span>
                  </div>
                </div>
                {subtotal > 100 && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="font-medium">ECONOMIA TOTAL ${(subtotal * 0.3).toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
