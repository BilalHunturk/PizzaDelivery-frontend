import React from 'react'

export default function DeliverButton() {
    return (
        <button className='bg-red-700 text-white rounded-lg md:w-48 md:h-[48px] w-64 h-[60px] transition-transform duration-150 ease-in-out transform hover:bg-red-600 hover:scale-105 active:scale-95'>
            <p className='font-italianno font-semibold md:text-4xl text-5xl mt-1'>
                Deliver!
            </p>
        </button>
    )
}
