import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../images/Logo.png';
import LoginForm from '../Form/LoginForm';
import BasketCartForm from '../Form/BasketCartForm';
import { Menu } from 'lucide-react';
import axios from 'axios';
import BasketCart from '../BasketCart/BasketCart';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import ProfileButton from '../ProfileButton/ProfileButton';
import { AuthContext } from '../../Context/AuthContext';

export default function Navbar() {
  // const [login, setLogin] = useState(null); // Initially null to indicate checking
  const [loginFormActive, setLoginFormActive] = useState(false);
  const [basketCart, setBasketCart] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authenticated , setAuthenticated} = useContext(AuthContext);

  const basketFormActive = (bool) => {
    setBasketCart(bool);
    console.log('basketCart is :', bool);
  };

  const loginformActive = (bool) => {
    setLoginFormActive(bool);
  };

  const isloggedIn = (bool) => {
    setAuthenticated(bool);
    console.log('login is setted to ', bool);
  };

  // localStorage.setItem('token','asda');

  /**/
  const LoggedInNavbar = () => {
    return (<>
      <div className='absolute w-1/3 h-[96px] flex flex-row justify-center z-50'>
        <img className='rounded-[50%] w-32 h-32 xl:w-48 xl:h-48 cursor-pointer' src={logo} alt="Logo" onClick={() => window.location.href = '/'} />
      </div>
      <nav className="bg-[#F5F5F5] w-[100%] h-[96px] z-20">
        <ul className="hidden xl:flex flex-row-reverse w-full h-full items-center justify-start gap-12 ml-auto text-base pr-[15%]">
          <div onClick={() => window.location.href = '/profile'}>
            <ProfileButton/>
          </div>
          <div >
            <BasketCart/>
          </div>
          <div className='px-8 py-6 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all rounded-full cursor-pointer active:scale-95 active:bg-[#333333]' onClick={() => window.location.href = '/menu'}>Menu</div>
        </ul>
        <div className='bx bx-menu xl:hidden flex w-full h-full items-center justify-end pr-16 '>
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='p-3 hover:bg-[#4a4a4a] hover:text-white transition-all rounded-md cursor-pointer active:scale-95 active:bg-[#333333]'>
            <Menu size={36}></Menu>
          </div>
        </div>
      </nav>
      <div className='flex justify-end mr-[64px]'>
        {loginFormActive && <LoginForm closeLoginForm={loginformActive} loggedIn={isloggedIn} />}
        {basketCart && <BasketCartForm isBasketCartActive={basketFormActive} />}
      </div>
      {isMenuOpen && (
        <div className="absolute xl:hidden top-24 left-0 w-full bg-[#F5F5F5] flex flex-col gap-6 font-semibold text-lg z-50">
          <li onClick={() => window.location.href = '/'} className='list-none flex justify-center w-full p-4 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all cursor-pointer active:scale-95 active:bg-[#333333]'> Home</li>
          <li onClick={() => window.location.href = '/menu'} className='list-none flex justify-center w-full p-4 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all cursor-pointer active:scale-95 active:bg-[#333333]'> Menu</li>
          <li onClick={() => window.location.href = '/register'} className='list-none flex justify-center w-full p-4 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all cursor-pointer active:scale-95 active:bg-[#333333]'> Register</li>
          <li onClick={() => window.location.href = '/login'} className='list-none flex justify-center w-full p-4 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all cursor-pointer active:scale-95 active:bg-[#333333]'> Login</li>
        </div>
      )}
    </>)
  }
  const LoggedOutNavbar = () => {
    return (<>
      <div className='absolute w-1/3 h-[96px] flex flex-row justify-center z-50'>
        <img className='rounded-[50%] w-32 h-32 xl:w-48 xl:h-48 cursor-pointer' src={logo} alt="Logo" onClick={() => window.location.href = '/'} />
      </div>
      <nav className="bg-[#F5F5F5] w-[100%] h-[96px] z-20">
        <ul className="hidden xl:flex flex-row-reverse w-full h-full items-center justify-start gap-12 ml-auto text-base pr-[15%]">
          <div className='flex flex-row gap-12'>
            <div className='px-8 py-6 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all rounded-md cursor-pointer active:scale-95 active:bg-[#333333]' onClick={() => window.location.href = '/register'}>Register</div>
            <div className='px-8 py-6 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all rounded-md cursor-pointer active:scale-95 active:bg-[#333333]'
              onClick={() => loginFormActive === null || loginFormActive === undefined || loginFormActive === false ? loginformActive(true) : null}>
              <button className='hover:text-white'>Login</button>
            </div>
          </div>
          <div className='px-8 py-6 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all rounded-md cursor-pointer active:scale-95 active:bg-[#333333]' onClick={() => window.location.href = '/menu'}>Menu</div>
        </ul>
        <div className='bx bx-menu xl:hidden flex w-full h-full items-center justify-end pr-16 '>
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='p-3 hover:bg-[#4a4a4a] hover:text-white transition-all rounded-md cursor-pointer active:scale-95 active:bg-[#333333]'>
            <Menu size={36}></Menu>
          </div>
        </div>
      </nav>
      <div className='flex justify-end mr-[64px]'>
        {loginFormActive && <LoginForm closeLoginForm={loginformActive} loggedIn={isloggedIn} />}
        {basketCart && <BasketCartForm isBasketCartActive={basketFormActive} />}
      </div>
      {isMenuOpen && (
        <div className="absolute xl:hidden top-24 left-0 w-full bg-[#F5F5F5] flex flex-col gap-6 font-semibold text-lg z-50">
          <li onClick={() => window.location.href = '/'} className='list-none flex justify-center w-full p-4 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all cursor-pointer active:scale-95 active:bg-[#333333]'> Home</li>
          <li onClick={() => window.location.href = '/menu'} className='list-none flex justify-center w-full p-4 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all cursor-pointer active:scale-95 active:bg-[#333333]'> Menu</li>
          <li onClick={() => window.location.href = '/register'} className='list-none flex justify-center w-full p-4 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all cursor-pointer active:scale-95 active:bg-[#333333]'> Register</li>
          <li onClick={() => window.location.href = '/login'} className='list-none flex justify-center w-full p-4 font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white transition-all cursor-pointer active:scale-95 active:bg-[#333333]'> Login</li>
        </div>
      )}
    </>)
  }

  // if (isLoadingLogin) {
  //   console.log('NAVBAR ISLOADINGLOGIN');
  //   return <div className='absolute w-full h-screen backdrop-blur-3xl flex items-center justify-center z-[999]'>
  //     <Flex align="center" gap="middle">
  //       <Spin indicator={<LoadingOutlined style={{ fontSize: 48, }} spin />} />
  //     </Flex>
  //   </div>
  // }

  if (authenticated) {
    console.log('IN')
    return <LoggedInNavbar />
  }

  if (authenticated===false) {
    console.log('OUT')
    return <LoggedOutNavbar />
  }
  
  console.log('NOTHING IS RENDERED');
}


