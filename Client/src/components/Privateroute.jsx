import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Privateroute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default Privateroute;
/*An <Outlet> should be used in parent route elements to render
 their child route elements. This allows nested UI to show up when 
 child routes are rendered. If the parent route matched exactly, it 
 will render a child index route or nothing if there is no
  index route.*/
  //Private route will be visible only to authorize user.