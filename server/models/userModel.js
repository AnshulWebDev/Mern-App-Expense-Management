const mongoose = require("mongoose");

//schema design
const userSchema = new mongoose.Schema(
  {

    email: {
      type: String,
      required: true,
      trim:true,
    },
    password: {
      type: String,
      required: true,
      trim:true,
    },
    token: {
			type: String,
		},
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
