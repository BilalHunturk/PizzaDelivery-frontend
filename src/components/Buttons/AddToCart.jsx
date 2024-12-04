import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import SpingPage from "../Spin/SpinPage";
import SpinPage from "../Spin/SpinPage";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import { message } from "antd";

// const send = async ({pizzaId,quantity}) => {
//   try {
//     const token = localStorage.getItem("token");
//     const result = await fetch("http://127.0.0.1:3000/cartItem", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//       body: JSON.stringify({pizzaId,quantity}), // Convert pizza object to JSON
//     });

//     if (result.result) {
//       message.success("Pizza Added to Cart!");
//       return await result.data.json();
//     }
//   } catch (error) {
//     throw Error(error.message);
//   }
// };

const send = async ({ pizzaId, quantity }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:3000/cartItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pizzaId:pizzaId, quantity:quantity }),
    });

    if (response.ok) {
      const result = await response.json();
      message.success("Pizza Added to Cart!");
      return result;
    } else {
      throw new Error("Failed to add pizza to cart.");
    }
  } catch (error) {
    message.error("Error adding pizza to cart: " + error.message);
    throw Error(error.message);
  }
};


const AddCartItems = (pizza,setCartItems) => {
  let reload=true;
  setCartItems((prevState) => {
    for (let item of prevState) {
      if (item.pizzaId === pizza.pizzaId) {
        item.quantity +=1;
        reload=false;
        return [...prevState];
      }
    }
    return [...prevState, pizza];
  });
  console.log('RELOAD :',reload)
  return reload;
};



const sendToCart = ({pizzaId,quantity}) => {
  const { data, error, loading } = useQuery({
    queryKey: ["cartItem"],
    queryFn: send({pizzaId,quantity}),
  });
};

export default function AddToCart({ pizzaId,quantity }) {
  const { authenticated } = useContext(AuthContext);
  let cartContext = null;
  if (authenticated) {
    cartContext = useContext(CartContext);
  }

  const handleAddToCart = async () => {
    let reload;
    if (authenticated) {
      const { setCartItems } = cartContext;
      await send({ pizzaId, quantity }).then(
        (result) => {
          if (result) {
            reload = AddCartItems(result, setCartItems);
          }
        }
      );
      if (reload) {
        setTimeout(()=>{
          return window.location.reload();
        },500)
      }
      return;
    }
    return window.location.href = "/login"; // Redirect to login if not authenticated
  };

  return (
    <button
      className="custom-button-card w-full h-full rounded-[5px] bg-red-500"
      onClick={handleAddToCart}>
      Add To Cart
    </button>
  );
}
