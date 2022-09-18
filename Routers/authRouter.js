const express = require("express");
const {login, logout} = require("../Controllers/authController")

const loginRouter = express.Router();

loginRouter.post("/login", login)
loginRouter.post("/logout", logout)

module.exports = loginRouter  