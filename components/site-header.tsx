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
  { name: "Glow Journal", href: "/glow-journal" },
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
      <header className="sticky top-0 z-50 w-full border-b border-blush-200/50 bg-cream-100/95 backdrop-blur-md supports-[backdrop-filter]:bg-cream-100/80">
        <div className="container flex h-16 items-center">
          <div className="flex flex-1 items-center justify-start space-x-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-blush-100 rounded-full transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5 text-charcoal" aria-hidden="true" />
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-blush-100 rounded-full transition-colors"
              aria-label="Open search"
            >
              <Search className="h-5 w-5 text-charcoal" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <Link href="/" className="flex items-center space-x-2" aria-label="Zylumia homepage">
              <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wide text-charcoal">ZYLUMIA</span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-1">
            {user ? (
              <div className="relative group">
                <button
                  className="p-2 min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-blush-100 rounded-full transition-colors"
                  aria-label="User account"
                >
                  <User className="h-5 w-5 text-charcoal" aria-hidden="true" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-blush-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b border-blush-100">
                    <p className="font-medium text-sm text-charcoal">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-blush-50 transition-colors text-charcoal"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="p-2 min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-blush-100 rounded-full transition-colors"
                aria-label="Sign in"
              >
                <User className="h-5 w-5 text-charcoal" aria-hidden="true" />
              </button>
            )}

            <button
              onClick={openCartDrawer}
              className="relative p-2 min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-blush-100 rounded-full transition-colors"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingBag className="h-5 w-5 text-charcoal" aria-hidden="true" />
              {totalItems > 0 && (
                <span
                  className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blush-400 text-xs font-bold text-charcoal"
                  aria-label={`${totalItems} items in cart`}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-full max-w-xs bg-cream-100 z-50 p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="sidebar-title"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 id="sidebar-title" className="font-serif text-2xl font-semibold text-charcoal">
                  Menu
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-blush-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-charcoal" aria-hidden="true" />
                </button>
              </div>
              <nav role="navigation" aria-label="Main navigation">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <li key={link.name}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setSidebarOpen(false)}
                          className="text-lg text-charcoal hover:text-blush-500 transition-colors block py-3 min-h-[48px] flex items-center border-b border-blush-100"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20"
            onClick={() => setSearchOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-lg bg-cream-100 rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-blush-100 flex items-center gap-3">
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
                  className="w-full bg-transparent focus:outline-none text-charcoal placeholder:text-muted-foreground"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center hover:bg-blush-100 rounded-full transition-colors"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5 text-charcoal" aria-hidden="true" />
                </button>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {searchQuery &&
                  (filteredOffers.length > 0 ? (
                    <ul className="space-y-2" role="list">
                      {filteredOffers.map((offer) => (
                        <li key={offer.id} className="p-3 hover:bg-blush-50 rounded-lg transition-colors">
                          <Link
                            href="/#product-details"
                            onClick={() => setSearchOpen(false)}
                            className="block min-h-[48px] flex flex-col justify-center"
                          >
                            <p className="font-medium text-charcoal">{offer.quantity}</p>
                            <p className="text-sm text-muted-foreground">
                              {offer.supply} - {offer.price}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No products found.</p>
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
