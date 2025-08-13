import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Home, ArrowLeft, ShoppingBag } from "lucide-react"
import SiteHeader from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"

// Metadata otimizada para SEO
export const metadata: Metadata = {
  title: "404 - Page Not Found | Zylumia",
  description: "The page you're looking for doesn't exist. Browse our premium collagen masks and skincare products.",
  robots: "noindex, nofollow", // Não indexar páginas 404
  alternates: {
    canonical: "https://zylumia.com/", // Canonical para homepage
  },
}

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center bg-background">
        <div className="container px-4 py-16 text-center">
          <div className="max-w-2xl mx-auto">
            {/* Número 404 grande */}
            <h1 className="text-9xl font-bold text-brand/20 mb-4 font-lora">404</h1>

            {/* Título principal */}
            <h2 className="text-3xl md:text-4xl font-bold font-lora mb-4 text-foreground">Oops! Page Not Found</h2>

            {/* Descrição */}
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Don't worry, let's get you back on track to
              discover our amazing collagen masks!
            </p>

            {/* Barra de busca */}
            <div className="flex gap-2 max-w-md mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input type="text" placeholder="Search for collagen masks..." className="pl-10" />
              </div>
              <Button
                variant="outline"
                className="border-brand text-brand hover:bg-brand hover:text-brand-foreground bg-transparent"
              >
                Search
              </Button>
            </div>

            {/* Botões de ação principais */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-brand hover:bg-brand/90 text-brand-foreground">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-brand text-brand hover:bg-brand hover:text-brand-foreground bg-transparent"
              >
                <Link href="/cart">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Cart
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="javascript:history.back()">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
            </div>

            {/* Links populares */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold mb-6 font-lora">Popular Pages</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Link
                  href="/#reviews"
                  className="p-4 border rounded-lg hover:border-brand hover:bg-brand/5 transition-colors group"
                >
                  <h4 className="font-semibold text-brand group-hover:text-brand/80">Customer Reviews</h4>
                  <p className="text-sm text-muted-foreground mt-1">See what our customers say</p>
                </Link>
                <Link
                  href="/#features"
                  className="p-4 border rounded-lg hover:border-brand hover:bg-brand/5 transition-colors group"
                >
                  <h4 className="font-semibold text-brand group-hover:text-brand/80">Product Features</h4>
                  <p className="text-sm text-muted-foreground mt-1">Learn about our collagen masks</p>
                </Link>
                <Link
                  href="/#faq"
                  className="p-4 border rounded-lg hover:border-brand hover:bg-brand/5 transition-colors group"
                >
                  <h4 className="font-semibold text-brand group-hover:text-brand/80">FAQ</h4>
                  <p className="text-sm text-muted-foreground mt-1">Find answers to common questions</p>
                </Link>
              </div>
            </div>

            {/* Informação adicional */}
            <div className="mt-8 p-4 bg-brand/5 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Need help? Contact us at{" "}
                <a href="mailto:zylumiaa@gmail.com" className="text-brand hover:underline font-semibold">
                  zylumiaa@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
