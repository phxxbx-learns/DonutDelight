import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1, size = 'Regular') => {
    const existingItem = cartItems.find(item => 
      item.id === product.id && item.size === size
    );

    if (existingItem) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems(prevItems => [
        ...prevItems,
        {
          ...product,
          quantity,
          size,
          cartId: `${product.id}-${size}-${Date.now()}`
        }
      ]);
    }
  };

  const updateCartItem = (cartId, quantity) => {
    if (quantity === 0) {
      removeFromCart(cartId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.cartId === cartId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};