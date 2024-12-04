import React, { useContext, useEffect, useState } from 'react'
import BasePage from '../BasePage';
import { CartContext } from '../../Context/CartContext';
import { AuthContext } from '../../Context/AuthContext';

const url = 'http://localhost:3000'

const fetchCart = async () => {
  try {
    const response = await fetch(url + '')
  } catch (error) {

  }
}

// backdrop-blur-[5px] bg-[#ffffffe1] rounded-[2px] shadow-2xl
export default function CartPage() {
  console.log('CART PAGE');
  // const { login, setLogin, isLoadingLogin } = useContext(AuthContext);
  const { cartItems, setCartItems, isLoadingCartItem } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      let total = 0; // Initialize total as 0
      for (let cartItem of cartItems) {
        total += cartItem.totalPrice;
      }
      setTotalPrice(total);
      console.log('totalPrice is set.');
    }
  }, [cartItems]);

  return (
    <BasePage>
      <div className='flex flex-col items-center justify-center w-full h-screen mt-[2%]'>
        <div className='w-[75%] min-h-[75%] flex flex-row items-center gap-4'>
          <div className='w-2/3 h-full overflow-y-auto gap-[16px]'>
            {cartItems && cartItems.length > 0 ? cartItems.map((cartItem) => (
              <div className='w-full h-[23%] flex flex-row backdrop-blur-[5px] bg-[#ffffffe1] rounded-[2px] shadow-2xl' key={cartItem.id}>
                <img src={url + cartItem.pizzaImg} alt="" className='w-[1/3] h-[80%]' />
                <div className='w-full h-full flex flex-col items-center justify-center '>
                  <p>{cartItem.pizzaName} </p>
                  <p>{cartItem.quantity} </p>
                  <p>{cartItem.pizzaPrice}$ </p>
                  <p>{cartItem.totalPrice}$</p>
                </div>
              </div>
            )) : <p>No items in cart</p>}
          </div>
          <div className='w-1/3 h-1/3 backdrop-blur-[5px] bg-[#ffffffe1] rounded-[2px] shadow-2xl flex flex-col items-center justify-center gap-8'>
            <div className='flex flex-row items-center justify-evenly bg-white w-[80%] h-[35%]'>
              <p>Total Price </p>
              <p className='bg-slate-200'>{totalPrice.toFixed(2)} $</p>
            </div>
            <button className='w-[80%] h-[30%] bg-[#ffb7b7] flex items-center justify-center hover:bg-[#2aa832] hover:scale-105 active:scale-100 hover:text-[#FFFFFF] transition-transform duration-300 ease-out rounded-xl'>
              <p >Complete The Order</p>
            </button>
          </div>
        </div>
      </div>
    </BasePage>
  )
}
