const transectionModel = require("../models/transactionModel");
const moment = require("moment");
const getAllTransaction = async (req, res) => {
  try {
    const frequency = req.body.frequency;
    // console.log("this is frequency", frequency);
    const userid = req.user.id;
    // console.log("this is user id ", userid);
    const transections = await transectionModel.find({ userid: userid });
    // console.log("this is transection", transections);
    if (!transections || transections.length === 0) {
      return res.status(401).json({
        success: false,
        message: "No transection found",
      });
    }

    const startDate = moment().subtract(Number(frequency), "d").toDate();
    // Filter transactions based on the calculated start date
    const filteredTransactions = transections.filter(
      (transaction) => new Date(transaction.date) > startDate
    );

    if (filteredTransactions.length === 0) {
      return res.status(401).json({
        success: false,
        message: "No transactions found within the specified frequency",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Success fully get all items",
      transections:filteredTransactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Please try again",
    });
  }
};

//addtransection
const addAllTransaction = async (req, res) => {
  try {
    const { amount, category, refrence, description, date } = req.body;
    const userid = req.user.id;
    //veryfy user id if present or not
    if (!userid) {
      return res.status(403).json({
        success: false,
        message: "Unauthorize token",
      });
    }
    if (!amount || !category || !description || !date) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }
    const newTransection = new transectionModel({
      userid,
      amount,
      category,
      refrence,
      description,
      date,
    });

    await newTransection.save();

    return res.status(200).json({
      success: true,
      message: "Transaction Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Please try again",
    });
  }
};

module.exports = { getAllTransaction, addAllTransaction };
