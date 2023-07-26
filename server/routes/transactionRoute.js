const express = require("express");
const {
  addAllTransaction,
  getAllTransaction,
} = require("../controllers/transactionControler");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/home/get-transaction", auth, getAllTransaction);
router.post("/home/add-transaction", auth, addAllTransaction);

module.exports = router;
