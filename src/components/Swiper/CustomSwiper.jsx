import React, { useContext,useState, useEffect } from 'react'
import PizzaImg from '../../images/pizza.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { Navigation } from 'swiper/modules';
import { PizzaContext } from '../../Context/PizzaContext';
import { useNavigate } from 'react-router-dom';

const goToPizzaDetail = (pizza) => {

}

export default function CustomSwiper() {
    const [pizzas, setPizzas] = useState([]);
    const { dataPizza, setPizza, isLoadingPizza } = useContext(PizzaContext);
    const navigate = useNavigate();
    const navigateToPizzaPage = (pizza) => {
        const pizzaSlug = pizza.name.toLowerCase().replace(/ /g,'-');
        navigate(`/pizza/${pizzaSlug}`,{
            state :{pizza : pizza}
        })
    }

    const url = 'http://localhost:3000';
    console.log('CUSTOMSWIPER IS RENDERED')

    useEffect(() => {
        if (dataPizza) {
            setPizzas(dataPizza);
        }
    }, [dataPizza]);

    return (
        <Swiper slidesPerView={3}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Navigation]} className='flex w-full h-full items-center justify-center p-[20px]' // Enables navigation arrows
        >
            {pizzas.length !== 0 ? pizzas.map((pizza) => (
                <SwiperSlide key={pizza.id}>
                    <div className='w-full h-full flex flex-col items-center justify-center'>
                        <div className='custom-button-card w-full flex flex-col items-center justify-center bg-white cursor-pointer'
                            onClick={() => navigateToPizzaPage(pizza)}
                            >
                            <img
                                alt={pizza.name}
                                src={url + (pizza.pizzaImg ?? PizzaImg)}
                                className='flex items-center justify-center w-[80%]'
                            />
                            <div>
                                <p>{pizza.name}</p>

                            </div>
                        </div>

                    </div>
                </SwiperSlide> 
            )) : null}
        </Swiper>
    )
}
