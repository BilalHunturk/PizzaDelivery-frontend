import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

export default function Protected() {
  const { authenticated , setAuthenticated} = useContext(AuthContext);
  console.log("AUTHENTICATED IS ", authenticated);
  return <>{authenticated ? <Outlet /> : <Navigate to={"/login"} />}</>;
}
