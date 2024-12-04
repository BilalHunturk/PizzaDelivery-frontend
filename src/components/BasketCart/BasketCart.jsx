import React, { createContext, useContext, useEffect, useState } from 'react'
import { Badge, Button } from 'antd';
import { ShoppingBasket } from 'lucide-react';
import { Popover } from 'antd';
import { CartContext } from '../../Context/CartContext';

const url = 'http://127.0.0.1:3000'

const text = <p className='flex items-center justify-center border-b-2'>Items</p>;

const eachElement = (cartItems) => {
    return (
        <div className='w-[320px] h-[420px] overflow-auto flex flex-col items-center gap-4 justify-start z-50'>
            <div className='overflow-auto flex flex-col items-center gap-4'>
                {cartItems?.map((cartItem, index) => (
                    <div key={index} className='flex items-center justify-center p-4 w-full min-h-[140px] h-[140px] border-[3px] gap-4'>
                        <img src={url + cartItem.pizzaImg} alt="" className='w-[100px] h-[85%]' />
                        <div className='w-full h-full'>
                            <p>{cartItem.pizzaName}</p>
                            <h1>{cartItem.pizzaPrice}</h1>
                            <h1>Quantity is {cartItem.quantity}</h1>
                            <h1>Total <span>{cartItem.totalPrice}$</span></h1>
                        </div>
                    </div>
                ))}
            </div>
            {/* Buttons at the bottom */}
            <div className='flex justify-between gap-4 p-4 border-t-2'>
                <Button type="primary" className='w-[120px] h-[45px]' danger onClick={() => console.log('Clear Cart')}>
                    <p>Go to Cart</p>
                </Button>
                <Button type="primary" className='w-[120px] h-[45px]' onClick={() => console.log('Checkout')}>
                    <p>Complete</p>
                </Button>
            </div>
        </div>
    )
}

export default function BasketCart() {

    const { cartItems, setCartItems, isLoadingCartItem } = useContext(CartContext);
    // const [settedCartItems,setCartItems] = useState([]);

    useEffect(()=>{
        console.log('Cart items updated:', cartItems);
    },[cartItems]); 

    console.log('BASKETCART')
    return (
        <Popover placement="bottom" title={text} content={() => eachElement(cartItems)} >

            <Badge className='px-2 py-2 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white 
        transition-all rounded-md cursor-pointer active:scale-95 hover:scale-105 active:bg-[#333333]
        flex flex-row' count={cartItems.length} onClick={() => window.location.href = '/cart'}>
                <ShoppingBasket />
                {/* <div className='w-full px-8 py-6 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white 
            transition-all rounded-md cursor-pointer active:scale-95 active:bg-[#333333]
            flex flex-row'>
            </div> */}
            </Badge>
        </Popover>
    )
}
