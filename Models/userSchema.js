const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    isLogin: {
        type: Boolean,
        default: false
    } 
})

const myDB = mongoose.connection.useDb('Todo_app');
const userList = myDB.model("userData", userSchema);

module.exports = userList