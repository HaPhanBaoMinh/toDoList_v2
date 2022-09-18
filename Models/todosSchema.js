const mongoose = require("mongoose");
const { Schema } = mongoose;

const todosSchema = new Schema({
    userID: String,
    Name: String,
    Description: String, 
    Deadline: Date,
    Status: {
        type: String,
        default: "todo"
    }
})

const myDB = mongoose.connection.useDb('Todo_app');
const todoList = myDB.model("todoData", todosSchema);

module.exports = todoList