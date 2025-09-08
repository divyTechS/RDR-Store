import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data || { items: [] });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch cart');
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await api.post('/cart/add', { productId, quantity });
      setCart(res.data);
      toast.success('Added to cart');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await api.post('/cart/remove', { productId });
      setCart(res.data);
      toast.success('Removed from cart');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove from cart');
    }
  };

  const clearCart = async () => {
    try {
      await api.post('/cart/clear');
      setCart({ items: [] });
      toast.success('Cart cleared');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to clear cart');
    }
  };
  const updateQuantity = async (productId, quantity) => {
  try {
    const res = await api.post('/cart/update', { productId, quantity });
    setCart(res.data);
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to update quantity');
  }
};


  useEffect(() => { fetchCart(); }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, fetchCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
