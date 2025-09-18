"use client"

import SiteHeader from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ZylumiaEssencePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-grow bg-white">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-lora text-brand mb-6">Zylumia Essence</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Transmitting identity and authenticity through every product we create
              </p>

              {/* Instagram Link */}
              <div className="flex justify-center mb-12">
                <Button
                  asChild
                  variant="outline"
                  className="border-brand text-brand hover:bg-brand hover:text-white bg-transparent"
                >
                  <a
                    href="https://www.instagram.com/zylumiaa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="h-5 w-5" />
                    Follow us on Instagram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Zylumia Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-brand mb-6">About Zylumia</h2>
                  <h3 className="text-2xl font-bold text-brand mb-4">The Journey to Rediscover Confidence</h3>
                  <p className="text-lg leading-relaxed">
                    At Zylumia, we believe that skincare is more than just about appearance — it's about confidence,
                    renewal, and feeling like yourself again at every stage of life. Over the years, we've seen how the
                    natural aging process can affect not only the texture and radiance of the skin but also a woman's
                    self-esteem. Many of our clients shared the same frustration: despite years of care, their skin that
                    once felt smooth and firm gradually became dull, fragile, and visibly lined, especially on the neck
                    and arms. They tried countless creams, serums, and expensive department store products, but nothing
                    delivered results that lasted.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-brand mb-4">The Frustrating Search for Solutions</h3>
                  <p className="text-lg leading-relaxed">
                    We listened carefully. We realized it wasn't about chasing perfection, but about helping women feel
                    renewed, radiant, and confident in their own skin again. Most products on the market only mask the
                    symptoms — providing a quick boost of moisture that fades within hours — but they fail to address
                    the deeper causes of skin aging: the loss of collagen, decreased elasticity, slower cell renewal,
                    and a weakened skin barrier.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-brand mb-4">The Scientific Breakthrough</h3>
                  <p className="text-lg leading-relaxed">
                    That's why Zylumia was born. Our mission is to go beyond superficial fixes and create advanced
                    skincare solutions that work at the cellular level. After years of research, testing, and
                    formulation, we developed a unique blend of active ingredients designed to penetrate deeply,
                    stimulate collagen production, repair elasticity, and lock in lasting hydration. The result isn't
                    just temporary softness — it's true restoration.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-brand mb-4">The Birth of Zylumia</h3>
                  <p className="text-lg leading-relaxed">
                    We tested our formulas on ourselves first, and then with women who had struggled for years with the
                    same concerns. The transformation was undeniable: smoother texture, firmer skin, visible radiance,
                    and, most importantly, renewed confidence. For many, it meant finally wearing short sleeves again
                    without hesitation, or simply looking in the mirror and recognizing themselves with joy.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-brand mb-4">Our Promise to You</h3>
                  <p className="text-lg leading-relaxed">
                    At Zylumia, we go beyond empty promises. Our products are backed by science, formulated with
                    intelligent complexes that reinforce collagen and elastin, deep hydration technology that locks in
                    moisture for hours, and carefully selected ingredients that fight the signs of aging where they
                    truly begin. Every formula is clean, cruelty-free, and designed with real women in mind.
                  </p>
                  <p className="text-lg leading-relaxed mt-4">
                    We know how it feels to lose the glow and firmness of your skin — and we also know how
                    transformative it is to get it back. That's why Zylumia exists: to provide effective,
                    professional-grade skincare that delivers visible, lasting results without compromise. Because every
                    woman deserves to feel confident in her skin, at every age, in every stage of life.
                  </p>
                </div>

                <div className="bg-pink-50 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-brand mb-6">Join the Zylumia Movement</h3>
                  <p className="text-lg leading-relaxed mb-6">
                    Every day we hear stories from women who have transformed their skin — and their confidence — with
                    Zylumia:
                  </p>
                  <div className="space-y-4">
                    <p className="italic text-lg">
                      ✨ "Nothing worked until Zylumia. After just a few weeks, the skin on my neck and chest looked
                      visibly firmer and smoother. It truly gave me my confidence back." – Carolyn, 61
                    </p>
                    <p className="italic text-lg">
                      ✨ "At first, I was skeptical, but it changed everything. My skin is softer, more hydrated, and
                      firmer. I started wearing short sleeves again without hesitation." – Belinda, 56
                    </p>
                    <p className="italic text-lg">
                      ✨ "Menopause left my skin dry and tired. Now it glows. I feel like myself again — only better." –
                      Elaine, 59
                    </p>
                  </div>
                  <p className="text-lg leading-relaxed mt-6">
                    This is what drives us. This is why Zylumia exists. Because every woman deserves to feel radiant,
                    confident, and truly herself — in every age, at every stage.
                  </p>
                </div>

                <div className="text-center bg-brand/5 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-brand mb-4">Experience the Transformation</h3>
                  <p className="text-lg leading-relaxed mb-6">
                    Are you ready to stop hiding and start showing off skin that feels radiant, firm, and youthful
                    again?
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Zylumia is not just another skincare brand. It's the solution you've been waiting for — created to
                    deliver real results, not empty promises.
                  </p>
                  <div className="space-y-2 text-lg">
                    <p>✨ Professional-grade skincare made simple</p>
                    <p>✨ Clean, science-backed formulas that work</p>
                    <p>✨ Confidence you can see and feel in your own skin</p>
                  </div>
                  <p className="text-xl font-bold text-brand mt-6">
                    With Zylumia, skincare becomes simplified, and results are amplified.
                  </p>
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
