import React from "react";
import Layout from "../components/layouts/Layout";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <Layout>
      <div className="h-full bg-[#FFE9D6] px-6 py-5">
        <div className="  mx-auto max-w-screen-xl flex flex-col lg:my-20 md:my-16 sm:my-12">
          <p className=" text-black text-4xl sm:text-5xl font-bold  lg:w-4/6 mb-0.5">
            Increase efficiency with streamlined
          </p>
          <p className=" text-[#d6461e] text-4xl sm:text-5xl font-bold mb-3 lg:w-4/6">
            expense management
          </p>
          <p className=" text-base lg:w-2/4 mb-6">
            XYZ Expense offers you robust features to upload any business charge
            you encounter, saving you time, money, and stress. Never allow
            another expense to go unaccounted for.
          </p>
          <div className="">
            <Link to={'/login'}>
              <button className=" rounded-lg w-56 h-12 text-xl bg-red-600 mb-2 mr-5 text-white hover:shadow-[inset_14rem_0_0_0] hover:shadow-red-500 duration-[300ms,500ms] transition-[color,box-shadow]">
                Already register?
              </button>
            </Link>
            <Link to={'/register'}>
              <button className=" rounded-lg w-56 h-12 text-xl bg-transparent border-black border-2 text-black hover:text-white hover:shadow-[inset_14rem_0_0_0] hover:shadow-black duration-[300ms,500ms] transition-[color,box-shadow]">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
