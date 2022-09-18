const express = require("express");
const { getInfoUser, addNewUser, updateUser, logoutUser } = require("../Controllers/userController");
const verifyToken = require("../Middleware/verifyToken");

const userRouter = express.Router();

userRouter.get("/:userid", getInfoUser)
userRouter.post("/", addNewUser)
userRouter.put("/",verifyToken, updateUser)
userRouter.delete("/logout",verifyToken, logoutUser)

module.exports = userRouter;