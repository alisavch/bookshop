import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

    function setCartItem(cart) {
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }

    const updateItemQty = (itemId, qty) => {
        const updatedCart = cart.map(item =>
            item.id === itemId ? { ...item, qty } : item
        );
        setCart(updatedCart);
        setCartItem(updatedCart);
    };

    const removeItem = (itemId) => {
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
        setCartItem(updatedCart);
    };

    const addItem = (item) => {
        const itemExists = cart.some(cartItem => cartItem.id === item.id);
        if (!itemExists && item.saleInfo.listPrice.amount !== 0) {
            const updatedCart = [...cart, { ...item, qty: 1 }];
            setCart(updatedCart);
            setCartItem(updatedCart);
        }
    };

    const getCartItemCount = () => cart.length;

    const getCartAmount = () => {
        let totalAmount = 0;
        cart.forEach(item => {
            totalAmount += item.saleInfo.listPrice.amount * item.qty;
        });
        
        return totalAmount.toFixed(2);
    };

    const contextValue = {
        cart, 
        updateItemQty, 
        removeItem, 
        addItem, 
        getCartItemCount, 
        getCartAmount
    };

    return (
        <CartContext.Provider value={contextValue}>
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