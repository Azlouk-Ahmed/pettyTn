const User = require("../models/user");
const jwt = require("jsonwebtoken")


const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: "365d" })
}

const signUpUser = async (req , res) => {
    const {email, password, codePostal, location, country, img, name, surname} = req.body;
    try {
        const user = await User.signUp(email, password, codePostal, location, country, img, name, surname);
        const token = generateToken(user._id);
        res.status(200).json({user, token});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.logIn(email, password);
        const token = generateToken(user._id);
        res.status(200).json({user,token});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

module.exports = {signUpUser, loginUser};