const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
// const colors = require("colors");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
//config .env file
dotenv.config();
//port
const PORT = 8080 || process.env.PORT;
//database
connectDB();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS middleware
app.use(
  cors({
    origin: "*",
    credentials: true, // Enable CORS credentials (cookies)
  })
);
app.use(cookieParser());

//routs
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/users", require("./routes/transactionRoute"));



//listine server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
