import { useQuery } from "@tanstack/react-query";
import React, { createContext, useState, useEffect, useContext } from "react";
import CartContextComp from "./CartContext";
import SpinPage from "../components/Spin/SpinPage";

export const AuthContext = createContext();

const checkLogin = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      throw new Error("No token provided. You need to log in first.");
    }
    const response = await fetch("http://127.0.0.1:3000/token", {
      method: "GET", // Optional, since GET is the default
      headers: { Authorization: "Bearer " + token },
    });
    const result = await response.json();
    console.log(result);
    // console.log('response of checkLogin() :', await response.json());
    /**
         * Result type is like that :
            {
                "message": "Invalid or Expired Token, please Login again.",
                "result": false
            }
         * 
         */

    if (result.result) {
      console.log("RESULT IS TRUE");
      return true; // Assuming the result is a boolean
    } else {
      console.log("RESULT FALSE");
      return false;
    }
  } catch (error) {
    console.log("Error Appeared:\n", error.message);
    throw Error("In Token verifying someting went wrong\n", error.message);
  }
};

// export default function AuthContextComp({ children }) {

//     const { data: dataLogin, error: errorLogin, isLoading: isLoadingLogin } = useQuery({ queryKey: ['login'], queryFn: checkLogin });
//     const [login, setLogin] = useState();
//     let dataSent = { login, setLogin, isLoadingLogin };

//     useEffect(() => {
//         if (dataLogin !== undefined) {
//             setLogin(dataLogin);
//             console.log('USEEFFECT DATALOGIN:', dataLogin);
//         }
//         console.log('AUTHCONTEXT USEFFECT RUNNED\nDATALOGIN IS ', dataLogin);
//     }, [dataLogin]);
//     // Handle loading or error states
//     // if (login) {
//     //     const { cartItems, setCartItems, isLoadingCartItem } = useContext(CartContext);
//     // }

//     if (isLoadingLogin) {
//         console.log('LOADING...')
//         return <SpinPage />;
//     }

//     if (login === false) {
//         return (
//             <AuthContext.Provider value={dataSent}>
//                 {children}
//             </AuthContext.Provider>
//         )
//     }

//     if (login === true) {
//     console.log('LOGIN IS', login);
//     return (
//         <AuthContext.Provider value={dataSent}>
//             <CartContextComp>
//                 {children}
//             </CartContextComp>
//         </AuthContext.Provider>)

//     }

// }

export default function AuthProvider({ children }) {
  const { data: isLoggedIn, isLoading: isLoadingLogin } = useQuery({
    queryKey: ["login"],
    queryFn: checkLogin,
  });
  const [authenticated, setAuthenticated] = useState(undefined); // initialize with undefined

  console.log("auth provider", isLoggedIn, isLoadingLogin);

  useEffect(() => {
    if (typeof isLoggedIn === "boolean") setAuthenticated(isLoggedIn); // ensure valid boolean
  }, [isLoggedIn]);


  if (authenticated === true) {
    return(
      <AuthContext.Provider value={{ authenticated , setAuthenticated}}>
        <CartContextComp>
          {children}
        </CartContextComp>
      </AuthContext.Provider>
    )
  }

  if (authenticated === false) {
    return(
    <AuthContext.Provider value={{authenticated,setAuthenticated}}>
        {children}
    </AuthContext.Provider>
  )}

  return (
    <SpinPage></SpinPage>
  );
}
