import React from "react";
import { Progress, Space } from "antd";
import { BsCurrencyRupee } from "react-icons/bs";
const Analytics = ({ data }) => {
  //category
  const category = [
    "salary",
    "tip",
    "project",
    "Food",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  //total transection
  const totalTransection = data;
  const totalIncomeTransection = data.filter(
    (item) => item.refrence === "Income"
  );
  const totalExpenseTransection = data.filter(
    (item) => item.refrence === "Expense"
  );

  const totalIncome = Math.round(
    (totalIncomeTransection.length / totalTransection.length) * 100
  );
  const totalExpense = Math.round(
    (totalExpenseTransection.length / totalTransection.length) * 100
  );

  //   console.log("this is total Expense", totalExpense);
  // console.log(data);

  //total turnover
  const totalTurnover = Math.round(
    totalTransection.reduce((acc, transection) => acc + transection.amount, 0)
  );

  const totalIncomeTurnover = totalTransection
    .filter((transection) => transection.refrence === "Income")
    .reduce((acc, transection) => acc + transection.amount, 0);

  const totalExpenseTurnover = totalTransection
    .filter((transection) => transection.refrence === "Expense")
    .reduce((acc, transection) => acc + transection.amount, 0);

  const totalIncomeTurnoverPercent = Math.round(
    (totalIncomeTurnover / totalTurnover) * 100
  );

  const totalExpenseTurnoverPercent = Math.round(
    (totalExpenseTurnover / totalTurnover) * 100
  );

  return (
    <div className="mx-auto max-w-screen-xl px-3 ">
      <div className="flex my-6 flex-col items-center sm:gap-6 sm:flex-row">
        <div className=" w-full border-2  border-neutral-500 rounded-md ">
          <p className=" text-2xl border-b-2 flex py-2 px-3 border-neutral-500">
            Total Transaction :{" "}
            <span className=" font-medium  ml-1 flex items-center">
              {totalTransection.length}
            </span>
          </p>
          <p className="text-2xl py-2 px-3 flex text-green-500">
            Income :{" "}
            <span className=" font-medium ml-1 flex items-center">
              {totalIncomeTransection.length} <BsCurrencyRupee />
            </span>
          </p>
          <p className="text-2xl py-2 px-3 flex text-red-500">
            Expense :{" "}
            <span className=" font-medium ml-1 flex items-center">
              {totalExpenseTransection.length} <BsCurrencyRupee />
            </span>
          </p>
          <Progress
            type="circle"
            strokeColor={"green"}
            className=" mx-2 my-3"
            percent={totalIncome}
          />
          <Progress
            type="circle"
            strokeColor={"red"}
            className=" mx-2 my-3"
            percent={totalExpense}
          />
        </div>

        <div className=" w-full border-2  border-neutral-500 rounded-md ">
          <p className=" text-2xl border-b-2 py-2 px-3 flex border-neutral-500">
            Total Turnover :
            <span className=" font-medium ml-1 flex items-center">
              {totalTurnover} <BsCurrencyRupee />
            </span>
          </p>
          <p className="text-2xl py-2 px-3 flex text-green-500">
            Income :{" "}
            <span className=" font-medium ml-1 flex items-center">
              {totalIncomeTurnover} <BsCurrencyRupee />
            </span>
          </p>
          <p className="text-2xl py-2 px-3 flex text-red-500">
            Expense :{" "}
            <span className=" font-medium ml-1 flex items-center">
              {totalExpenseTurnover} <BsCurrencyRupee />
            </span>
          </p>
          <Progress
            type="circle"
            strokeColor={"green"}
            className=" mx-2 my-3"
            percent={totalIncomeTurnoverPercent}
          />
          <Progress
            type="circle"
            strokeColor={"red"}
            className=" mx-2 my-3"
            percent={totalExpenseTurnoverPercent}
          />
        </div>
      </div>

      <div className=" flex flex-col sm:gap-6 sm:flex-row">
        <div className="w-full border-2 px-6 border-neutral-500 rounded-md mb-4">
          <div className="text-2xl py-2 flex flex-col">
            <h4 className=" my-5">Categorywise Income</h4>
            {category.map((categories) => {
              const amount = totalTransection
                .filter(
                  (transection) =>
                    transection.refrence === "Income" &&
                    transection.category === categories
                )
                .reduce((acc, transection) => acc + transection.amount, 0);
              return (
                <div>
                  <div>
                    <h5>
                      {categories}
                      <Progress
                        percent={Math.round(
                          (amount / totalIncomeTurnover) * 100
                        )}
                      />
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full border-2 px-6 border-neutral-500 rounded-md mb-4">
          <div className="text-2xl py-2 flex flex-col">
            <h4 className=" my-5">Categorywise Expense</h4>
            {category.map((categories) => {
              const amount = totalTransection
                .filter(
                  (transection) =>
                    transection.refrence === "Expense" &&
                    transection.category === categories
                )
                .reduce((acc, transection) => acc + transection.amount, 0);
              return (
                <div className="">
                  <div>
                    <h5>
                      {categories}
                      <Progress
                        percent={Math.round(
                          (amount / totalExpenseTurnover) * 100
                        )}
                      />
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
