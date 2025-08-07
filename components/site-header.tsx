'use client'

import { useState } from 'react'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/contexts/cart-context'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Reviews', href: '#reviews' },
  { name: 'Features', href: '#features' },
  { name: 'FAQ', href: '#faq' },
]

const offers = [
    { id: 1, quantity: "4 Masks", supply: "1 Month Supply", price: "£21.95" },
    { id: 2, quantity: "8 Masks", supply: "2 Month Supply", price: "£30.95" },
    { id: 3, quantity: "12 Masks", supply: "3 Month Supply", price: "£38.95" },
    { id: 4, quantity: "16 Masks", supply: "4 Month Supply", price: "£48.95" },
    { id: 5, quantity: "24 Masks", supply: "6 Month Supply", price: "£65.95" }
]

export default function SiteHeader() {
  const { getCartTotalItems } = useCart();
  const totalItems = getCartTotalItems();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOffers = offers.filter(offer => 
    offer.quantity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.supply.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex flex-1 items-center justify-start space-x-2">
            <button onClick={() => setSidebarOpen(true)} className="p-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </button>
            <button onClick={() => setSearchOpen(true)} className="p-2">
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

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-full max-w-xs bg-background z-50 p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-lora text-2xl font-bold">Menu</h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav>
                <ul className="space-y-4">
                  {navLinks.map(link => (
                    <li key={link.name}>
                      <a href={link.href} onClick={() => setSidebarOpen(false)} className="text-lg hover:text-brand transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="w-full max-w-lg bg-background rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex items-center gap-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {searchQuery && (
                  filteredOffers.length > 0 ? (
                    <ul className="space-y-2">
                      {filteredOffers.map(offer => (
                        <li key={offer.id} className="p-2 hover:bg-muted rounded-md">
                          <a href="#product-details" onClick={() => setSearchOpen(false)}>
                            <p className="font-semibold">{offer.quantity}</p>
                            <p className="text-sm text-muted-foreground">{offer.supply} - {offer.price}</p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted-foreground">No products found.</p>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
