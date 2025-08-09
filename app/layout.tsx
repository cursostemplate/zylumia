import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./fonts.css"
import { cn } from "@/lib/utils"
import { CartProvider } from "@/contexts/cart-context"
import Script from "next/script"

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
        <CartProvider>{children}</CartProvider>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-JHLXY58DJ0" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JHLXY58DJ0');
          `}
        </Script>
      </body>
    </html>
  )
}
