const express = require("express");
const TransactionController = require("../cotrollers/transactionController");
const router = express.Router();

router.get("/", TransactionController.getTransactionById);
// router.patch("/update/:id", TransactionController.changeStatusTransaction);
router.post("/payment/:cardid", TransactionController.payment);

module.exports = router;
