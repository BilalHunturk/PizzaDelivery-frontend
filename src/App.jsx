import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/homepage/HomePage";
import MenuPage from "./pages/menu/MenuPage";
import RegisterPage from "./pages/register/RegisterPage";
import CreatePizzaPage from "./pages/createPizza/CreatePizzaPage";
import LoginPage from "./pages/loginpage/LoginPage";
import PrivatePage from "./pages/PrivatePage";
import CartPage from "./pages/cart/CartPage";
import ProfilePage from "./pages/profile/ProfilePage";
import BaseContext from "./Context/BaseContext";
import AuthContextComp from "./Context/AuthContext";
import PizzaContextComp from "./Context/PizzaContext";
import PizzaDetail from "./pages/pizzaDetail/PizzaDetail";
import Protected from "./components/Auth/Protected";
import AuthProvider from "./Context/AuthContext";
import CartContextComp, { CartContext } from "./Context/CartContext";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          
          <BrowserRouter>
            <Routes>
              <Route path="" element={<PizzaContextComp><HomePage /></PizzaContextComp>}/>
              <Route path="/menu" element={<PizzaContextComp><MenuPage/></PizzaContextComp>} />
              <Route path="/pizza/:slug" element={<PizzaDetail/>}/>
              
              {/**PROTECTED ROUTES */}
              <Route path="/" element={<Protected />}>
                <Route path="createPizza"element={<PizzaContextComp><CreatePizzaPage /></PizzaContextComp>}></Route>
                <Route path="profile" element={<ProfilePage />}></Route>
                <Route path="cart" element={<CartPage/>}/>
              </Route>
              {/* <Route path="/menu" element={<MenuPage />} /> */}
              <Route path="/aaa/register" element={<RegisterPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* <Route path='/createPizza' element={<CreatePizzaPage/>}/> */}
              <Route path="/login" element={<LoginPage />} />
              {/* <Route
                path="/createPizza"
                element={
                  <AuthContextComp>
                  <PrivatePage>
                      <CreatePizzaPage />
                      </PrivatePage>
                      </AuthContextComp>
                    }
                  ></Route> */}
              {/* <Route
                path="/"
                element={
                  <AuthContextComp>
                    <PizzaContextComp>
                      <HomePage />
                    </PizzaContextComp>
                  </AuthContextComp>
                }
                /> */}
              {/* <Route path='/menu' element={ <BaseContext><MenuPage/></BaseContext>}/> */}

            </Routes>
            </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
export default App;
