import NextImage from "next/image"

const featuresData = [
  {
    title: "Minimizing Fine Lines and Wrinkles",
    description:
      "Remember the feeling of touching your face and sensing smooth, firm skin? It can come back. Specially formulated for women who refuse to settle for what the mirror shows, this revolutionary treatment with hydrolyzed collagen and regenerative peptides targets the root causes of aging. Microencapsulation technology ensures that the active ingredients work for up to 12 hours after application, filling in wrinkles and restoring skin density. Rediscover the pleasure of looking in the mirror and loving what you see.",
    image: "https://i.postimg.cc/FKgJVnZT/Retrato-suave-e-sorridente-com-toque-delicado-1-1.webp",
  },
  {
    title: "The Korean Skincare Secret",
    description:
      "There's a reason why Asian women are globally admired for their flawless skin. The secret isn't in their genes—it's in science. Our concentrated essence combines pure hyaluronic acid, red ginseng extract, and ceramides, bringing the ancient Korean beauty ritual into a single, modern product. Overnight, the active ingredients work intensively to repair cellular damage and boost natural skin renewal. Wake up each morning with that healthy glow that makes people ask what your secret is.",
    image: "https://i.postimg.cc/bwDn5nmc/Chat-GPT-Image-7-08-2025-22-42-10.webp",
  },
  {
    title: "Made for All Skin Types",
    description:
      'Your skin is unique—your skincare should be too. Developed with adaptogenic technology, this product breaks the "one-size-fits-all" barrier that never really worked for anyone. Powered by pure botanical extracts, our smart formula adapts to your skin\'s specific needs: it controls excess oil, delivers deep hydration, or soothes irritation. Dermatologically tested for all skin types, including the most sensitive.',
    image: "https://i.postimg.cc/L5JnN4Hm/f9dc3667-ff40-41c6-9c65-c6e15dac1b08.webp",
  },
  {
    title: "Busy? Let Your Skin Recharge!",
    description:
      "Busy days, work, family, a thousand responsibilities... so when is there time left for self-care? Our Korean hydrogel mask works on autopilot while you go about your life. Apply it before bed and let the controlled-release technology do the heavy lifting—restoring up to 3 months of stress-induced damage in a single night. Because women who make things happen deserve skin that impresses—without having to stop the world to take care of it.",
    image: "https://i.postimg.cc/Fs4yVR1h/d0718d73-16b8-4589-a9fd-785625979bce.webp",
  },
  {
    title: "Visible Results After Just One Use",
    description:
      "How many times have you bought a product only to wait weeks for visible results? No more empty promises. This concentrate with encapsulated retinol microspheres works at the speed of your impatience, delivering real transformation in real time. In just 24 hours, you'll notice refined pores, smoother texture, and that natural glow that makes all the difference. Clinically proven results from the very first application.",
    image: "https://i.postimg.cc/BbDRRTCt/screenshot-20250807170513.jpg",
  },
]

export function ProductFeatures() {
  return (
    <section className="w-full py-8 md:py-16 bg-gray-50/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold font-lora tracking-tighter sm:text-4xl text-brand">
            Your Journey to Dream Skin
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Discover how our advanced collagen mask transforms your skin with every use
          </p>
        </div>
        <div className="space-y-8 md:space-y-24">
          {featuresData.map((feature, index) => (
            <div key={index} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className={`flex flex-col justify-center space-y-4 ${index % 2 !== 0 ? "lg:order-last" : ""}`}>
                <h3 className="text-3xl font-bold font-lora tracking-tighter text-brand">{feature.title}</h3>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {feature.description}
                </p>
              </div>
              <NextImage
                src={feature.image}
                alt={feature.title}
                width={360}
                height={360}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
