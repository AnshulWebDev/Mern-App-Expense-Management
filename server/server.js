const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/connectDB");
//config .env file
dotenv.config();

//database 
connectDB();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routs
app.get('/',(req,res)=>{
    res.send('<h1>Server is running</h1>')
});

//port
const PORT=8080||process.env.PORT

//listine server
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})