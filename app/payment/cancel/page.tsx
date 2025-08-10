import { XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
      <XCircle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-3xl font-bold font-lora mb-2">Payment Canceled</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Your order was not processed and you have not been charged. Please try again or contact support if you are
        having trouble.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/cart">Back to Cart</Link>
        </Button>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}
