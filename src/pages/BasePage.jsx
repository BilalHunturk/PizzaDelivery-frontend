import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Background from '../components/Background/Background'
import Footer from '../components/Footer/Footer'

export default function BasePage({children}) {

    console.log('BASEPAGE IS RENDERED');

    return (
        <div className='flex flex-col'>
            <Navbar/>
            <Background/>
            {/* Here */}
            <div className='absolute w-full z-40 mt-[96px]'>
            {children}
            </div>
            <Footer/>
        </div>
    )
}
