import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  // Check if the token cookie exists
  const tokenCookie = Cookies.get("token");

  // If the token cookie exists, the user is logged in, render the protected content
  if (tokenCookie) {
    return <>{children}</>;
  } else {
    // If the token cookie does not exist, redirect to the login page
    navigate("/login");
    return null;
  }
};

export default ProtectedRoutes;
