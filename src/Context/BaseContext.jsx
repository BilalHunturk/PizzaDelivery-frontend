import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState, useEffect } from 'react';

export const PizzaContext = createContext();
export const AuthContext = createContext();

const fetchPizzas = async () => {
    const response = await fetch('http://127.0.0.1:3000/pizzas', {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const res = await response.json();
    console.log('The result of response is ',res);
    return res;
};

// async function getToken() {
//     try {
//         const response = await fetch('http://127.0.0.1:3000/token', {
//             method: 'GET', // Optional, since GET is the default
//             headers: { Authorization: 'Bearer ' + token },
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json(); // Assuming you expect JSON
//         return data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }


const checkLogin = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            throw new Error('No token provided. You need to log in first.');
        }
        const response = await fetch('http://127.0.0.1:3000/token', {
            method: 'GET', // Optional, since GET is the default
            headers: { Authorization: 'Bearer ' + token },
        });
        const result = await response.json();
        console.log(result);
        // console.log('response of checkLogin() :', await response.json());
        /**
         * Result type is like that :
            {
                "message": "Invalid or Expired Token, please Login again.",
                "result": false
            }
         * 
         */

        if (result.result) {
            console.log('RESULT IS TRUE');
            return true; // Assuming the result is a boolean
        } else {
            console.log('RESULT FALSE')
            return false;
        }
    } catch (error) {
        console.log('Error Appeared:\n', error.message);
        throw Error('In Token verifying someting went wrong\n', error.message);
    }
};

const getCart = async () => {
    // Dummy cart fetch logic
    return [{ id: 1, name: 'Pizza Margherita' }];
};

export default function BaseContext({ children }) {
    const [login, setLogin] = useState();
    const [pizzas, setPizzas] = useState([]);
    const [cart, setCart] = useState([]);
    
    const { data: dataPizza, error: errorPizza, isLoading: isLoadingPizza } = useQuery({ queryKey: ['pizzas'], queryFn: fetchPizzas });
    const { data: dataLogin, error: errorLogin, isLoading: isLoadingLogin } = useQuery({ queryKey: ['login'], queryFn: checkLogin });
    const { data: dataCart, error: errorCart, isLoading: isLoadingCart } = useQuery({ queryKey: ['cart'], queryFn: getCart });
    


    useEffect(() => {
        if (dataPizza) {
            setPizzas(dataPizza);
        }
    }, [dataPizza]);

    useEffect(() => {
        if (dataLogin !== undefined) {
            console.log('data login is ',dataLogin)
            setLogin(dataLogin);
        }
    }, [dataLogin]);

    return (
        <PizzaContext.Provider value={{data:pizzas, error:errorLogin, isLoading:isLoadingPizza}}>
            <AuthContext.Provider value={{ login, setLogin, isLoadingLogin }}>
                {children}
            </AuthContext.Provider>
        </PizzaContext.Provider>
    )
}
