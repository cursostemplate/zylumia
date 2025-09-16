"use client"
import { Star, Filter } from "lucide-react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { useState } from "react"

const products = [
  {
    id: 1,
    name: "Bio-Collagen Mask",
    price: "£21.95",
    originalPrice: "£34.95",
    discount: "37%",
    rating: 5,
    reviewCount: 5000,
    image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
    description: "Premium Korean bio-collagen face mask for anti-aging and deep hydration.",
    quantity: "4 Masks",
    supply: "1 Month Supply",
    save: "28%",
    isPopular: false,
    freeGift: false,
    priceId: "price_1RuNUi7NJwNT4LyHobs3baD6",
  },
  {
    id: 2,
    name: "Anti-Wrinkle Collagen Mask",
    price: "£30.95",
    originalPrice: "£69.90",
    discount: "56%",
    rating: 5,
    reviewCount: 3200,
    image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
    description: "Advanced anti-wrinkle formula with concentrated collagen peptides.",
    quantity: "8 Masks",
    supply: "2 Month Supply",
    save: "56%",
    isPopular: false,
    freeGift: false,
    priceId: "price_1RuNVc7NJwNT4LyHIzKpUcL1",
  },
  {
    id: 3,
    name: "Premium Collagen Mask",
    price: "£38.95",
    originalPrice: "£104.85",
    discount: "62%",
    rating: 5,
    reviewCount: 4800,
    image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
    description: "Most popular choice with maximum hydration and anti-aging benefits.",
    quantity: "12 Masks",
    supply: "3 Month Supply",
    save: "62%",
    isPopular: true,
    freeGift: false,
    priceId: "price_1RuNWg7NJwNT4LyHmKMp8wKv",
  },
  {
    id: 4,
    name: "Luxury Collagen Mask",
    price: "£48.95",
    originalPrice: "£139.80",
    discount: "66%",
    rating: 5,
    reviewCount: 2900,
    image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
    description: "Luxury formula with free gift included for ultimate skincare experience.",
    quantity: "16 Masks",
    supply: "4 Month Supply",
    save: "66%",
    isPopular: false,
    freeGift: true,
    priceId: "price_1RuNXf7NJwNT4LyHDmObIlXF",
  },
  {
    id: 5,
    name: "Ultimate Collagen Mask",
    price: "£65.95",
    originalPrice: "£209.70",
    discount: "70%",
    rating: 5,
    reviewCount: 1800,
    image: "https://i.postimg.cc/4dGxBRhh/M-scara-Facial-Bio-Col-geno-1.webp",
    description: "Ultimate 6-month supply for long-term skin transformation.",
    quantity: "24 Masks",
    supply: "6 Month Supply",
    save: "70%",
    isPopular: false,
    freeGift: false,
    priceId: "price_1RuNYq7NJwNT4LyHC4QegQ7N",
  },
]

// Função para enviar evento para Google Analytics
const trackAddToCart = (item: any) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: "GBP",
      value: Number.parseFloat(item.price.replace("£", "")),
      items: [
        {
          item_id: item.id.toString(),
          item_name: `Bio-Collagen ${item.quantity}`,
          item_category: "Skincare",
          item_variant: item.supply,
          quantity: 1,
          price: Number.parseFloat(item.price.replace("£", "")),
        },
      ],
    })
  }
}

export default function SkincarePage() {
  const { addToCart } = useCart()
  const router = useRouter()
  const [sortBy, setSortBy] = useState("popular")

  const handleAddToCart = (product: any) => {
    addToCart(product)
    trackAddToCart(product)

    // No mobile, vai direto para checkout
    if (window.innerWidth < 768) {
      router.push("/cart")
    } else {
      // No desktop, pode mostrar uma notificação ou ir para o carrinho
      router.push("/cart")
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number.parseFloat(a.price.replace("£", "")) - Number.parseFloat(b.price.replace("£", ""))
      case "price-high":
        return Number.parseFloat(b.price.replace("£", "")) - Number.parseFloat(a.price.replace("£", ""))
      case "rating":
        return b.rating - a.rating
      default:
        return b.reviewCount - a.reviewCount
    }
  })

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold font-lora text-center mb-4">Skincare</h1>

            {/* Filter and Sort Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filter and sort</span>
              </div>
              <span className="text-sm text-muted-foreground">{products.length} products</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="relative aspect-[170/311] bg-gray-100">
                  <NextImage src={product.image} alt={product.name} fill className="object-cover" />

                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded text-xs font-bold">
                    SAVE {product.discount}
                  </div>

                  {/* Popular Badge */}
                  {product.isPopular && (
                    <div className="absolute top-2 right-2 bg-brand text-white px-2 py-1 rounded text-xs font-bold">
                      POPULAR
                    </div>
                  )}

                  {/* Free Gift Badge */}
                  {product.freeGift && (
                    <div className="absolute top-8 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                      FREE GIFT
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} fill="currentColor" className="w-3 h-3" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-brand text-lg">{product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-brand hover:bg-brand/90 text-white text-sm font-semibold py-2"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-lora text-brand mb-8">Why Choose Our Skincare?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6">
                  <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-brand" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                  <p className="text-muted-foreground">
                    Made with the finest Korean bio-collagen technology for maximum effectiveness
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-brand" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fast Results</h3>
                  <p className="text-muted-foreground">
                    Visible improvements in skin texture and radiance after just one use
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-brand" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trusted by Thousands</h3>
                  <p className="text-muted-foreground">Over 5,000 satisfied customers with 4.6/5 star rating</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
