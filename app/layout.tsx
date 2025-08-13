import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./fonts.css"
import { cn } from "@/lib/utils"
import { CartProvider } from "@/contexts/cart-context"
import Script from "next/script"
import { CountdownBanner } from "@/components/countdown-banner"

export const metadata: Metadata = {
  title: "Zylumia - Premium Bio-Collagen Face Masks | Korean Skincare",
  description:
    "Transform your skin with Zylumia's premium bio-collagen face masks. Korean skincare formula for radiant, youthful skin. Visible results after just one use. Free shipping worldwide.",
  keywords:
    "collagen mask, face mask, korean skincare, anti-aging, skincare, beauty, collagen, hydrating mask, premium skincare",
  authors: [{ name: "Zylumia" }],
  creator: "Zylumia",
  publisher: "Zylumia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://zylumia.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "https://i.postimg.cc/h4yJjv9M/Chat-GPT-Image-13-08-2025-01-38-26.webp",
    shortcut: "https://i.postimg.cc/h4yJjv9M/Chat-GPT-Image-13-08-2025-01-38-26.webp",
    apple: "https://i.postimg.cc/h4yJjv9M/Chat-GPT-Image-13-08-2025-01-38-26.webp",
  },
  openGraph: {
    title: "Zylumia - Premium Bio-Collagen Face Masks",
    description: "Transform your skin with premium Korean bio-collagen masks. Visible results after just one use.",
    url: "https://zylumia.com",
    siteName: "Zylumia",
    images: [
      {
        url: "https://i.postimg.cc/ZqG8zTrc/Chat-GPT-Image-13-de-ago-de-2025-00-05-30.webp",
        width: 1200,
        height: 630,
        alt: "Zylumia Bio-Collagen Face Mask",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zylumia - Premium Bio-Collagen Face Masks",
    description: "Transform your skin with premium Korean bio-collagen masks. Visible results after just one use.",
    images: ["https://i.postimg.cc/ZqG8zTrc/Chat-GPT-Image-13-de-ago-de-2025-00-05-30.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="https://i.postimg.cc/h4yJjv9M/Chat-GPT-Image-13-08-2025-01-38-26.webp" />
        <link rel="shortcut icon" href="https://i.postimg.cc/h4yJjv9M/Chat-GPT-Image-13-08-2025-01-38-26.webp" />
        <link rel="apple-touch-icon" href="https://i.postimg.cc/h4yJjv9M/Chat-GPT-Image-13-08-2025-01-38-26.webp" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zylumia",
              url: "https://zylumia.com",
              logo: "https://i.postimg.cc/h4yJjv9M/Chat-GPT-Image-13-08-2025-01-38-26.webp",
              description: "Premium bio-collagen face masks for radiant, youthful skin",
              contactPoint: {
                "@type": "ContactPoint",
                email: "zylumiaa@gmail.com",
                contactType: "Customer Service",
              },
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Bio-Collagen Face Mask",
              description: "Premium Korean bio-collagen face mask for anti-aging and skin hydration",
              brand: {
                "@type": "Brand",
                name: "Zylumia",
              },
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "21.95",
                highPrice: "65.95",
                priceCurrency: "GBP",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.6",
                reviewCount: "5000",
              },
            }),
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <CartProvider>
          <CountdownBanner />
          {children}
        </CartProvider>

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
