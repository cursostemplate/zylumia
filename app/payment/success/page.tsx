import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold font-lora mb-2">Payment Successful!</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Thank you for your order. A confirmation email has been sent to you. You can view your order details in your
        account.
      </p>
      <Button asChild>
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  )
}
