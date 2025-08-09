import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./fonts.css"
import { cn } from "@/lib/utils"
import { CartProvider } from "@/contexts/cart-context"
import Script from "next/script"
import { CountdownBanner } from "@/components/countdown-banner"

export const metadata: Metadata = {
  title: "Zylumia",
  description: "Seu site de moda e estilo.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <CartProvider>
          <CountdownBanner />
          {children}
        </CartProvider>

        {/* PayPal SDK Script */}
        <Script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&components=hosted-buttons&disable-funding=venmo&currency=GBP`}
          strategy="afterInteractive"
        />

        {/* Google Analytics Script */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-JHLXY58DJ0" />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JHLXY58DJ0');
            `,
          }}
        />
      </body>
    </html>
  )
}
