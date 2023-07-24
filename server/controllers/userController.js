const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found ",
      });
    }

    return res.status(200).json({
        success: true,
        message: "Login successfully",
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    
    await newUser.save();

    return res.status(200).json({
        success: true,
        message: "Register successfully",
        newUser,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { loginController, registerController };
