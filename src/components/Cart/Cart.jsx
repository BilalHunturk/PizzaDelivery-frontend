import React from 'react'
import './cart.css'
import DeliverButton from '../Buttons/DeliverButton'
import AddToCart from '../Buttons/AddToCart';

const url = 'http://localhost:3000';

// const pizzas = [
    //     { id: 1, name:'Margeretta', size:'Large',  doughSize:'Large',pizzaImage: pizzaImages, price: 300},
//     { id: 2, name:'Supreme', size:'Medium',  doughSize:'Medium', pizzaImage: pizzaImages, price: 400 },
//     { id: 3, name:'Pepperoni',  size:'Small', doughSize:'Small', pizzaImage: pizzaImages, price: 500 }
// ];

export default function Cart({ pizza }) {
    return (
        <div className='flex flex-col items-center p-4 gap-4 w-[280px] h-[100%] bg-white border-2 border-[#D9D9D9] shadow-[0px_4px_4px_rgba(0.25,0.25,0.25,0.25)] rounded-lg'>
            <div className='w-full sm:w-[200px] h-[200px] flex items-center justify-center'>
                <img src={url+pizza.pizzaImg} alt={pizza.alt} />
            </div>
            <div>
                <p>{pizza.name}</p>
                <p>Size : {pizza.size}</p>
                <p>Dough Size : {pizza.dough_size}</p>
                <p>Price : {pizza.price}</p>
            </div>
            <div className='flex flex-row items-center justify-center w-[85%] h-[40px]'>
            <AddToCart pizzaId={pizza.id} quantity={1}></AddToCart>
            </div>
        </div >
    )
}
