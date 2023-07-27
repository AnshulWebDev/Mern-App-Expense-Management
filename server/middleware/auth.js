//auth
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    //extract jwt token
    const token  = req.body.token || req.cookies.token;
    console.log(token)
    // if (!token) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorize transection",
    //   });
    // }

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log(decode)
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorize token",
      });
    }
    next();
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Something went wrong while veryfy the token!",
    });
  }
};
