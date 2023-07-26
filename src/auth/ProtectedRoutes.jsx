import React from "react";
import useAuth from "./useAuth";

const ProtectedRoutes = ({ children }) => {
  // Check if the user is logged in
  const isLoggedIn = useAuth();

  // If the user is logged in, render the protected content
  if (isLoggedIn) {
    return <>{children}</>;
  } else {
    // If the user is not logged in, redirect to the login page (not necessary, as it's handled by useAuth)
    return null; // Return null to avoid rendering anything in case of redirect
  }
};

export default ProtectedRoutes;
