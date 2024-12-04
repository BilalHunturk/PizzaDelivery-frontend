import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

// PrivateRoute bileşeni, eğer token varsa bileşeni render eder, yoksa login sayfasına yönlendirir
const PrivatePage = ({ children }) => {
  const { authenticated , setAuthenticated} = useContext(AuthContext);
  console.log('PRIVATE PAGE.');
  
  if (login !== true) {
    return <Navigate to="/login" />; // Eğer token yoksa login sayfasına yönlendir
  }

  return children; // Token varsa child component'leri render et
};

export default PrivatePage;