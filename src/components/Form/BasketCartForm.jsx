import React from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';
import { X } from 'lucide-react';

export default function BasketCartForm({isBasketCartActive}) {

    const handleClick = (bool) => {
        isBasketCartActive(bool);
    }
    console.log('BASKETCARTFORM')
  return (
    <div className='flex flex-col h-[300px] w-[400px] bg-[#F5F5F5] rounded-[16px] absolute z-[50]'>
        <div className='flex justify-end mt-4 mr-4'>
          <button onClick={()=> handleClick(false)}><X /></button>
        </div>
        {}
      </div>
  )
}
