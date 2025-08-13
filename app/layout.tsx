import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./fonts.css"
import { cn } from "@/lib/utils"
import { CartProvider } from "@/contexts/cart-context"
import Script from "next/script"
import { CountdownBanner } from "@/components/countdown-banner"

export const metadata: Metadata = {
  title: "Zylumia - Premium Bio-Collagen Face Masks | Korean Skincare | Anti-Aging",
  description:
    "Transform your skin with Zylumia's premium bio-collagen face masks. Korean skincare formula for radiant, youthful skin. Visible results after just one use. Free shipping worldwide. 4.6/5 stars from 5000+ customers.",
  keywords: [
    "collagen mask",
    "face mask",
    "korean skincare",
    "anti-aging",
    "skincare",
    "beauty",
    "collagen",
    "hydrating mask",
    "premium skincare",
    "bio-collagen",
    "wrinkle treatment",
    "skin care routine",
    "facial mask",
    "zylumia",
    "skin hydration",
    "fine lines",
    "skin elasticity",
    "dermatologist recommended",
  ].join(", "),
  authors: [{ name: "Zylumia", url: "https://zylumia.com" }],
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
    icon: [
      {
        url: "https://i.postimg.cc/h4yJjv9M/Chat-GPT-Image-13-08-2025-01-38-26.webp",
        sizes: "32x32",
        type: "image/webp",
      },
      {
        url: "https://i.postimg.cc/h4yJjv9M/Chat-GPT-Image-13-08-2025-01-38-26.webp",
        sizes: "16x16",
        type: "image/webp",
      },
    ],
    shortcut: "https://i.postimg.cc/h4yJjv9M/Chat-GPT-Image-13-08-2025-01-38-26.webp",
    apple: [
      {
        url: "https://i.postimg.cc/h4yJjv9M/Chat-GPT-Image-13-08-2025-01-38-26.webp",
        sizes: "180x180",
        type: "image/webp",
      },
    ],
  },
  openGraph: {
    title: "Zylumia - Premium Bio-Collagen Face Masks | Korean Skincare",
    description:
      "Transform your skin with premium Korean bio-collagen masks. Visible results after just one use. 4.6/5 stars from 5000+ customers.",
    url: "https://zylumia.com",
    siteName: "Zylumia",
    images: [
      {
        url: "https://i.postimg.cc/ZqG8zTrc/Chat-GPT-Image-13-de-ago-de-2025-00-05-30.webp",
        width: 1200,
        height: 630,
        alt: "Zylumia Bio-Collagen Face Mask - Before and After Results",
      },
      {
        url: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
        width: 800,
        height: 600,
        alt: "Bio-Collagen Face Mask Product",
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
    creator: "@zylumia",
    site: "@zylumia",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code-here",
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

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://i.postimg.cc" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Organization Structured Data */}
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
                availableLanguage: ["English"],
              },
              sameAs: [],
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              foundingDate: "2024",
              numberOfEmployees: "1-10",
            }),
          }}
        />

        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Zylumia",
              url: "https://zylumia.com",
              description: "Premium bio-collagen face masks for radiant, youthful skin",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://zylumia.com/?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Product Catalog Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Bio-Collagen Face Masks",
              description: "Premium Korean bio-collagen face masks collection",
              numberOfItems: 5,
              itemListElement: [
                {
                  "@type": "Product",
                  position: 1,
                  name: "Bio-Collagen Mask - 4 Masks",
                  description: "1 Month Supply - Premium Korean bio-collagen face mask",
                  image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
                  brand: { "@type": "Brand", name: "Zylumia" },
                  offers: {
                    "@type": "Offer",
                    price: "21.95",
                    priceCurrency: "GBP",
                    availability: "https://schema.org/InStock",
                    url: "https://zylumia.com/#product-4-masks",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.6",
                    reviewCount: "5000",
                  },
                },
                {
                  "@type": "Product",
                  position: 2,
                  name: "Bio-Collagen Mask - 8 Masks",
                  description: "2 Month Supply - Premium Korean bio-collagen face mask",
                  image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
                  brand: { "@type": "Brand", name: "Zylumia" },
                  offers: {
                    "@type": "Offer",
                    price: "30.95",
                    priceCurrency: "GBP",
                    availability: "https://schema.org/InStock",
                    url: "https://zylumia.com/#product-8-masks",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.6",
                    reviewCount: "5000",
                  },
                },
                {
                  "@type": "Product",
                  position: 3,
                  name: "Bio-Collagen Mask - 12 Masks",
                  description: "3 Month Supply - Premium Korean bio-collagen face mask - Most Popular",
                  image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
                  brand: { "@type": "Brand", name: "Zylumia" },
                  offers: {
                    "@type": "Offer",
                    price: "38.95",
                    priceCurrency: "GBP",
                    availability: "https://schema.org/InStock",
                    url: "https://zylumia.com/#product-12-masks",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.6",
                    reviewCount: "5000",
                  },
                },
                {
                  "@type": "Product",
                  position: 4,
                  name: "Bio-Collagen Mask - 16 Masks",
                  description: "4 Month Supply - Premium Korean bio-collagen face mask with Free Gift",
                  image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
                  brand: { "@type": "Brand", name: "Zylumia" },
                  offers: {
                    "@type": "Offer",
                    price: "48.95",
                    priceCurrency: "GBP",
                    availability: "https://schema.org/InStock",
                    url: "https://zylumia.com/#product-16-masks",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.6",
                    reviewCount: "5000",
                  },
                },
                {
                  "@type": "Product",
                  position: 5,
                  name: "Bio-Collagen Mask - 24 Masks",
                  description: "6 Month Supply - Premium Korean bio-collagen face mask",
                  image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
                  brand: { "@type": "Brand", name: "Zylumia" },
                  offers: {
                    "@type": "Offer",
                    price: "65.95",
                    priceCurrency: "GBP",
                    availability: "https://schema.org/InStock",
                    url: "https://zylumia.com/#product-24-masks",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.6",
                    reviewCount: "5000",
                  },
                },
              ],
            }),
          }}
        />

        {/* FAQ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How do I use the Bio-Collagen mask?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Start by cleansing and toning your skin. Apply the bottom part of the mask first, followed by the top. Leave on for 1-2 hours for express glow or overnight for maximum results. Remove gently and massage remaining essence into skin.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How many masks come in a pack?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Each pack contains 4 single-use masks. We recommend starting with 2 masks per week for the first month, then maintaining with one mask per week.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you offer a money-back guarantee?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we offer a 100% money-back guarantee with a 60-day risk-free guarantee. If you don't notice healthier skin, we'll give you a full refund—no questions asked.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the delivery times?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Processing takes 1 business day, and shipping usually takes 3-5 business days depending on your location. You'll receive tracking information once your order ships.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://zylumia.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Skincare",
                  item: "https://zylumia.com/skincare",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Bio-Collagen Masks",
                  item: "https://zylumia.com/#product-details",
                },
              ],
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
              gtag('config', 'G-JHLXY58DJ0', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true
              });
            `,
          }}
        />

        {/* Google Tag Manager (optional) */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </body>
    </html>
  )
}
