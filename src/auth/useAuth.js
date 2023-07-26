import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
  const navigate = useNavigate();

  // Check if the token cookie exists
  const tokenCookie = Cookies.get("token");

  useEffect(() => {
    // If the token cookie doesn't exist, redirect to the login page
    if (!tokenCookie) {
      navigate("/login");
    }
  }, [navigate, tokenCookie]);

  return !!tokenCookie; // Return true if the token exists (user is logged in), otherwise false
};

export default useAuth;
