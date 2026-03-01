import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'area-coffee-cart';

function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = (item) => {
    const cartItem = {
      ...item,
      id: item.id || `cart-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };
    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.productId === cartItem.productId &&
          p.size?.id === cartItem.size?.id &&
          p.sugar === cartItem.sugar
      );
      if (existing) {
        return prev.map((p) =>
          p.id === existing.id
            ? { ...p, quantity: p.quantity + (cartItem.quantity || 1) }
            : p
        );
      }
      return [...prev, { ...cartItem, quantity: cartItem.quantity || 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () =>
    cart.reduce(
      (sum, item) =>
        sum + (item.price + (item.size?.priceAdd || 0)) * item.quantity,
      0
    );

  const getCartCount = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
