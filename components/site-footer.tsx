import { PolicyModal } from "@/components/policy-modal"
import { PrivacyPolicyContent } from "@/components/policies/privacy-policy"
import { ShippingPolicyContent } from "@/components/policies/shipping-policy"
import { RefundPolicyContent } from "@/components/policies/refund-policy"
import { TermsConditionsContent } from "@/components/policies/terms-conditions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import NextImage from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-lora text-2xl font-bold">Zylumia</h3>
            <p className="mt-4 text-muted-foreground">
              At Zylumia, we specialize in a single, high-performance skincare solution powered by advanced technology.
              Our expertly formulated mask is designed to nourish, hydrate, and restore confidence—helping you achieve
              luminous, healthy skin with every use.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-lora text-xl font-bold">Quick links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <PolicyModal triggerText="Privacy policy" title="Privacy Policy">
                  <PrivacyPolicyContent />
                </PolicyModal>
              </li>
              <li>
                <PolicyModal triggerText="Shipping & delivery policy" title="Shipping & Delivery Policy">
                  <ShippingPolicyContent />
                </PolicyModal>
              </li>
              <li>
                <PolicyModal triggerText="Refunds & Payments" title="Refunds & Payments Policy">
                  <RefundPolicyContent />
                </PolicyModal>
              </li>
              <li>
                <PolicyModal triggerText="Terms and Conditions" title="Terms and Conditions">
                  <TermsConditionsContent />
                </PolicyModal>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-lora text-xl font-bold">Subscribe to our emails</h3>
            <p className="mt-4 text-muted-foreground">Join our email list for exclusive offers and the latest news.</p>

            {/* Layout Unificado - Email e Payment Icons sempre em coluna */}
            <form className="mt-4 flex flex-col gap-2">
              <Input type="email" placeholder="Email" className="flex-grow" />
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-brand-foreground">
                Sign up
              </Button>
            </form>

            {/* Payment Icons abaixo do botão - mesma largura */}
            <div className="mt-3">
              <NextImage
                src="/payment-icons.webp"
                alt="Secure payment methods"
                width={200}
                height={32}
                className="object-contain w-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zylumia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
