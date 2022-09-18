const userList = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Create JWT - AccessToken
const generateToken = async payload => {
    const {_id, username, password} = await payload
    const accessToken = jwt.sign({_id, username, password}, process.env.REACT_APP_JWT_SIGN, {
        expiresIn: '1h'
    });
    return accessToken
}

const login = async (req, res) => {
    const body = await req.body;
    if(body.username === "" || body.password === "") return res.sendStatus(403);
    const user = await userList.findOneAndUpdate( {username: body.username, password: body.password }, {isLogin: true});
    try {
        const token = await generateToken(user)
        res.json({token, user});
    } catch (error) {
        return res.sendStatus(403);
    } 
}

const logout = async (req, res) => {
    const token = await req.get('token');
    if(!token) { res.status(401); }
    try {
        const decoded = await jwt.verify(token, process.env.REACT_APP_JWT_SIGN);
        await userList.findOneAndUpdate( {username: decoded.username, password: decoded.password }, {isLogin: false});
        return res.sendStatus(200)
    } catch (error) { 
        return res.send(401)
    }    
}

module.exports = {login, logout}