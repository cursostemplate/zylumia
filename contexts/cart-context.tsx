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
  priceId: string // ID do Preço da Stripe
}

export interface CartItem extends Offer {
  quantityInCart: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Offer) => void
  getCartTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: Offer) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        // Se o item já existe, aumenta a quantidade
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantityInCart: cartItem.quantityInCart + 1 } : cartItem,
        )
      }
      // Adiciona o novo item
      return [...prevItems, { ...item, quantityInCart: 1 }]
    })
  }

  const getCartTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantityInCart, 0)
  }

  return <CartContext.Provider value={{ cartItems, addToCart, getCartTotalItems }}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
