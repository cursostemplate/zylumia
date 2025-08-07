'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Offer {
  id: number;
  quantity: string;
  supply: string;
  save: string;
  price: string;
  originalPrice: string;
  image: string;
  isPopular: boolean;
  freeGift: boolean;
}

interface CartItem extends Offer {
  quantityInCart: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Offer) => void;
  getCartTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Offer) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        // Se o item já existe, talvez você queira aumentar a quantidade
        // Por enquanto, vamos apenas garantir que ele esteja lá.
        return prevItems;
      }
      // Adiciona o novo item
      return [...prevItems, { ...item, quantityInCart: 1 }];
    });
  };

  const getCartTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantityInCart, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getCartTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
