"use client"

import { useState } from "react"
import { Menu, Search, ShoppingBag, X, User } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { AnimatePresence, motion } from "framer-motion"
import { CartDrawer } from "@/components/cart-drawer"
import { AuthModal } from "@/components/auth-modal"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Skincare", href: "/skincare" },
  { name: "Zylumia Essence", href: "/zylumia-essence" },
  { name: "Connected to You", href: "/connected-to-you" },
  { name: "Reviews", href: "/#reviews" },
  { name: "Features", href: "/#features" },
  { name: "FAQ", href: "/#faq" },
]

const offers = [
  { id: 1, quantity: "4 Masks", supply: "1 Month Supply", price: "£21.95" },
  { id: 2, quantity: "8 Masks", supply: "2 Month Supply", price: "£30.95" },
  { id: 3, quantity: "12 Masks", supply: "3 Month Supply", price: "£38.95" },
  { id: 4, quantity: "16 Masks", supply: "4 Month Supply", price: "£48.95" },
  { id: 5, quantity: "24 Masks", supply: "6 Month Supply", price: "£65.95" },
]

export default function SiteHeader() {
  const { getCartTotalItems, openCartDrawer } = useCart()
  const { user, logout } = useAuth()
  const totalItems = getCartTotalItems()
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false)
  const [isAuthOpen, setAuthOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOffers = offers.filter(
    (offer) =>
      offer.quantity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.supply.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex flex-1 items-center justify-start space-x-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Open search"
            >
              <Search className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <Link href="/" className="flex items-center space-x-2" aria-label="Zylumia homepage">
              <span className="font-lora text-2xl font-bold tracking-wider">ZYLUMIA</span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-2">
            {user ? (
              <div className="relative group">
                <button
                  className="p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="User account"
                >
                  <User className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label="Sign in"
              >
                <User className="h-6 w-6" aria-hidden="true" />
              </button>
            )}

            <button
              onClick={openCartDrawer}
              className="relative p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingBag className="h-6 w-6" aria-hidden="true" />
              {totalItems > 0 && (
                <span
                  className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                  aria-label={`${totalItems} items in cart`}
                >
                  {totalItems}
                </span>
              )}
            </button>
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
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-full max-w-xs bg-background z-50 p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="sidebar-title"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 id="sidebar-title" className="font-lora text-2xl font-bold">
                  Menu
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <nav role="navigation" aria-label="Main navigation">
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className="text-lg hover:text-brand transition-colors block py-2 min-h-[48px] flex items-center"
                      >
                        {link.name}
                      </Link>
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="w-full max-w-lg bg-background rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex items-center gap-2">
                <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <label htmlFor="search-input" className="sr-only">
                  Search for products
                </label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {searchQuery &&
                  (filteredOffers.length > 0 ? (
                    <ul className="space-y-2" role="list">
                      {filteredOffers.map((offer) => (
                        <li key={offer.id} className="p-2 hover:bg-muted rounded-md">
                          <Link
                            href="/#product-details"
                            onClick={() => setSearchOpen(false)}
                            className="block min-h-[48px] flex flex-col justify-center"
                          >
                            <p className="font-semibold">{offer.quantity}</p>
                            <p className="text-sm text-muted-foreground">
                              {offer.supply} - {offer.price}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted-foreground">No products found.</p>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />

      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
