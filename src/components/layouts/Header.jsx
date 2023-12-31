import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = Cookies.get("token");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Remove the user token from the cookies
    Cookies.remove("token");
    toast.success("Log out successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/");
  };

  const [openMenu,setOpenMenu]=useState(false)
  const openMenuHandler=()=>{
    setOpenMenu((prev)=>!prev);
  }
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={"/"} className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              EM
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {isLoggedIn ? (
              // User is logged in, show the user dropdown
              <>
                <Link to={"/user"}>
                  <img
                    className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Bordered avatar"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-600 ml-2 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 md:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Sign out
                </button>
              </>
            ) : (
              // User is not logged in, show login and register buttons
              <>
                <Link
                  to={"/login"}
                  className="text-gray-800 hover:bg-[#F0483E] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log in
                </Link>
                <Link
                  to={"/register"}
                  className="text-gray-800 bg-primary-700 focus:outline-none focus:ring focus:ring-red-600 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                >
                  Sign up
                </Link>
              </>
            )}
            <button
               onClick={openMenuHandler}
               type="button"
               className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
               aria-controls="mobile-menu-2"
               aria-expanded={openMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-6 h-6 ${openMenu ? 'hidden' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className={`w-6 h-6 ${openMenu ? '' : 'hidden'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`${
              openMenu ? 'block mt-3 z-50' : 'hidden'
            } justify-between bg-[#F9FAFB] items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to={"/home"}
                  className="block py-2 pr-4 pl-3 text-black rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:text-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Company
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:text-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:text-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:text-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:text-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
