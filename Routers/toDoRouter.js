const express = require("express");
const { addNewToDo, getToDo, updateTodo, deleteToDo,  } = require("../Controllers/todoController");

const toDoRouter = express.Router();

toDoRouter.post("/", addNewToDo)
toDoRouter.put("/", updateTodo)
toDoRouter.get("/", getToDo)
toDoRouter.delete("/:todoId", deleteToDo) 

module.exports = toDoRouter;