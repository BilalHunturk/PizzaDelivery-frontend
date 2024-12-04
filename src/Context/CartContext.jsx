import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const getCartItems = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token provided. You need to log in first.');
        }

        const response = await fetch('http://127.0.0.1:3000/cartItems', {
            method:'GET',
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart items.');
        }

        const result = await response.json();
        console.log(result.cartItems);
        return result.cartItems || []; // Return cartItems or an empty array if not found
    } catch (error) {
        console.error('Error fetching cart items:', error.message);
        throw new Error('Error fetching cart items.');
    }
};

export default function CartContextComp({ children }) {
    const { data: dataCartItems, error: errorCartItem, isLoading: isLoadingCartItem } = useQuery({ queryKey: ['cartItems'], queryFn: getCartItems });
    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
        if (dataCartItems)
            setCartItems(dataCartItems);
    }, [dataCartItems]);

    console.log('CATCONTEXT RENDERED')
    return (
        <CartContext.Provider value={{ cartItems, setCartItems, isLoadingCartItem }}>
            {children}
        </CartContext.Provider>
    )
}
