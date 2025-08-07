import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-lora text-2xl font-bold">Zylumia</h3>
            <p className="mt-4 text-muted-foreground">
              At Zylumia, we specialize in a single, high-performance skincare solution powered by advanced technology. Our expertly formulated mask is designed to nourish, hydrate, and restore confidence—helping you achieve luminous, healthy skin with every use.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-lora text-xl font-bold">Quick links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy policy</Link></li>
              <li><Link href="/shipping-policy" className="text-muted-foreground hover:text-primary">Shipping & delivery policy</Link></li>
              <li><Link href="/refund-policy" className="text-muted-foreground hover:text-primary">Refunds & Payments</Link></li>
              <li><Link href="/terms-and-conditions" className="text-muted-foreground hover:text-primary">Terms and Conditions</Link></li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-lora text-xl font-bold">Subscribe to our emails</h3>
            <p className="mt-4 text-muted-foreground">Join our email list for exclusive offers and the latest news.</p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Email" className="flex-grow" />
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-brand-foreground">Sign up</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zylumia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
