import React from 'react'

export default function CreatePizzaButton() {
  return (
    <button onClick={() => (window.location.href = '/createpizza')}
    className='bg-[#d65151] hover:bg-[#f7a5a5] text-[#ffffff] hover:text-[#d13333] 
    rounded-lg md:w-48 md:h-[48px] w-64 h-[60px] transition-transform duration-300 ease-in-out transform    
    hover:scale-105 active:scale-95'>
            <p className='font-italianno font-semibold md:text-4xl text-5xl mt-1  '>
                Create Pizza!
            </p>
        </button>
  )
}
