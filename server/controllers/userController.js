const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.json({
        success: false,
        message: "user not found ",
      });
    }

    return res.json({
      success: true,
      message: "Login successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "internal server error",
    });
  }
};

const registerController = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.json({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message:
          "Password do not match. Please try again.",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    //create user
    await userModel.create({
      email:email,
      password:password,
    });

    return res.status(200).json({
      success: true,
      message: "Register successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
    console.log(error)
  }
};
module.exports = { loginController, registerController };
