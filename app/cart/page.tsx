"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import Image from "next/image"

export default function CartPage() {
  const { cartItems } = useCart()
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("United States")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [apartment, setApartment] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [phone, setPhone] = useState("")
  const [trackingUpdates, setTrackingUpdates] = useState(false)
  const [saveInfo, setSaveInfo] = useState(false)

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number.parseFloat(item.price.replace("£", ""))
    return acc + price * item.quantityInCart
  }, 0)

  const countries = [
    "Australia",
    "Canada",
    "New Zealand",
    "United Kingdom",
    "United States",
    "Austria",
    "Belgium",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Albania",
    "Andorra",
    "Armenia",
    "Azerbaijan",
    "Belarus",
    "Bosnia and Herzegovina",
    "Georgia",
    "Iceland",
    "Kosovo",
    "Liechtenstein",
    "Moldova",
    "Monaco",
    "Montenegro",
    "North Macedonia",
    "Norway",
    "Russia",
    "San Marino",
    "Serbia",
    "Switzerland",
    "Turkey",
    "Ukraine",
    "Vatican City",
  ]

  const statesByCountry: Record<string, string[]> = {
    Australia: [
      "Australian Capital Territory",
      "New South Wales",
      "Northern Territory",
      "Queensland",
      "South Australia",
      "Tasmania",
      "Victoria",
      "Western Australia",
    ],
    "United States": [
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
    Canada: [
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
    "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
    "New Zealand": [
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
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Logo */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-[#8c2a42]">ZYLUMIA</h1>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Column - Form */}
          <div className="lg:pr-8">
            {/* Contact Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">E-mail ou telefone</h2>
                <Link href="/login" className="text-sm text-[#8c2a42] hover:underline">
                  Entrar
                </Link>
              </div>

              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3"
              />

              <div className="flex items-center gap-2">
                <Checkbox
                  id="tracking-updates"
                  checked={trackingUpdates}
                  onCheckedChange={(checked) => setTrackingUpdates(checked as boolean)}
                />
                <Label htmlFor="tracking-updates" className="text-sm cursor-pointer">
                  Envie-me atualizações de rastreamento e do pedido em tempo real.
                </Label>
              </div>
            </div>

            {/* Delivery Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Entrega</h2>

              <div className="space-y-4">
                {/* Country */}
                <div>
                  <Label htmlFor="country" className="text-sm text-gray-600 mb-1 block">
                    País/Região
                  </Label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value)
                      setState("")
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c2a42]"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Primeiro nome (opcional)"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input placeholder="Sobrenome" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                {/* Address */}
                <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

                {/* Apartment */}
                <Input
                  placeholder="Apartamento, suíte, etc. (opcional)"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                />

                {/* City, State, ZIP */}
                <div className="grid grid-cols-3 gap-4">
                  <Input placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />
                  {statesByCountry[country] ? (
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c2a42]"
                    >
                      <option value="">Estado/territ...</option>
                      {statesByCountry[country]?.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input placeholder="Estado" value={state} onChange={(e) => setState(e.target.value)} />
                  )}
                  <Input placeholder="código postal" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </div>

                {/* Phone */}
                <Input type="tel" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              {/* Save Info */}
              <div className="flex items-center gap-2 mt-4">
                <Checkbox
                  id="save-info"
                  checked={saveInfo}
                  onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
                />
                <Label htmlFor="save-info" className="text-sm cursor-pointer">
                  Guarde esta informação para a próxima vez.
                </Label>
              </div>
            </div>

            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm font-medium text-green-800">Frete Grátis para todos os países!</p>
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
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: subtotal.toFixed(2),
                          },
                        },
                      ],
                    })
                  }}
                  onApprove={async (data, actions) => {
                    if (actions.order) {
                      const order = await actions.order.capture()
                      console.log("Order completed:", order)
                      window.location.href = "/checkout/success"
                    }
                  }}
                />
              </PayPalScriptProvider>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 border-t pt-6">
              <Link href="/refund-policy" className="hover:text-[#8c2a42]">
                Política de reembolso
              </Link>
              <Link href="/shipping" className="hover:text-[#8c2a42]">
                Envio
              </Link>
              <Link href="/privacy" className="hover:text-[#8c2a42]">
                Política de Privacidade
              </Link>
              <Link href="/terms" className="hover:text-[#8c2a42]">
                Termos de serviço
              </Link>
              <Link href="/contact" className="hover:text-[#8c2a42]">
                Contato
              </Link>
            </div>
          </div>

          <div className="hidden lg:block lg:pl-8 border-l">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold mb-6">Resumo do Pedido</h2>

              {/* Product Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border flex-shrink-0">
                      <Image
                        src="https://storage.googleapis.com/site-zylumia/product1.webp"
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {item.quantityInCart}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.subtitle}</p>
                    </div>
                    <div className="font-semibold">
                      £{(Number.parseFloat(item.price.replace("£", "")) * item.quantityInCart).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envio</span>
                  <span className="font-medium text-green-600">GRÁTIS</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total</span>
                  <span>
                    <span className="text-sm text-gray-500 mr-2">USD</span>£{subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
