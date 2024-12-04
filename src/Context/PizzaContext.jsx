import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState, useEffect } from 'react';
import SpinPage from '../components/Spin/SpinPage';

export const PizzaContext = createContext();


const fetchPizzas = async () => {
    const response = await fetch('http://127.0.0.1:3000/pizzas', {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const res = await response.json();
    console.log('The result of response is ', res);
    return res;
};

export default function PizzaContextComp({ children }) {
    const { data: dataPizza, error: errorPizza, isLoading: isLoadingPizza } = useQuery({ queryKey: ['pizzas'], queryFn: fetchPizzas });
    const [pizza, setPizza] = useState([]);
    useEffect(() => {
        if (dataPizza !== undefined) {
            setPizza(dataPizza);
            console.log('dataPizza is setted To the pizza')
        }
    });

    if (isLoadingPizza) {
        return <div className='w-full h-screen flex items-center justify-center'>
            <SpinPage/>
            </div>; // Or any loading indicator you want
    }

    if (errorPizza) {
        return <div>Error: {errorPizza.message}</div>;
    }

    return (
        <PizzaContext.Provider value={{ dataPizza, setPizza, isLoadingPizza }}>
            {children}
        </PizzaContext.Provider>
    )
}
