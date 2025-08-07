'use client'

import { useCart } from '@/contexts/cart-context'
import NextImage from 'next/image'
import { Button } from '@/components/ui/button'
import SiteHeader from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function CartPage() {
  const { cartItems } = useCart()

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('£', ''));
    return acc + price * item.quantityInCart;
  }, 0);

  const shipping = 5.00; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-lora mb-8">Seu Carrinho</h1>
        {cartItems.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 border p-4 rounded-lg">
                  <NextImage src={item.image} alt={item.quantity} width={80} height={80} className="rounded-md" />
                  <div className="flex-grow">
                    <h2 className="font-bold">{item.quantity}</h2>
                    <p className="text-sm text-muted-foreground">{item.supply}</p>
                  </div>
                  <p className="font-bold text-lg">{item.price}</p>
                </div>
              ))}
            </div>
            <div className="md:col-span-1">
              <div className="border p-4 rounded-lg space-y-4">
                <h2 className="text-xl font-bold">Resumo do Pedido</h2>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>£{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-brand hover:bg-brand/90 text-brand-foreground">Finalizar Compra</Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
