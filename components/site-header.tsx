'use client'

import { Menu, Search, User, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/contexts/cart-context'

export default function SiteHeader() {
  const { getCartTotalItems } = useCart();
  const totalItems = getCartTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-start space-x-4">
          <button className="p-2">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </button>
          <button className="p-2">
            <Search className="h-6 w-6" />
            <span className="sr-only">Pesquisar</span>
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-lora text-2xl font-bold tracking-wider">
              ZYLUMIA
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <button className="p-2">
            <User className="h-6 w-6" />
            <span className="sr-only">Conta de usuário</span>
          </button>
          <Link href="/cart" className="relative p-2">
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
            <span className="sr-only">Carrinho de compras</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
