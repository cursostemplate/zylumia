"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

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
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: Offer) => {
    setCartItems([{ ...item, quantityInCart: 1 }])
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotalItems,
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
