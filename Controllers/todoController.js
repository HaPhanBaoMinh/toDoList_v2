const todoList = require("../Models/todosSchema")

const addNewToDo = async (req, res) => {
    const todo = await {...req.body}
    const todosave = new todoList(todo)
    try {
        await todosave.save()
        res.status(200).send(todosave)    
    } catch (error) {
        res.status(400).send()
    }
}

const getToDo = async (req, res) => {
    const userid = await req.user._id
    !userid && res.status(400).send()
    const list = await todoList.find({userID: userid})
    try {
        res.status(200).json(list)    
    } catch (error) {
        res.status(400).send()
    }
}

const deleteToDo = async (req, res) => { 
    const _id = await req.params['todoId']
    try {
        await todoList.findOneAndDelete({_id: _id})
        res.status(200).send()    
    } catch (error) {
        res.status(400).send()
    }
}

const updateTodo = async (req, res) => {
    const _id = req.body._id
    const updateTodo = req.body
    try {
        await todoList.findByIdAndUpdate(_id, updateTodo)
        res.status(200).send()    
    } catch (error) {
        res.status(400).send()
    }

}

module.exports = {addNewToDo, getToDo, updateTodo, deleteToDo}