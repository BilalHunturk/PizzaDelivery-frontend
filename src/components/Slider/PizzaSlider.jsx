import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.css';
// import 'swiper/swiper-bundle.min.css';
import './PizzaSlider.css';
import 'swiper/css';

export default function PizzaSlider({ pizzas }) {

    return (
        <div className="pizza-slider-container">
            <Swiper

                spaceBetween={100}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop
            >
                {pizzas.map(pizza => (
                    <SwiperSlide key={pizza.id}>
                        <img src={pizza.src} alt={pizza.alt} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

