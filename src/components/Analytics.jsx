import React from "react";
import { Progress, Space } from "antd";
const Analytics = ({ data }) => {
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

  const totalIncomeTurnover = Math.round(
    totalTransection
      .filter((transection) => transection.refrence === "Income")
      .reduce((acc, transection) => acc + transection.amount, 0)
  );

  const totalExpenseTurnover = Math.round(
    totalTransection
      .filter((transection) => transection.refrence === "Expense")
      .reduce((acc, transection) => acc + transection.amount, 0)
  );

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className=" w-fit border-2 px-4 m-4 border-neutral-500 rounded-md ">
        <p className=" text-2xl border-b-2 py-2 border-neutral-500">
          Total Transaction :{" "}
          <span className=" font-medium ">{totalTransection.length}</span>
        </p>
        <p className="text-2xl py-2 text-green-500">
          Income :{" "}
          <span className=" font-medium">{totalIncomeTransection.length}</span>
        </p>
        <p className="text-2xl py-2 text-red-500">
          Expense :{" "}
          <span className=" font-medium">{totalExpenseTransection.length}</span>
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
    </div>
  );
};

export default Analytics;
