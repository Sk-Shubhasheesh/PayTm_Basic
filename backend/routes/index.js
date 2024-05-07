const express = require("express");
const userRouter = require('./user');

// The function is used to create a new router object.
const router = express.Router();

router.use("/user", userRouter);

module.exports = router;
