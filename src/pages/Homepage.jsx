import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import DataTable from "../components/DataTable";
import {AiOutlineUnorderedList,AiOutlineAreaChart} from "react-icons/ai"
import Analytics from "../components/Analytics";
const Homepage = () => {
  const token = Cookies.get("token");
  const [showModal, setShowModal] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState({
    frequency: "7",
    token: token,
  });
  const [viewData,setViewData] = useState('table');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [useToken, setUsetoken] = useState({
    token: token,
  });

  //send all inputs
  const [form, setForm] = useState({
    amount: "",
    category: "salary",
    refrence: "Income",
    description: "",
    date: "",
    token: token,
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/home/add-transaction",
        form
      );
      // console.log(form)
      if (response.data.success == true) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      // console.log(error);
      toast.error("something went wrong", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  //for frequency filter
  const frequencychangeHandler = (event) => {
    const { name, value } = event.target;
    setFrequency((prev) => ({ ...prev, [name]: value }));
  };

  const submitFrequency = async (event) => {
    event.preventDefault();
    // console.log(frequency);
  };

  useEffect(() => {
    //get all transection
    const getAllTransection = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/home/get-transaction",
          frequency
        );
        const transection = response.data.transections;
        // console.log(response)
        // console.log("response", transection);
        setAllTransection(transection);
        // console.log(allTransection);
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };
    getAllTransection();
  }, [frequency]);
  return (
    <Layout>
      <div className="min-h-screen">
        <div className=" mx-auto max-w-screen-xl flex items-center justify-between px-4 py-5 shadow-md">
          <div>
            <h6>Select Frequency</h6>
            <select
              id="frequency"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              defaultValue="salary"
              required=""
              name="frequency"
              value={frequency.frequency}
              onChange={frequencychangeHandler}
              onClick={submitFrequency}
            >
              <option value="7">Last 1 Week</option>
              <option value="30">Last 1 Month</option>
              <option value="365">Last 1 Year</option>
            </select>
          </div>
          <div className=" flex mx-2 border-2 border-neutral-500 rounded-md px-1.5 py-1">
            <AiOutlineUnorderedList className={`${viewData==='table'?'text-red-500': 'text-black'} mx-2 text-2xl hover:cursor-pointer`} onClick={()=>setViewData('table')}/>
            <AiOutlineAreaChart className={`${viewData==='analytics'?'text-red-500': 'text-black'} mx-2 text-2xl hover:cursor-pointer`} onClick={()=>setViewData('analytics')}/>
          </div>
          <div>
            <button
              type="submit"
              className="text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm md:px-5 md:py-2.5 sm:px-4 sm:py-3 px-3 py-2 text-center"
              onClick={toggleModal}
            >
              Add New
            </button>
            {showModal && (
              <div
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-2 overflow-x-hidden overflow-y-auto md:inset-0 backdrop-filter backdrop-blur-sm"
                id="crypto-modal"
                tabIndex="-1"
                aria-hidden="true"
              >
                <div className="relative w-full max-w-md max-h-full backdrop-filter backdrop-blur-sm">
                  <div className="relative bg-white rounded-lg shadow">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                      onClick={toggleModal}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        ></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-4 border-b rounded-t ">
                      <h3 className="text-base font-semibold text-gray-900 lg:text-xl ">
                        Add Transection
                      </h3>
                    </div>
                    <div className="p-4">
                      <form
                        className="p-6 flex flex-col items-center"
                        onSubmit={submitHandler}
                      >
                        <div className="mb-2 w-full">
                          <label
                            htmlFor="amount"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Amount
                          </label>
                          <input
                            type="number"
                            id="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                            placeholder="Enter amount"
                            required=""
                            name="amount"
                            value={form.amount}
                            onChange={changeHandler}
                          />
                        </div>

                        <div className="mb-2 w-full">
                          <label
                            htmlFor="type"
                            className="block mb-2 text-sm font-medium text-gray-900"
                            required=""
                          >
                            Type
                          </label>
                          <select
                            id="refrence"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                            defaultValue="Income"
                            required=""
                            name="refrence"
                            value={form.refrence}
                            onChange={changeHandler}
                          >
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                          </select>
                        </div>

                        <div className="mb-2 w-full">
                          <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Category
                          </label>
                          <select
                            id="category"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                            defaultValue="salary"
                            required=""
                            name="category"
                            value={form.category}
                            onChange={changeHandler}
                          >
                            <option value="salary">Salary</option>
                            <option value="tip">Tip</option>
                            <option value="project">Project</option>
                            <option value="Food">Food</option>
                            <option value="bills">Bills</option>
                            <option value="medical">Medical</option>
                            <option value="fee">Fee</option>
                            <option value="tax">Tax</option>
                          </select>
                        </div>

                        <div className="mb-2 w-full">
                          <label
                            htmlFor="date"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Amount
                          </label>
                          <input
                            type="date"
                            id="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                            placeholder="Enter amount"
                            required=""
                            name="date"
                            value={form.date}
                            onChange={changeHandler}
                          />
                        </div>

                        <div className="mb-2 w-full">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            id="description"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                            placeholder="Enter description"
                            required=""
                            name="description"
                            value={form.description}
                            onChange={changeHandler}
                          />
                        </div>

                        <button
                          type="submit"
                          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                          SAVE
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {
          viewData==='table'?(<DataTable data={allTransection} />):(<Analytics data={allTransection}/>)
        }
      </div>
    </Layout>
  );
};

export default Homepage;
