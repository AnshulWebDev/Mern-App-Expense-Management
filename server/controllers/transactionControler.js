const transectionModel = require("../models/transactionModel");

const getAllTransaction = async (req, res) => {
  try {
    const transections = await transectionModel.find({
      userid: req.body.userid,
    });
    if (!transections) {
      return res.status(401).json({
        success: false,
        message: "No transection found",
      });
    }
    return res.status(200).json({
      success: true,
      transections,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please try again",
    });
  }
};

const addAllTransaction = async (req, res) => {
  try {
    const { amount, category, refrence, description, date } = req.body;
    const userid = req.user.id;
    //veryfy user id if present or not
    if(!userid){
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