"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  const { toast } = useToast()
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

  const originalPrice = subtotal / 0.3
  const savings = originalPrice - subtotal

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only auto-save if at least email is filled
      if (email && email.includes("@")) {
        const customerData = {
          email,
          firstName,
          lastName,
          address,
          apartment,
          city,
          state,
          zipCode,
          phone,
          country,
          trackingUpdates,
          type: "customer_info",
          savedAt: new Date().toISOString(),
        }

        // Save to Firebase automatically
        fetch("/api/save-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
        }).catch((error) => {
          console.error("Auto-save error:", error)
        })
      }
    }, 2000) // Wait 2 seconds after user stops typing

    return () => clearTimeout(timeoutId)
  }, [email, firstName, lastName, address, apartment, city, state, zipCode, phone, country, trackingUpdates])

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

  const validateAndSaveOrder = async (paypalOrderId?: string) => {
    if (!email || !lastName || !address || !city || !state || !zipCode || !phone) {
      toast({
        title: "Campos obrigatórios faltando",
        description: "Por favor, preencha todos os campos obrigatórios antes de continuar.",
        variant: "destructive",
      })
      return false
    }

    const orderData = {
      email,
      firstName,
      lastName,
      address,
      apartment,
      city,
      state,
      zipCode,
      phone,
      country,
      trackingUpdates,
      saveInfo,
      cartItems: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantityInCart,
        image: item.image,
      })),
      subtotal,
      paypalOrderId,
      status: paypalOrderId ? "completed" : "pending",
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

      toast({
        title: "Pedido salvo!",
        description: "Seu pedido foi salvo com sucesso.",
      })
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

  const handleSaveInfo = async (checked: boolean) => {
    setSaveInfo(checked)

    if (checked && email && lastName && address && city && state && zipCode && phone) {
      const customerData = {
        email,
        firstName,
        lastName,
        address,
        apartment,
        city,
        state,
        zipCode,
        phone,
        country,
        type: "customer_info",
        savedAt: new Date().toISOString(),
      }

      try {
        const response = await fetch("/api/save-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
        })

        const result = await response.json()

        if (result.success) {
          toast({
            title: "Informações salvas",
            description: "Suas informações foram salvas para a próxima compra.",
          })
        }
      } catch (error) {
        console.error("Error saving customer info:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="flex justify-center">
            <h1 className="text-3xl font-bold text-[#8c2a42]">ZYLUMIA</h1>
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
                <Checkbox id="save-info" checked={saveInfo} onCheckedChange={handleSaveInfo} />
                <Label htmlFor="save-info" className="text-sm cursor-pointer">
                  Guarde esta informação para a próxima vez.
                </Label>
              </div>
            </div>

            {/* Free Shipping Banner */}
            <div className="mb-8 p-4 bg-[#8c2a42] rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <p className="text-sm font-medium text-white">Frete Grátis para todos os países!</p>
              </div>
            </div>

            {/* Footer Links with Policy Modals */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 border-t pt-6">
              <PolicyModal triggerText="Política de reembolso" title="Política de Reembolso">
                <div className="space-y-4">
                  <p>
                    Temos uma política de devolução de 30 dias, o que significa que você tem 30 dias após receber seu
                    item para solicitar uma devolução.
                  </p>
                  <p>
                    Para ser elegível para uma devolução, seu item deve estar nas mesmas condições em que você o
                    recebeu, não usado ou não usado, com etiquetas e em sua embalagem original. Você também precisará do
                    recibo ou comprovante de compra.
                  </p>
                  <p>
                    Para iniciar uma devolução, você pode entrar em contato conosco em support@zylumia.com. Se sua
                    devolução for aceita, enviaremos uma etiqueta de envio de devolução, bem como instruções sobre como
                    e onde enviar seu pacote.
                  </p>
                  <h3 className="font-semibold mt-4">Danos e problemas</h3>
                  <p>
                    Inspecione seu pedido ao recebê-lo e entre em contato imediatamente se o item estiver com defeito,
                    danificado ou se você receber o item errado, para que possamos avaliar o problema e corrigi-lo.
                  </p>
                  <h3 className="font-semibold mt-4">Reembolsos</h3>
                  <p>
                    Notificaremos você assim que recebermos e inspecionarmos sua devolução e informaremos se o reembolso
                    foi aprovado ou não. Se aprovado, você será reembolsado automaticamente em seu método de pagamento
                    original dentro de 10 dias úteis.
                  </p>
                </div>
              </PolicyModal>

              <PolicyModal triggerText="Envio" title="Política de Envio">
                <div className="space-y-4">
                  <p>
                    Oferecemos frete grátis para todos os países. Os pedidos são processados dentro de 1-2 dias úteis e
                    normalmente chegam em 7-14 dias úteis, dependendo do seu local.
                  </p>
                  <p>
                    Você receberá um e-mail de confirmação com informações de rastreamento assim que seu pedido for
                    enviado. Você pode usar este número de rastreamento para acompanhar seu pacote em tempo real.
                  </p>
                  <h3 className="font-semibold mt-4">Prazos de entrega estimados:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Estados Unidos: 7-10 dias úteis</li>
                    <li>Canadá: 10-14 dias úteis</li>
                    <li>Europa: 10-14 dias úteis</li>
                    <li>Austrália/Nova Zelândia: 12-16 dias úteis</li>
                    <li>Resto do mundo: 14-21 dias úteis</li>
                  </ul>
                  <p className="mt-4">
                    Por favor, note que estes são prazos estimados e podem variar durante períodos de grande volume,
                    como feriados.
                  </p>
                </div>
              </PolicyModal>

              <PolicyModal triggerText="Política de Privacidade" title="Política de Privacidade">
                <div className="space-y-4">
                  <p>
                    Na Zylumia, levamos sua privacidade a sério. Esta política de privacidade descreve como coletamos,
                    usamos e protegemos suas informações pessoais.
                  </p>
                  <h3 className="font-semibold mt-4">Informações que coletamos</h3>
                  <p>
                    Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail, endereço de
                    entrega e informações de pagamento quando você faz um pedido.
                  </p>
                  <h3 className="font-semibold mt-4">Como usamos suas informações</h3>
                  <p>Usamos as informações coletadas para:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Processar e enviar seus pedidos</li>
                    <li>Enviar atualizações de rastreamento e confirmações de pedido</li>
                    <li>Responder às suas perguntas e fornecer suporte ao cliente</li>
                    <li>Melhorar nossos produtos e serviços</li>
                    <li>Enviar comunicações de marketing (com seu consentimento)</li>
                  </ul>
                  <h3 className="font-semibold mt-4">Proteção de dados</h3>
                  <p>
                    Implementamos medidas de segurança apropriadas para proteger suas informações pessoais contra acesso
                    não autorizado, alteração, divulgação ou destruição.
                  </p>
                  <p className="mt-4">
                    Suas informações pessoais nunca serão vendidas ou compartilhadas com terceiros para fins de
                    marketing sem seu consentimento explícito.
                  </p>
                </div>
              </PolicyModal>

              <PolicyModal triggerText="Termos de serviço" title="Termos de Serviço">
                <div className="space-y-4">
                  <p>
                    Ao acessar e fazer um pedido com a Zylumia, você confirma que está de acordo e vinculado aos termos
                    de serviço contidos nos Termos e Condições descritos abaixo.
                  </p>
                  <h3 className="font-semibold mt-4">Uso do site</h3>
                  <p>
                    Você concorda em usar nosso site apenas para fins legais e de maneira que não infrinja os direitos
                    de terceiros nem restrinja ou iniba o uso e aproveitamento do site por qualquer terceiro.
                  </p>
                  <h3 className="font-semibold mt-4">Propriedade intelectual</h3>
                  <p>
                    Todo o conteúdo incluído no site, como texto, gráficos, logotipos, imagens e software, é propriedade
                    da Zylumia e protegido por leis de direitos autorais internacionais.
                  </p>
                  <h3 className="font-semibold mt-4">Precisão do produto</h3>
                  <p>
                    Fazemos todos os esforços para exibir as cores e imagens de nossos produtos com a maior precisão
                    possível. No entanto, não podemos garantir que a exibição de qualquer cor em seu monitor seja
                    precisa.
                  </p>
                  <h3 className="font-semibold mt-4">Limitação de responsabilidade</h3>
                  <p>
                    A Zylumia não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais
                    ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou outras perdas
                    intangíveis.
                  </p>
                </div>
              </PolicyModal>

              <PolicyModal triggerText="Contato" title="Contato">
                <div className="space-y-4">
                  <p>
                    Se você tiver alguma dúvida sobre nossos produtos, pedidos ou políticas, nossa equipe de suporte ao
                    cliente está aqui para ajudar!
                  </p>
                  <h3 className="font-semibold mt-4">Informações de contato:</h3>
                  <p>
                    <strong>Email:</strong> support@zylumia.com
                  </p>
                  <p>
                    <strong>Horário de atendimento:</strong>
                    <br />
                    Segunda a Sexta: 9h às 18h (GMT)
                    <br />
                    Sábado: 10h às 16h (GMT)
                    <br />
                    Domingo: Fechado
                  </p>
                  <h3 className="font-semibold mt-4">Tempo de resposta:</h3>
                  <p>
                    Nos esforçamos para responder a todas as consultas dentro de 24 horas durante o horário comercial.
                    Durante períodos de grande volume, o tempo de resposta pode ser um pouco mais longo.
                  </p>
                  <p className="mt-4">
                    Para consultas urgentes relacionadas a pedidos existentes, inclua seu número de pedido na linha de
                    assunto do e-mail para processamento mais rápido.
                  </p>
                </div>
              </PolicyModal>
            </div>
          </div>

          {/* Right Column - Product Summary (Desktop + Mobile) */}
          <div className="lg:pl-8 lg:border-l mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-8">
              <h2 className="text-lg font-semibold mb-6">Resumo do Pedido</h2>

              {/* Product Items - Now visible on mobile too */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
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
                ))}
              </div>

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
                    <span className="text-sm text-gray-500 mr-2">GBP</span>£{subtotal.toFixed(2)}
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

              <div className="mt-6">
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                    currency: "USD",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical", label: "checkout" }}
                    onClick={async () => {
                      const isValid = await validateAndSaveOrder()
                      if (!isValid) {
                        return false
                      }
                      return true
                    }}
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

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 border-t pt-6 mt-6">
                <PolicyModal triggerText="Política de reembolso" title="Política de Reembolso">
                  <div className="space-y-4">
                    <p>
                      Temos uma política de devolução de 30 dias, o que significa que você tem 30 dias após receber seu
                      item para solicitar uma devolução.
                    </p>
                    <p>
                      Para ser elegível para uma devolução, seu item deve estar nas mesmas condições em que você o
                      recebeu, não usado ou não usado, com etiquetas e em sua embalagem original. Você também precisará
                      do recibo ou comprovante de compra.
                    </p>
                    <p>
                      Para iniciar uma devolução, você pode entrar em contato conosco em support@zylumia.com. Se sua
                      devolução for aceita, enviaremos uma etiqueta de envio de devolução, bem como instruções sobre
                      como e onde enviar seu pacote.
                    </p>
                    <h3 className="font-semibold mt-4">Danos e problemas</h3>
                    <p>
                      Inspecione seu pedido ao recebê-lo e entre em contato imediatamente se o item estiver com defeito,
                      danificado ou se você receber o item errado, para que possamos avaliar o problema e corrigi-lo.
                    </p>
                    <h3 className="font-semibold mt-4">Reembolsos</h3>
                    <p>
                      Notificaremos você assim que recebermos e inspecionarmos sua devolução e informaremos se o
                      reembolso foi aprovado ou não. Se aprovado, você será reembolsado automaticamente em seu método de
                      pagamento original dentro de 10 dias úteis.
                    </p>
                  </div>
                </PolicyModal>

                <PolicyModal triggerText="Envio" title="Política de Envio">
                  <div className="space-y-4">
                    <p>
                      Oferecemos frete grátis para todos os países. Os pedidos são processados dentro de 1-2 dias úteis
                      e normalmente chegam em 7-14 dias úteis, dependendo do seu local.
                    </p>
                    <p>
                      Você receberá um e-mail de confirmação com informações de rastreamento assim que seu pedido for
                      enviado. Você pode usar este número de rastreamento para acompanhar seu pacote em tempo real.
                    </p>
                    <h3 className="font-semibold mt-4">Prazos de entrega estimados:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Estados Unidos: 7-10 dias úteis</li>
                      <li>Canadá: 10-14 dias úteis</li>
                      <li>Europa: 10-14 dias úteis</li>
                      <li>Austrália/Nova Zelândia: 12-16 dias úteis</li>
                      <li>Resto do mundo: 14-21 dias úteis</li>
                    </ul>
                    <p className="mt-4">
                      Por favor, note que estes são prazos estimados e podem variar durante períodos de grande volume,
                      como feriados.
                    </p>
                  </div>
                </PolicyModal>

                <PolicyModal triggerText="Política de Privacidade" title="Política de Privacidade">
                  <div className="space-y-4">
                    <p>
                      Na Zylumia, levamos sua privacidade a sério. Esta política de privacidade descreve como coletamos,
                      usamos e protegemos suas informações pessoais.
                    </p>
                    <h3 className="font-semibold mt-4">Informações que coletamos</h3>
                    <p>
                      Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail, endereço de
                      entrega e informações de pagamento quando você faz um pedido.
                    </p>
                    <h3 className="font-semibold mt-4">Como usamos suas informações</h3>
                    <p>Usamos as informações coletadas para:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Processar e enviar seus pedidos</li>
                      <li>Enviar atualizações de rastreamento e confirmações de pedido</li>
                      <li>Responder às suas perguntas e fornecer suporte ao cliente</li>
                      <li>Melhorar nossos produtos e serviços</li>
                      <li>Enviar comunicações de marketing (com seu consentimento)</li>
                    </ul>
                    <h3 className="font-semibold mt-4">Proteção de dados</h3>
                    <p>
                      Implementamos medidas de segurança apropriadas para proteger suas informações pessoais contra
                      acesso não autorizado, alteração, divulgação ou destruição.
                    </p>
                    <p className="mt-4">
                      Suas informações pessoais nunca serão vendidas ou compartilhadas com terceiros para fins de
                      marketing sem seu consentimento explícito.
                    </p>
                  </div>
                </PolicyModal>

                <PolicyModal triggerText="Termos de serviço" title="Termos de Serviço">
                  <div className="space-y-4">
                    <p>
                      Ao acessar e fazer um pedido com a Zylumia, você confirma que está de acordo e vinculado aos
                      termos de serviço contidos nos Termos e Condições descritos abaixo.
                    </p>
                    <h3 className="font-semibold mt-4">Uso do site</h3>
                    <p>
                      Você concorda em usar nosso site apenas para fins legais e de maneira que não infrinja os direitos
                      de terceiros nem restrinja ou iniba o uso e aproveitamento do site por qualquer terceiro.
                    </p>
                    <h3 className="font-semibold mt-4">Propriedade intelectual</h3>
                    <p>
                      Todo o conteúdo incluído no site, como texto, gráficos, logotipos, imagens e software, é
                      propriedade da Zylumia e protegido por leis de direitos autorais internacionais.
                    </p>
                    <h3 className="font-semibold mt-4">Precisão do produto</h3>
                    <p>
                      Fazemos todos os esforços para exibir as cores e imagens de nossos produtos com a maior precisão
                      possível. No entanto, não podemos garantir que a exibição de qualquer cor em seu monitor seja
                      precisa.
                    </p>
                    <h3 className="font-semibold mt-4">Limitação de responsabilidade</h3>
                    <p>
                      A Zylumia não será responsável por quaisquer danos indiretos, incidentais, especiais,
                      consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou
                      outras perdas intangíveis.
                    </p>
                  </div>
                </PolicyModal>

                <PolicyModal triggerText="Contato" title="Contato">
                  <div className="space-y-4">
                    <p>
                      Se você tiver alguma dúvida sobre nossos produtos, pedidos ou políticas, nossa equipe de suporte
                      ao cliente está aqui para ajudar!
                    </p>
                    <h3 className="font-semibold mt-4">Informações de contato:</h3>
                    <p>
                      <strong>Email:</strong> support@zylumia.com
                    </p>
                    <p>
                      <strong>Horário de atendimento:</strong>
                      <br />
                      Segunda a Sexta: 9h às 18h (GMT)
                      <br />
                      Sábado: 10h às 16h (GMT)
                      <br />
                      Domingo: Fechado
                    </p>
                    <h3 className="font-semibold mt-4">Tempo de resposta:</h3>
                    <p>
                      Nos esforçamos para responder a todas as consultas dentro de 24 horas durante o horário comercial.
                      Durante períodos de grande volume, o tempo de resposta pode ser um pouco mais longo.
                    </p>
                    <p className="mt-4">
                      Para consultas urgentes relacionadas a pedidos existentes, inclua seu número de pedido na linha de
                      assunto do e-mail para processamento mais rápido.
                    </p>
                  </div>
                </PolicyModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
