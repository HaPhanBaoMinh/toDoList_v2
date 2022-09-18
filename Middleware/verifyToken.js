const jwt = require("jsonwebtoken");
const userList = require("../Models/userSchema");
require("dotenv").config;

const findUserByID = async (userId) => {
    const reuslt = await userList.findOne({_id: userId}); 
    return reuslt
}

const verifyToken = async (req, res, next) => {
    const token = await req.get('token');
    if(!token) { res.status(401); }
    try {
        const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SIGN);
        const result = await findUserByID(decoded._id);
        req.user = result
        console.log(result);
        if(!result || !result.isLogin) return res.send(401)
        return next()
    } catch (error) { 
        return res.send(401)
    }    
}

module.exports = verifyToken