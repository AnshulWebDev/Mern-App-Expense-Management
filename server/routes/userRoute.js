const express = require("express");
const { loginController, registerController } = require("../controllers/userController");
const {auth}=require('../middleware/auth')

//router object
const router = express.Router();

//routers
router.post("/login", loginController);
router.post("/register", registerController);

//protected routs
router.get("/home",auth,(req,res)=>{
    res.send('Welcome to the home page!')});

module.exports = router;
