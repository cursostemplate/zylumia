"use client"
import { Star, ShoppingBag } from "lucide-react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

const product = {
  id: 1,
  name: "Bio-Collagen Mask",
  price: "£21.95",
  originalPrice: "£34.95",
  discount: "37%",
  rating: 5,
  reviewCount: 5000,
  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Yt0sMSBJwOWNVdZNC2zVNnZ7lnoGey.png",
  description:
    "Premium Korean bio-collagen face mask for anti-aging and deep hydration. Visible results after just one use.",
  quantity: "4 Masks",
  supply: "1 Month Supply",
  save: "28%",
  isPopular: false,
  freeGift: false,
  priceId: "price_1RuNUi7NJwNT4LyHobs3baD6",
}

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

  const handleAddToCart = () => {
    addToCart(product)
    trackAddToCart(product)
    router.push("/cart")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand/10 to-brand/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-lora text-brand mb-4">Wake Up to Glass Skin</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your skincare routine with our premium bio-collagen masks. Experience the Korean beauty secret
              for radiant, youthful skin.
            </p>
          </div>
        </section>

        {/* Product Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-lora text-brand mb-6">Our Premium Skincare</h2>

                {/* Nova imagem adicionada */}
                <div className="mb-8">
                  <NextImage
                    src="https://i.postimg.cc/ZqG8zTrc/Chat-GPT-Image-13-de-ago-de-2025-00-05-30.webp"
                    alt="Premium Bio-Collagen Skincare Results"
                    width={600}
                    height={400}
                    className="mx-auto rounded-lg shadow-lg object-cover"
                  />
                </div>

                <p className="text-muted-foreground">
                  Discover our carefully curated collection of premium skincare products
                </p>
              </div>

              {/* Product Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto">
                <div className="relative">
                  <NextImage
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
                    SAVE {product.discount}
                  </div>
                </div>

                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} fill="currentColor" className="w-4 h-4" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Rated {product.rating} by {product.reviewCount.toLocaleString()} customers
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-2xl font-bold text-center mb-4">{product.name}</h3>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-brand">{product.price}</span>
                      <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-brand hover:bg-brand/90 text-brand-foreground py-3 text-lg font-bold"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>

                  {/* Product Description */}
                  <p className="text-sm text-muted-foreground text-center mt-4">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
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
                    <ShoppingBag className="w-8 h-8 text-brand" />
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
