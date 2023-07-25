const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.json({
        success: false,
        message: `Please fill all the fields`,
      });
    }
    // Find user with provided email
    const user = await userModel.findOne({email});

    // If user not found with provided email
    if (!user) {
      return res.json({
        success: false,
        message: "user not registered ",
      });
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
        console.log(token)
      // Save token to user document in database
      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).json({
        success: true,
        token,
        user,
        message: `Login Success`,
      });
      
    } else {
      return res.json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    return res.json({
			success: false,
			message: `Login Failure Please Try Again`,
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
        message: "Password do not match. Please try again.",
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

    const hashPassword = await bcrypt.hash(password, 10);

    //create user
    await userModel.create({
      email: email,
      password: hashPassword,
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
    console.log(error);
  }
};
module.exports = { loginController, registerController };
