"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

export interface Offer {
  id: number
  quantity: string
  supply: string
  save: string
  price: string
  originalPrice: string
  image: string
  isPopular: boolean
  freeGift: boolean
  priceId: string
}

export interface CartItem extends Offer {
  quantityInCart: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Offer) => void
  removeFromCart: (itemId: number) => void
  updateQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  getCartTotalItems: () => number
  isCartDrawerOpen: boolean
  openCartDrawer: () => void
  closeCartDrawer: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const [shippingProtection, setShippingProtection] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user?.id) {
      loadCartFromFirebase(user.id)
    }
  }, [user?.id])

  useEffect(() => {
    if (user?.id && cartItems.length > 0) {
      saveCartToFirebase()
    }
  }, [cartItems, shippingProtection, user?.id])

  const loadCartFromFirebase = async (userId: string) => {
    try {
      console.log("[v0] Loading cart from Firebase...")
      const response = await fetch("/api/cart/load", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json()
      if (data.success && data.cart) {
        console.log("[v0] Cart loaded:", data.cart.items?.length || 0, "items")
        setCartItems(data.cart.items || [])
        setShippingProtection(data.cart.shippingProtection || false)
      }
    } catch (error) {
      console.error("[v0] Error loading cart:", error)
    }
  }

  const saveCartToFirebase = async () => {
    if (!user?.id) return

    try {
      console.log("[v0] Saving cart to Firebase...")
      await fetch("/api/cart/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          cartItems,
          shippingProtection,
        }),
      })
      console.log("[v0] Cart saved successfully")
    } catch (error) {
      console.error("[v0] Error saving cart:", error)
    }
  }

  const addToCart = (item: Offer) => {
    setCartItems([{ ...item, quantityInCart: 1 }])
    setIsCartDrawerOpen(true)

    fetch("/api/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "add_to_cart",
        productId: item.id,
        productName: item.quantity,
        price: item.price,
        timestamp: Date.now(),
        userId: user?.id || "guest",
      }),
    }).catch((err) => console.error("Failed to track add to cart:", err))
  }

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, quantityInCart: quantity } : item)),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantityInCart, 0)
  }

  const openCartDrawer = () => setIsCartDrawerOpen(true)
  const closeCartDrawer = () => setIsCartDrawerOpen(false)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotalItems,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
