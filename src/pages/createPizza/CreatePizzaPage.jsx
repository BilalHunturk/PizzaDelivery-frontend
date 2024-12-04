import React, { useState, useEffect } from 'react'
import './createpizzapage.css'
import BasePage from '../BasePage.jsx'
import PizzaImg from '../../images/pizza.jpg'
import Arrow from '../../images/arrow.png'
import ArrowNone from '../../images/arrow-none.png'
import QuantityInput from '../../components/Inputs/QuantityInput.jsx'
import { Input } from 'antd';
import { X, CircleMinus, CirclePlus } from 'lucide-react'
import axios from 'axios'

export default function CreatePizzaPage() {

    const basePrice = 10;
    const [page, setPage] = useState(1);
    const [PizzaName, setPizzaName] = useState('My lovely Pizza!');
    const [PizzaSize, setPizzaSize] = useState(null);
    const [DoughSize, setDoughSize] = useState(null);
    const [Cheese, setCheese] = useState(null);
    const [price, setPrice] = useState(basePrice);
    const [calPrice, setcalPrice] = useState(basePrice);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [ingredients, setIngredients] = useState({});
    const [ingredientTypes, setIngredientTypes] = useState([]);
    const [chosenIngredientTypes, setChosenIngredientTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/ingredientTypes');
                setIngredientTypes(response.data); // Assuming the API returns the ingredients array
                setLoading(false);
                // console.log(ingredientTypes);
            } catch (err) {
                setError('Failed to fetch ingredients');
                console.log(err);
                setLoading(false);
            }
        };

        fetchIngredients();
    }, []); // Empty dependency array means this will run once when the component mounts

    useEffect(() => {
        let totalPrice = basePrice;
        Object.entries(ingredients).forEach((ingredient,index)=>{
            const ingType = chosenIngredientTypes.find(
                (chosenIngredientType) => chosenIngredientType.name === ingredient[0]
            );
            if (ingType) {
                const ingredientPrice = (ingredient[1] / ingType.min_amount) * ingType.price_per_min_amount;
                totalPrice += ingredientPrice; // Accumulate the price
            }
            console.log(ingredient,'price :',price);
        })
        setPrice(totalPrice);

    }, [ingredients,chosenIngredientTypes]);

    const handleQuantityChange = (ingredientName, quantity) => {
        setIngredients((prevState) => ({
          ...prevState,
          [ingredientName]: quantity,
        }));
    };
    

    const handleChosenIngredientTypes = (ingredientType) => {
        setChosenIngredientTypes((prevState) => {
            if (prevState.includes(ingredientType))
                return prevState;
            return [...prevState, ingredientType];
        });
        toggleModal();
    };

    const handleRemoveIngredientType = (ingredientType) => {
        setChosenIngredientTypes((prev) => prev.filter(item => item !== ingredientType));
    };

    // Function to open/close the modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleInputChange = (event) => {
        setPizzaName(event.target.value);
    }

    const handlePizzaSize = (size) => {
        setPizzaSize(size)
    }

    const handleDoughSize = (size) => {
        setDoughSize(size)
    }

    const handleCheese = (size) => {
        setCheese(size)
    }

    const nextPage = () => {
        if (page < 3) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const getIngredients = () => {
        return
    }

    const page1 = () => {
        return (
            <div className='flex flex-col items-center justify-start w-[800px] h-[660px] md:w-[380px] md:h-[500px] overflow-y-auto bg-white rounded-[64px] py-[30px]'>
                <h1 className='text-4xl md:text-2xl font-serif text-[#676666]'>Create Your Own Pizza</h1>
                <img src={PizzaImg} alt="" className='w-[390px] h-[280px] md:w-[292px] md:h-[210px]' />
                <div className='flex flex-col items-center justify-center py-[25px] md:py-[10px] gap-[30px] md:gap-[15px]'>
                    <h1 className='text-4xl md:text-2xl font-serif'>Give A Name To Your Pizza</h1>
                    <Input className='custom-input w-[350px] h-[65px] md:w-[250px] md:h-[45px] font-serif text-[30px] md:text-[24px]'
                        placeholder='My Lovely Pizza' onChange={handleInputChange} defaultValue={PizzaName} />
                </div>
                <div className='flex items-center justify-around w-full h-[150px] pt-1'>
                    <button className='group relative cursor-not-allowed'>
                        <img className='w-[170px] h-[100px] md:w-[102px] md:h-[60px] rotate-180' src={ArrowNone} alt="" />
                    </button>
                    <h1 className='text-4xl md:text-2xl font-serif'>1/3</h1>
                    <button onClick={nextPage} className='group relative'>
                        <img className='w-[170px] h-[100px] md:w-[102px] md:h-[60px] hover:scale-105 transition-transform duration-150 ease-in-out active:scale-75' src={Arrow} alt="" />
                    </button>
                </div>
            </div>
        )
    }

    const page2 = () => {
        return (
            <div className='flex flex-col items-center justify-start w-[800px] h-[660px] md:w-[380px] md:h-[520px] overflow-y-auto bg-white rounded-[64px] pt-[15px]'>
                <div className='w-full h-[10%] border-b-2 flex justify-center'>
                    <p className='font-sans text-[30px] font-[350]'>
                        Pizza Details
                    </p>
                </div>
                {/*Pizza Size */}
                <div className='w-full h-1/4 flex flex-col items-center justify-center gap-3 border-b-2'>
                    <div className='w-full flex items-center justify-center pt-4'>
                        <p>Pizza Size</p>
                    </div>
                    <div className='w-full h-full flex flex-row justify-center pb-4 gap-4'>
                        <button className={`custom-button ${PizzaSize === 'small' ? 'bg-green-500 text-white' : null}`}
                            onClick={() => handlePizzaSize('small')}>
                            <p className='font-sans text-[20px] font-[200] md:text-[14px] md:font-[400]'>
                                Small
                            </p>
                            <p className='font-sans text-[14px] font-[400] md:text-[12px]'>
                                28 cm
                            </p>
                        </button>
                        <button className={`custom-button ${PizzaSize === 'medium' ? 'bg-green-500 text-white' : null}`}
                            onClick={() => handlePizzaSize('medium')}>
                            <p className='font-sans text-[20px] font-[200] md:text-[16px] md:font-[400]'>
                                Medium
                            </p>
                            <p className='font-sans text-[14px] font-[400] md:text-[12px]'>
                                40 cm
                            </p>
                        </button>
                        <button className={`custom-button ${PizzaSize === 'large' ? 'bg-green-500 text-white' : null}`}
                            onClick={() => handlePizzaSize('large')}>
                            <p className='font-sans text-[20px] font-[200] md:text-[16px] md:font-[400]'>
                                Large
                            </p>
                            <p className='font-sans text-[14px] font-[400] md:text-[12px]'>
                                52 cm
                            </p>
                        </button>
                    </div>

                </div>
                {/** Dough Size */}
                <div className='w-full h-1/4 flex flex-col items-center justify-center gap-3 border-b-2'>
                    <div className='w-full flex items-center justify-center pt-4'>
                        <p>Dough Size</p>
                    </div>
                    <div className='w-full h-full flex flex-row justify-center pb-4 gap-4'>
                        <button className={`custom-button ${DoughSize === 'small' ? 'bg-green-500 text-white' : null}`}
                            onClick={() => handleDoughSize('small')}>
                            <p className='font-sans text-[20px] font-[200] md:text-[14px] md:font-[400]'>
                                Small
                            </p>
                            <p className='font-sans text-[14px] font-[400] md:text-[12px]'>
                                60 cm
                            </p>
                        </button>
                        <button className={`custom-button ${DoughSize === 'medium' ? 'bg-green-500 text-white' : null}`}
                            onClick={() => handleDoughSize('medium')}>
                            <p className='font-sans text-[20px] font-[200] md:text-[16px] md:font-[400]'>
                                Medium
                            </p>
                            <p className='font-sans text-[14px] font-[400] md:text-[12px]'>
                                90cm
                            </p>
                        </button>
                        <button className={`custom-button ${DoughSize === 'large' ? 'bg-green-500 text-white' : null}`}
                            onClick={() => handleDoughSize('large')}>
                            <p className='font-sans text-[20px] font-[200] md:text-[16px] md:font-[400]'>
                                Large
                            </p>
                            <p className='font-sans text-[14px] font-[400] md:text-[12px]'>
                                120 cm
                            </p>
                        </button>
                    </div>

                </div>
                {/**Cheese */}
                <div className='w-full h-1/4 flex flex-col items-center justify-center gap-3 border-b-2'>
                    <div className='w-full flex items-center justify-center pt-4'>
                        <p>Cheese</p>
                    </div>
                    <div className='w-full h-full flex flex-row justify-center pb-4 gap-4'>
                        <button className={`custom-button ${Cheese === 'small' ? 'bg-green-500 text-white' : null}`}
                            onClick={() => handleCheese('small')}>
                            <p className='font-sans text-[20px] font-[200] md:text-[14px] md:font-[400]'>
                                Small
                            </p>
                            <p className='font-sans text-[14px] font-[400] md:text-[12px]'>
                                200 g
                            </p>
                        </button>
                        <button className={`custom-button ${Cheese === 'medium' ? 'bg-green-500 text-white' : null}`}
                            onClick={() => handleCheese('medium')}>
                            <p className='font-sans text-[20px] font-[200] md:text-[16px] md:font-[400]'>
                                Medium
                            </p>
                            <p className='font-sans text-[14px] font-[400] md:text-[12px]'>
                                300 g
                            </p>
                        </button>
                        <button className={`custom-button ${Cheese === 'large' ? 'bg-green-500 text-white' : null}`}
                            onClick={() => handleCheese('large')}>
                            <p className='font-sans text-[20px] font-[200] md:text-[16px] md:font-[400]'>
                                Large
                            </p>
                            <p className='font-sans text-[14px] font-[400] md:text-[12px]'>
                                400 g
                            </p>
                        </button>
                    </div>

                </div>
                <div className='flex items-center justify-around w-full h-1/5'>
                    <button onClick={prevPage} className='group relative w-full h-full'>
                        <img className='md:w-[102px] md:h-[60px] h-[100%] rotate-180 hover:scale-95 transition-transform duration-150 ease-in-out active:scale-90' src={Arrow} alt="" />
                    </button>
                    <h1 className='text-4xl md:text-2xl font-serif h-full flex items-center'>2/3</h1>
                    <button onClick={nextPage} className='group relative w-full h-full flex items-center justify-end'>
                        <img className='md:w-[102px] md:h-[60px] h-full hover:scale-95 transition-transform duration-150 ease-in-out active:scale-90' src={Arrow} alt="" />
                    </button>
                </div>
            </div>
        )
    }

    const page3 = () => {
        return (
            <div className='flex flex-col items-start justify-center w-[800px] h-[660px] md:w-[380px] md:h-[520px] overflow-y-auto bg-white rounded-[64px] pt-[15px]'>
                <div className='h-[80%] w-full flex items-center justify-center border-b-2 border-[#c7c7c7]'>
                    <div className='h-full w-[70%] bg-white rounded-[16px] flex flex-col items-start justify-start'>
                        <div className='w-full h-[20%] flex flex-row'>
                            <button className='custom-button rounded-[8px] bg-[#fcebeb] w-full h-full flex flex-row items-center justify-center' //bg-[#fce8e8]
                                onClick={toggleModal}>
                                    <CirclePlus className=' w-[45%] h-full' style={{color:'#ff3636'}}/>
                                {/* <img className='' src={PlusCircle} alt="Add Ingredient" /> */}
                            
                            <div className='w-full h-full flex items-center justify-center'>
                                <div className='w-[80%] h-[50%] flex items-center justify-center border-b-2 border-[#ad2323]'>
                                    <p className='font-serif text-[32px] '>Add Ingredient</p>
                                </div>
                            </div>
                            </button>
                        </div>


                        <div className='w-full h-[70%] flex items-center justify-center p-4'>
                            <div className='w-full h-full bg-[#ffdcdb] p-2 overflow-y-auto border-y-[2px] border-y-[#000000] rounded-[3px]'>
                                {chosenIngredientTypes.map((ingredientType) => (
                                    <div key={ingredientType.id || ingredientType.name} className='w-full min-h-[25%] h-[25%] rounded-[8px] mb-3 bg-white flex flex-row items-center justify-center py-4 px-2 gap-2 shadow-md shadow-slate-400'>
                                        <button className='w-[5%]' onClick={() => handleRemoveIngredientType(ingredientType)}><X></X></button>
                                        <img className='w-[10%] h-full rounded-3xl' src={ingredientType.image_url} alt={ingredientType.name} />
                                        <p className='w-[15%] h-full  flex items-center justify-center font-[200] text-[16px]'>{ingredientType.name}</p>
                                        <p className='w-[30%] h-full border-x-2 flex items-center justify-center text-[20px] bg-[#f1f1f1] text-[#a8a8a8] px-'>{ingredientType.price_per_min_amount} $ per {ingredientType.min_amount} g</p>
                                        <div className='w-[30%] h-full flex flex-row items-center bg-slate-100 rounded-md'>
                                            <QuantityInput name={ingredientType.name} pricePerMinAmount={ingredientType.price_per_min_amount} minAmount={ingredientType.min_amount} onQuantityChange={handleQuantityChange}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='w-full h-[10%] flex items-center justify-between px-4 pb-2 gap-2'>
                            <div className='w-[65%] h-full rounded-[8px] bg-[#ffb6b6] flex items-center justify-evenly'>
                                <p className='w-[40%] h-[80%] border-r-[2px] flex items-center justify-center border-[#b18f8f] font-semibold font-sans'>Total</p>
                                <div className='w-[55%] h-[70%] bg-white flex items-center justify-end rounded-[8px] px-4 gap-4'>
                                    <p >{price} $</p>
                                </div>
                            </div>
                            <button className='w-[35%] h-full bg-red-700 rounded-[8px]'>
                                <p className='text-white font-serif'>Order</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='h-[20%] w-full flex flex-row'>
                    <button onClick={prevPage} className='group relative w-full h-full'>
                        <img className='md:w-[102px] md:h-[60px] h-[100%] rotate-180 hover:scale-95 transition-transform duration-150 ease-in-out active:scale-90' src={Arrow} alt="" />
                    </button>
                    <h1 className='text-4xl md:text-2xl font-serif h-full flex items-center'>3/3</h1>
                    <button className='group relative w-full h-full flex items-center justify-end cursor-not-allowed'>
                        <img className='md:w-[102px] md:h-[60px] h-full' src={ArrowNone} alt="" />
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 gap-4 rounded-lg msc:w-[40%] msc:h-[70%] w-[90%] h-[70%] flex flex-col items-center justify-start">

                            <div className='w-full flex items-center justify-center gap-4'>
                                <p className="w-[90%] text-2xl font-[50] flex justify-center">Choose An Ingredient</p>
                                <button onClick={toggleModal}><X /></button>
                            </div>
                            {/* Your Form Fields */}
                            <form className='w-full h-full flex items-center justify-center'>
                                <div className="w-[90%] h-full bg-[#f3f3f3] rounded-3xl flex flex-col overflow-y-auto items-center justify-start py-4 gap-4 ">
                                    {loading && <p>Loading...</p>}
                                    {error && <p>{error}</p>}
                                    {!loading && !error && (
                                        ingredientTypes.map((ingredientType, index) => (
                                            <div key={ingredientType.name} onClick={() => handleChosenIngredientTypes(ingredientType)} className='custom-ingredients w-[95%] min-h-[20%] bg-[#f8dbdb] rounded-2xl flex items-center justify-start cursor-pointer' >
                                                <img className='w-[25%] h-full rounded-3xl' src={ingredientType.image_url} alt="" />
                                                <p className='w-[30%] h-full flex items-center justify-center'>{ingredientType.name}</p>
                                                <p className='w-[22.5%] h-full flex items-center justify-center'>{ingredientType.price_per_min_amount} $</p>
                                                <p className='w-[22.5%] h-full flex items-center justify-center'>{ingredientType.min_amount} g</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </form>
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const AddIngredient = () => {
        return
    }

    const renderPage = () => {
        switch (page) {
            case 1:
                return page1();
            case 2:
                return page2();
            case 3:
                return page3();
            default:
                return;
        }
    };

    return (
        <BasePage>
            <div className='flex items-start justify-center w-full h-screen pt-[100px] px-[30px]'>
                {renderPage()}
            </div>
        </BasePage>
    )
}
