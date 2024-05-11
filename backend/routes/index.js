const express = require("express");
const userRouter = require('./user');
const accountRouter = require("./account");
// The function is used to create a new router object.
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
module.exports = router;
