import { Star, CheckCircle2 } from 'lucide-react'
import { cn } from "@/lib/utils"

const benefits = [
    "Collagen Boost for your skin",
    "Instant glow after 1 mask a week",
    "Helps reducing acne and bad skin",
    "Smooths wrinkles & fine lines in days",
    "Trusted Korean Beauty Formula"
]

const offers = [
    {
        quantity: "4 Masks",
        supply: "1 Month Supply",
        save: "SAVE 28%",
        price: "£21.95",
        originalPrice: "£34.95",
        isPopular: false,
        freeGift: false,
    },
    {
        quantity: "8 Masks",
        supply: "2 Month Supply",
        save: "SAVE 56%",
        price: "£30.95",
        originalPrice: "£69.90",
        isPopular: false,
        freeGift: false,
    },
    {
        quantity: "12 Masks",
        supply: "3 Month Supply",
        save: "SAVE 62%",
        price: "£38.95",
        originalPrice: "£104.85",
        isPopular: true,
        freeGift: false,
    },
    {
        quantity: "16 Masks",
        supply: "4 Month Supply",
        save: "SAVE 66%",
        price: "£48.95",
        originalPrice: "£139.80",
        isPopular: false,
        freeGift: true,
    }
]

export function ProductDetails() {
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
            <p className="font-semibold text-muted-foreground tracking-widest text-sm">LIMITED TIME OFFER</p>
        </div>

        <div className="space-y-3">
            {offers.map((offer, i) => (
                <div key={i} className={cn("border-2 rounded-lg p-4 relative cursor-pointer transition-all hover:border-brand", offer.isPopular ? "border-brand" : "border-gray-200")}>
                    {offer.isPopular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
                    {offer.freeGift && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">+1 FREE GIFT</div>}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-lg">{offer.quantity}</p>
                            <p className="text-sm text-muted-foreground">{offer.supply}</p>
                        </div>
                        <div className="text-center">
                            <span className="bg-brand text-brand-foreground text-xs font-bold px-2 py-1 rounded-md">{offer.save}</span>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg">{offer.price}</p>
                            <p className="text-sm text-muted-foreground line-through">{offer.originalPrice}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
