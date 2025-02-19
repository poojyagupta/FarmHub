import React, { createContext, useContext, useState } from 'react';

// Create a new context for the cart
const CartContext = createContext();

// CartProvider component that wraps our app and provides cart functionality
export const CartProvider = ({ children }) => {
  // State for storing cart items
  const [cart, setCart] = useState([]);
  // State for controlling cart sidebar visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart(currentCart => {
      // Check if the product is already in the cart
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // If product exists, increase its quantity
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If product is new, add it with quantity 1
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  // Function to update the quantity of a product
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Prevent negative quantities
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Calculate the total price of items in the cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      // Remove commas from price string and convert to number
      return total + (parseFloat(item.price.replace(/,/g, '')) * item.quantity);
    }, 0);
  };

  // Get the total number of items in the cart
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Provide the cart context to children components
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartCount,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};