import NextImage from 'next/image'

export function DermatologistTestimonial() {
  return (
    <div className="mt-8 p-4 border-t">
      <div className="flex items-start gap-4">
        <NextImage
          src="/placeholder.svg?height=80&width=80"
          alt="Dr. Emily Sutherland"
          width={80}
          height={80}
          className="rounded-full object-cover flex-shrink-0 mt-1"
        />
        <div>
          <p className="text-muted-foreground italic text-base leading-relaxed">
            "As a dermatologist specializing in skin aging and barrier repair, I often see patients struggling with loss of elasticity, dehydration, and fine lines—especially as collagen production declines with age. I've reviewed the Anti-Wrinkle Collagen Mask, and <span className="font-bold text-foreground">I'm genuinely impressed</span> by its formulation and results."
          </p>
          <p className="mt-4 font-semibold text-sm text-foreground">
            Dr. Emily Sutherland, Dermatologist
          </p>
        </div>
      </div>
    </div>
  )
}
