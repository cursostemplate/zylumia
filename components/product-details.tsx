'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Star, CheckCircle2 } from 'lucide-react'
import NextImage from 'next/image'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'

const benefits = [
    "Collagen Boost for your skin",
    "Instant glow after 1 mask a week",
    "Helps reducing acne and bad skin",
    "Smooths wrinkles & fine lines in days",
    "Trusted Korean Beauty Formula"
]

const offers = [
    {
        id: 1,
        quantity: "4 Máscaras",
        supply: "Suprimento para 1 mês",
        save: "ECONOMIZE 28%",
        price: "£21.95",
        originalPrice: "£34.95",
        image: "/placeholder.svg?height=48&width=48",
        isPopular: false,
        freeGift: false,
    },
    {
        id: 2,
        quantity: "8 Máscaras",
        supply: "Suprimento para 2 meses",
        save: "ECONOMIZE 56%",
        price: "£30.95",
        originalPrice: "£69.90",
        image: "/placeholder.svg?height=48&width=48",
        isPopular: false,
        freeGift: false,
    },
    {
        id: 3,
        quantity: "12 Máscaras",
        supply: "Suprimento para 3 meses",
        save: "ECONOMIZE 62%",
        price: "£38.95",
        originalPrice: "£104.85",
        image: "/placeholder.svg?height=48&width=48",
        isPopular: true,
        freeGift: false,
    },
    {
        id: 4,
        quantity: "16 Máscaras",
        supply: "Suprimento para 4 meses",
        save: "ECONOMIZE 66%",
        price: "£48.95",
        originalPrice: "£139.80",
        image: "/placeholder.svg?height=48&width=48",
        isPopular: false,
        freeGift: true,
    },
    {
        id: 5,
        quantity: "24 Máscaras",
        supply: "Suprimento para 6 meses",
        save: "ECONOMIZE 70%",
        price: "£65.95",
        originalPrice: "£209.70",
        image: "/placeholder.svg?height=48&width=48",
        isPopular: false,
        freeGift: false,
    }
]

export function ProductDetails() {
  const [selectedOfferId, setSelectedOfferId] = useState(3); // Default to most popular
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    const selectedOffer = offers.find(offer => offer.id === selectedOfferId);
    if (selectedOffer) {
      addToCart(selectedOffer);
      router.push('/cart');
    }
  };

  return (
    <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-3xl lg:text-4xl font-bold">Bio-Collagen Mask</h1>
            <div className="flex items-center gap-2 mt-2">
                <div className="flex text-green-500">
                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
                </div>
                <span className="text-sm text-muted-foreground">4.6/5 (5000+ reviews)</span>
            </div>
        </div>

        <div className="space-y-2">
            {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-pink-400 flex-shrink-0" />
                    <p dangerouslySetInnerHTML={{ __html: benefit.replace(/(\w+\s\w+)/, '<strong>$1</strong>') }} />
                </div>
            ))}
        </div>

        <div className="my-2 p-3 text-center bg-pink-100 text-brand rounded-lg">
            <p className="font-semibold">Summer Sale - Limited stock available!</p>
        </div>

        <div className="text-center my-2">
            <p className="font-semibold text-muted-foreground tracking-widest text-sm uppercase">OFERTA POR TEMPO LIMITADO</p>
        </div>

        <div className="space-y-3">
            {offers.map((offer) => (
                <div 
                    key={offer.id} 
                    className={cn(
                        "border rounded-lg p-3 relative cursor-pointer transition-all flex items-center gap-4", 
                        selectedOfferId === offer.id ? "border-brand border-2 bg-brand/5" : "border-gray-200 bg-gray-50 hover:border-gray-400"
                    )}
                    onClick={() => setSelectedOfferId(offer.id)}
                >
                    {offer.isPopular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Mais Populares</div>}
                    {offer.freeGift && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">+1 FREE GIFT</div>}
                    
                    <NextImage src={offer.image} alt={offer.quantity} width={48} height={48} />

                    <div className="flex-1">
                        <p className="font-bold text-base">{offer.quantity}</p>
                        <p className="text-sm text-muted-foreground">{offer.supply}</p>
                    </div>
                    <div className="text-center mx-4">
                        <span className="bg-brand text-brand-foreground text-xs font-bold px-2 py-1 rounded-md">{offer.save}</span>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg">{offer.price}</p>
                        <p className="text-sm text-muted-foreground line-through">{offer.originalPrice}</p>
                    </div>
                </div>
            ))}
        </div>
        <Button 
            onClick={handleAddToCart}
            className="w-full h-[49px] bg-black hover:bg-gray-800 text-white text-lg font-bold mt-4"
            style={{ maxWidth: '370px', margin: '1rem auto 0' }}
        >
            ADICIONAR AO CARRINHO
        </Button>
    </div>
  )
}
