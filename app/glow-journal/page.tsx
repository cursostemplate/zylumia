import SiteHeader from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export default function GlowJournalPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#7d1f3e] to-[#5a1428] py-12 text-center text-white">
        <div className="container max-w-4xl">
          <h1 className="font-lora text-4xl md:text-5xl font-bold mb-4">EARLY BLACK FRIDAY SALE</h1>
          <p className="text-2xl md:text-3xl font-semibold mb-2">UP TO 75% OFF SITEWIDE</p>
          <p className="text-lg mb-6">Don't miss our biggest sale of the year! 💝</p>
          <Button asChild className="bg-white text-[#7d1f3e] hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
            <Link href="/skincare">CHECK AVAILABILITY</Link>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="container max-w-4xl py-16 px-4">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h2 className="font-lora text-3xl md:text-4xl font-bold mb-6">
            Discover why 15,000+ women switched from trendy beauty products to our affordable Collagen Gel Mask for
            Youthful and Glowing Skin
          </h2>

          {/* Magazine Logos */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 opacity-70">
            <span className="font-serif text-xl">BAZAAR</span>
            <span className="font-serif text-xl">ELLE</span>
            <span className="font-sans text-xl font-bold">COSMOPOLITAN</span>
            <span className="font-serif text-xl italic">VOGUE</span>
            <span className="font-serif text-xl lowercase">allure</span>
          </div>

          {/* Author */}
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div className="text-left">
              <p className="font-semibold text-foreground">Lana Stevenson</p>
              <p>Last Updated September 24, 2025</p>
            </div>
          </div>
        </div>

        {/* Benefit Sections */}
        <div className="space-y-20">
          {/* Section 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
              <p className="text-muted-foreground">Product Image</p>
            </div>
            <div>
              <h3 className="font-lora text-2xl font-bold mb-4">1. Affordable Skin Transformation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Who says glowing skin has to be expensive? The right products can transform your complexion without
                breaking the bank. With high-end skincare often costing hundreds, finding an effective yet affordable
                alternative has never been easier.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
              <p className="text-muted-foreground">Before & After Image</p>
            </div>
            <div>
              <h3 className="font-lora text-2xl font-bold mb-4">2. Scientifically Proven Ingredients</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You know, when it comes to skincare, it's all about knowing what's actually in the products you're
                using. I was honestly stunned to find that this gel mask contains{" "}
                <strong className="text-foreground">marine collagen that works wonders for your skin</strong>. It helps
                regenerate your skin, improve elasticity, and reduce the appearance of fine lines—making your skin look
                healthy and radiant. Trust me, it makes a huge difference!
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center py-8">
            <Button asChild className="bg-[#7d1f3e] hover:bg-[#5a1428] text-white font-semibold px-12 py-6 text-lg">
              <Link href="/skincare">SHOP NOW</Link>
            </Button>
          </div>

          {/* Section 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
              <p className="text-muted-foreground">Radiance Image</p>
            </div>
            <div>
              <h3 className="font-lora text-2xl font-bold mb-4">3. Deep Hydration & Radiance</h3>
              <p className="text-muted-foreground leading-relaxed">
                As we get older, our skin definitely needs more love. I've noticed my skin craves extra hydration to{" "}
                <strong className="text-foreground">stay plump and healthy-looking</strong>. The collagen gel mask
                delivers intense moisture with every use, giving you that dewy, youthful glow. Plus, at its affordable
                price point, you can use it as often as you need without worrying about the cost. Trust me, I keep my
                skin looking dewy and healthy, even after a long day!
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
              <p className="text-muted-foreground">Sensitive Skin Image</p>
            </div>
            <div>
              <h3 className="font-lora text-2xl font-bold mb-4">4. Sensitive Skin Friendly</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you have <strong className="text-foreground">sensitive skin</strong> like me, finding products that
                don't irritate can be tough. That's why I'm excited about this mask—it's made with{" "}
                <strong className="text-foreground">all-natural ingredients</strong> that are gentle on your skin. No
                harsh chemicals here! It soothes and nourishes, especially those with sensitive skin. Here's the best
                part: it goes down from <strong className="text-foreground">£40 to just £21.95!</strong> That's a total{" "}
                <strong className="text-foreground">game-changer</strong>!
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
              <p className="text-muted-foreground">Celebrity Image</p>
            </div>
            <div>
              <h3 className="font-lora text-2xl font-bold mb-4">5. Celebrity-Favorite</h3>
              <p className="text-muted-foreground leading-relaxed">
                Want to feel a bit like a <strong className="text-foreground">celebrity favorite</strong>? I know so
                myself and some friends of mine who use this mask, and they swear by it! It's not just about the natural
                ingredients, but the <strong className="text-foreground">amazing results</strong>. People are raving
                about it, and for good reason. The best part? It's not limited to a select few; it helps{" "}
                <strong className="text-foreground">
                  hydrate, plumps, and leaves your skin looking flawless, youthful glow
                </strong>
                , and the best part it's a good enough gift for your loved ones.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center py-8">
            <Button asChild className="bg-[#7d1f3e] hover:bg-[#5a1428] text-white font-semibold px-12 py-6 text-lg">
              <Link href="/skincare">SHOP NOW</Link>
            </Button>
          </div>

          {/* Section 6 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
              <p className="text-muted-foreground">Thermal Image</p>
            </div>
            <div>
              <h3 className="font-lora text-2xl font-bold mb-4">6. Cooling & Soothing Effect</h3>
              <p className="text-muted-foreground leading-relaxed">
                I absolutely love that <strong className="text-foreground">refreshing, cooling feeling</strong> I get
                from a skincare product—it's one of my favorite things! The gel mask gives you{" "}
                <strong className="text-foreground">that exact instant cooling effect</strong> even when you're just
                relaxing at home. It soothes, hydrates, and calms your skin in a simple,{" "}
                <strong className="text-foreground">luxurious way</strong> to unwind and take care of yourself if you
                haven't already! Plus, it's super affordable!
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
              <p className="text-muted-foreground">Sale Image</p>
            </div>
            <div>
              <h3 className="font-lora text-2xl font-bold mb-4">7. Our Biggest Black Friday Sale is LIVE!</h3>
              <p className="text-muted-foreground leading-relaxed">
                Here's the exciting part—we're in luck. Our{" "}
                <strong className="text-foreground">Black Friday sale is on</strong> with{" "}
                <strong className="text-foreground">up to 75% off</strong>! Get this: we've seen sales like this only a
                few times a year, so this is your chance to stock up. And with a{" "}
                <strong className="text-foreground">60-day risk-free</strong> trial, so why not give it a try? You
                deserve glowing skin!
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="font-lora text-3xl md:text-4xl font-bold mb-4">
            Don't Wait! The Skin You Deserve is on Sale This Black Friday 💝 💝
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center my-12">
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
              <p className="text-muted-foreground">Product Package Image</p>
            </div>

            <div className="text-left space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Imagine waking up each morning to see smoother, firmer skin that makes you feel more confident than you
                have in years! With this Collagen Gel Mask, you can pamper your skin at an elite-level experience
                without paying elite prices. And if you're right: This is what Minas can do for you every time you use
                it.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#7d1f3e] flex-shrink-0 mt-0.5" />
                  <span>Visible & Lasting Results</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#7d1f3e] flex-shrink-0 mt-0.5" />
                  <span>Instant Glow In 1-3 Uses</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#7d1f3e] flex-shrink-0 mt-0.5" />
                  <span>Family vs. Wedding bias</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#7d1f3e] flex-shrink-0 mt-0.5" />
                  <span>Not tested Price at the Time</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#7d1f3e] flex-shrink-0 mt-0.5" />
                  <span>A 60-Day, Totally Risk-Free Guarantee</span>
                </li>
              </ul>

              {/* Magazine Logos */}
              <div className="flex flex-wrap items-center gap-4 pt-4 opacity-70">
                <span className="font-serif text-sm">BAZAAR</span>
                <span className="font-serif text-sm">ELLE</span>
                <span className="font-sans text-sm font-bold">COSMOPOLITAN</span>
                <span className="font-serif text-sm italic">VOGUE</span>
                <span className="font-serif text-sm lowercase">allure</span>
              </div>
            </div>
          </div>

          <Button asChild className="bg-[#7d1f3e] hover:bg-[#5a1428] text-white font-semibold px-16 py-7 text-xl">
            <Link href="/skincare">SHOP NOW</Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-20">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 ZYLUMIA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
