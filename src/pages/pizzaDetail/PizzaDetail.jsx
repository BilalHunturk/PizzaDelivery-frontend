import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import SpinPage from '../../components/Spin/SpinPage';
import BasePage from '../BasePage';
import PizzaImg from '../../images/pizza.jpg'

const fetchIngredients = async (pizzaId) => {
    try {
        if(pizzaId){
            const response = await fetch(`http://127.0.0.1:3000/ingredientByPizzaId/${pizzaId}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache', // Disable caching
                    'Pragma': 'no-cache'
                }
            });
            const result = await response.json();
            console.log('HERE IS THE RESULT',result)
            return result;
        }
        return;
        
    } catch (error) {

    }
}

export default function PizzaDetail() {
    const location = useLocation();
    const [pizza, setPizza] = useState();
    const [pizzaIngredients, setPizzaIngredients] = useState([]);
    const url = 'http://localhost:3000';


    
    const { data: ingredients, error: ingErr, isLoading: ingLoading,isSuccess } = useQuery({
        queryKey: ['ingredients', pizza?.id],
        queryFn: () => {
            console.log("Fetching ingredients for pizza ID:", pizza?.id);
            return fetchIngredients(pizza?.id);
        },
        enabled: !!pizza?.id, // Ensure that query only runs when pizza id is available
        staleTime: 0,
        cacheTime: 0,
        // onSuccess: (data) => {
        //     console.log("Ingredients fetched:", data); // Add this to check if onSuccess is called
        //     setPizzaIngredients(data);
        // }
    });
    
    useEffect(() => {
        const statedPizza = location.state?.pizza;
        if (statedPizza)
            setPizza(statedPizza)
    }, [location]);


    useEffect(()=>{
        if(ingredients)
        setPizzaIngredients(ingredients)
    // console.log(ingredients);
    },[ingredients]);
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"); 
    if (ingErr) {
        console.error('Error while fetching ingredients:', ingErr); // Log the error if it exists
    }

// console.log('here is the ingredients ',ingredients,'\nHere is the datas',pizza);
    if (ingLoading) {
        return <SpinPage></SpinPage>;
    }
    return (
        <BasePage>
            <div className='w-full h-screen flex items-center justify-center'>
                <div className='w-[900px] h-[700px] p-16 bg-white rounded-[40px] flex flex-col items-center justify-center'>
                    <div className='w-[193xp] h-[193px]'>
                        <img src={url + (pizza?.pizzaImg ?? PizzaImg)} alt="" />
                    </div>
                    <div className='w-[300px] h-[80%] flex flex-col items-start justify-center'>
                        <p>Pizza Size : {pizza?.size}</p>
                        <p>Dough Size : {pizza?.dough_size}</p>
                        {pizzaIngredients?.length > 0 ? (
                            pizzaIngredients.map((ingredient) => (
                                <div className='w-full flex flex-col items-start justify-center' key={ingredient.ing_type_id}>
                                    {/* <img src={url+(ingredient.ingredientImg)} alt="" /> */}
                                    <p>Ingredient Name : {ingredient.name}</p>
                                    <p>Ingredient Total Amount : {ingredient.totalAmount}</p>
                                    <p>Total Price : {ingredient.totalPrice}</p>
                                </div>
                            ))
                        ) : (
                            <p>No ingredients available for this pizza.</p>
                        )}
                        <p className='border-[2px] border-[#000000]'>Pizza Price : {pizza?.price}$</p>
                    </div>
                    <button className='custom-button-card w-[24%] h-[10%] bg-slate'>
                        Add to Cart
                    </button>
                </div>
            </div>
        </BasePage>
    )
}
