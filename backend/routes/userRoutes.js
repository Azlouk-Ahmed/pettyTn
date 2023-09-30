const express = require("express");
const {signUpUser, loginUser} = require("../controllers/userController")

const userRoute = express.Router();

userRoute.post('/signup',signUpUser);

userRoute.post('/login',loginUser);

module.exports = userRoute;