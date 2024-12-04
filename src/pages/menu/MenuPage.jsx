import React, { useContext, useState, useEffect } from 'react';
import './menupage.css';
import Cart from '../../components/Cart/Cart.jsx';
import { Checkbox } from 'antd';

import '../../pages/homepage/homepage.css';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import DeliverButton from '../../components/Buttons/DeliverButton.jsx';
import BasePage from '../BasePage.jsx';
import CreatePizzaButton from '../../components/Buttons/CreatePizzaButton.jsx';
import { PizzaContext } from '../../Context/PizzaContext.jsx';


export default function MenuPage() {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedDoughSize, setSelectedDoughSize] = useState('');
    const [selectedCheese, setSelectedCheese] = useState('');
    const [pizzas, setPizzas] = useState([]);
    const {dataPizza, setPizza, isLoadingPizza} = useContext(PizzaContext);

    useEffect(() => {
        if (dataPizza !== undefined) {
            setPizzas(dataPizza);
        }
    }, [dataPizza]);

    const filteredPizzas = pizzas.filter(pizza =>
        (selectedSize === '' || pizza.size === selectedSize.toLowerCase()) &&
        (selectedDoughSize === '' || pizza.dough_size.toLowerCase() === selectedDoughSize.toLowerCase())
    );

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleDoughSizeChange = (doughSize) => {
        setSelectedDoughSize(doughSize);
    };

    const handleCheeseChange = (cheese) => {
        setSelectedCheese(cheese);
    };

    const unCheckedSize = () => {
        setSelectedSize('')
    }

    const unCheckedDoughSize = () => {
        setSelectedDoughSize('')
    }

    const unCheckedCheese = () => {
        setSelectedCheese('')
    }



    return (
        <>
            <BasePage>
                <div className='flex flex-col h-screen items-center justify-center'>
                    {/* <div className='flex w-full h-[200px] md:h-[100px] gap-8 justify-center items-center z-10' >
                        <DeliverButton />
                        <CreatePizzaButton/>
                    </div> */}


                    <div className='flex gap-3 items-center justify-center '>
                        {/* <div className='flex flex-row gap-[10%] '> */}

                            {/*
                            Checkboxlar değiştirilecek.
                            Sayfa büyütme ve küçültmeye duyarlı bir hale getirilecek.
                            Sayfalar linklere ayrılacak.
                            Login sayfası oluşturulacak.
                            Register sayfası oluşturulacak.
                        */}
                            {/* FILTER */}
                            <div className='hidden slg:flex flex-col p-4 pt-8 pb-8 gap-5 mt-[3%] 
                            w-[300px] h-[clamp(400px,75vh,732px)]  h-overflow-auto overflow-x-auto 
                            overflow-y-auto bg-[#FFFFFF] border-solid rounded-[8px] border-[#D9D9D9]'>
                                <div className='filter-box flex gap-3 items-center'>
                                    <div className='filter-box-in-text flex w-[100%] h-[10%] items-center justify-center'>
                                        <p>Filter</p>
                                    </div>
                                    <div className='filter-box-in items-start min-w-[230px] h-[140px] p-3 gap-2'>
                                        {selectedSize === "Small" || selectedSize === "Medium" || selectedSize === "Large" ?
                                            <div className='filter-box-in flex-row w-[100%] h-[30%] items-center justify-center'>
                                                <div className='filter-box-in-text text-[13px]'>
                                                    Pizza size {selectedSize} {selectedSize === "Small" ? "28cm" : selectedSize === "Medium" ? "35cm" : selectedSize === "Large" ? "42cm" : null}
                                                </div>
                                                <button className='ml-3' onClick={() => unCheckedSize()}><X /></button>
                                            </div> : null
                                        }
                                        {selectedDoughSize === "Small" || selectedDoughSize === "Medium" || selectedDoughSize === "Large" ?
                                            <div className='filter-box-in flex-row w-[100%] h-[30%] items-center justify-center'>
                                                <div className='filter-box-in-text text-[13px]'>
                                                    Dough {selectedDoughSize} {selectedDoughSize === "Small" ? "60mm" : selectedDoughSize === "Medium" ? "90mm" : selectedSize === "Large" ? "120mm" : null}
                                                </div>
                                                <button className='ml-3' onClick={() => unCheckedDoughSize()}><X /></button>
                                            </div> : null
                                        }
                                        {selectedCheese === "Small" || selectedCheese === "Medium" || selectedCheese === "Large" ?
                                            <div className='filter-box-in flex-row w-[100%] h-[30%] items-center justify-center'>
                                                <div className='filter-box-in-text text-[13px]'>
                                                    Cheese {selectedCheese} {selectedCheese === "Small" ? "200g" : selectedCheese === "Medium" ? "300g" : selectedSize === "Large" ? "400g" : null}
                                                </div>
                                                <button className='ml-3' onClick={() => unCheckedCheese()}><X /></button>
                                            </div> : null
                                        }
                                    </div>
                                </div>
                                {/* Pizza Size Part */}
                                <div className='filter-box'>
                                    <div className='filter-box-in-text'>
                                        <p>Size</p>
                                    </div>
                                    <div className='filter-box-in items-center justify-center'>
                                        {['Small', 'Medium', 'Large'].map(size => (
                                            <div className='filter-box-in-checkbox-field items-end justify-between' key={size}>
                                                <div className='filter-box-in-text text-[14px] flex flex-row gap-[25px]'>
                                                    <Checkbox
                                                        defaultChecked={false}
                                                        checked={selectedSize === size}
                                                        onChange={() => handleSizeChange(size)}
                                                    />
                                                    {size}
                                                </div>
                                                <div className='filter-box-in-text flex flex-row text-[#757575] text-[12px]'>
                                                    <div className='w-11 h-1' />
                                                    <p>{size === 'Small' ? '28cm' : size === 'Medium' ? '35cm' : '42cm'}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Pizza Dough Size Part */}
                                <div className='filter-box'>
                                    <div className='filter-box-in-text'>
                                        <p>Dough Size</p>
                                    </div>
                                    <div className='filter-box-in items-center justify-center'>
                                        {['Small', 'Medium', 'Large'].map(doughSize => (
                                            <div className='filter-box-in-checkbox-field items-end justify-between' key={doughSize}>
                                                <div className='filter-box-in-text text-[14px] flex flex-row gap-[22px]'>
                                                    <Checkbox
                                                        type="checkbox"
                                                        checked={selectedDoughSize === doughSize}
                                                        onChange={() => handleDoughSizeChange(doughSize)}
                                                    />
                                                    {doughSize}
                                                </div>
                                                <div className='filter-box-in-text flex flex-row text-[#757575] text-[12px]'>
                                                    <div className='w-11 h-1' />
                                                    <p>{doughSize === 'Small' ? '60mm' : doughSize === 'Medium' ? '90mm' : '120mm'}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Pizza Cheese */}
                                <div className='filter-box'>
                                    <div className='filter-box-in-text'>
                                        <p>Cheese</p>
                                    </div>
                                    <div className='filter-box-in items-center justify-center'>
                                        {['Small', 'Medium', 'Large'].map(cheese => (
                                            <div className='filter-box-in-checkbox-field items-end justify-between' key={cheese}>
                                                <div className='filter-box-in-text text-[14px] flex flex-row gap-[28px]'>
                                                    <Checkbox
                                                        type="checkbox"
                                                        checked={selectedCheese === cheese}
                                                        onChange={() => handleCheeseChange(cheese)}
                                                    />
                                                    {cheese}
                                                </div>
                                                <div className='filter-box-in-text flex flex-row text-[#757575] text-[12px]'>
                                                    <div className='w-11 h-1' />
                                                    <p>{cheese === 'Small' ? '200g' : cheese === 'Medium' ? '300g' : cheese === 'Large' ? '400g' : null}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* PİZZAS h-[clamp(400px,75vh,732px)]*/}
                            <div className='grid p4:grid-cols-4 p3:grid-cols-3 grid-cols-2 sm:grid-cols-1 gap-7 p-10
                            h-[85vh] 3xl:w-[%80] overflow-auto overflow-y-auto 
                            p4:min-w-[1263.5px] 
                            bg-[#FFFFFF] border-solid rounded-[8px] border-[#D9D9D9]'>

                                {/* {pizzas.map(pizza => (
                                <Cart key={pizza.id} pizza={pizza} />
                            ))} */}

                                {isLoadingPizza ?
                                    <p>Loading...</p> :
                                    filteredPizzas.length > 0 ? (
                                        filteredPizzas.map(pizza => (
                                            <Cart key={pizza.id} pizza={pizza} />
                                        ))
                                    ) : (
                                        <p>No pizzas available</p>
                                    )}
                            </div>
                        {/* </div> */}

                    </div>
                </div>

            </BasePage>
        </>

    )
}
