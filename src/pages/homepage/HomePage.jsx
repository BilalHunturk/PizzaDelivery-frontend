import React, { useContext , useEffect, useState } from 'react';
import DeliverButton from '../../components/Buttons/DeliverButton.jsx';
import BasePage from '../BasePage.jsx';
import PizzaImg from '../../images/pizza.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import {PizzaContext,AuthContext} from '../../Context/BaseContext.jsx';

import { Navigation } from 'swiper/modules';

import 'swiper/css/bundle';
import './homepage.css';
import axios from 'axios';

import '../../pages/homepage/homepage.css';
import CustomSwiper from '../../components/Swiper/CustomSwiper.jsx';


export default function HomePage() {
    // const contentStyle = {
    //     height: '160px',
    //     color: '#fff',
    //     lineHeight: '160px',
    //     justifyContent: 'center',
    //     textAlign: 'center',
    //     background: '#364d79',
    //     padding: '10px',

    // };

    console.log('HOMEPAGE RENDERED')

    return (
        <>
            <BasePage>
                <div className='flex flex-col items-center justify-center w-full h-screen  '>
                    <div className='w-[50%] h-[75%] backdrop-blur-[5px] bg-[#ffffffe1] rounded-xl flex flex-col items-center justify-center gap-[10%] p-[2%]'>
                        <div className='w-full h-[65%] rounded-[100%] flex items-center justify-center p-4'>
                            <CustomSwiper>
                            </CustomSwiper>
                        </div>
                        <div className='custom-button pb-5 xl:w-[600px] h-[20%] rounded-[100px] backdrop-blur-xl cursor-pointer'>
                            <div className='flex flex-row justify-center'>
                                <p className='flex items-center justify-center xl:px-4 xl:m-16 xl:mb-6 
                                    xl:text-8xl text-6xl m-6 mb-2 font-italianno font-bold text-[#000000]'>Deliver Pizza !!!</p>
                            </div>
                        </div>
                    </div>

                </div>

            </BasePage>
        </>
    )
}