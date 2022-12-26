const userList = require("../Models/userSchema")

const getInfoUser = async (req, res) => {
    const userid = await req.params['userid']
    const info = await userList.findOne({ userid: userid })
    try {
        res.status(200).json(info)
    } catch (error) {
        res.status(400).send()
    }
}

const addNewUser = async (req, res) => {
    const user = await { ...req.body }
    const isContain = await userList.findOne({ username: user.username })
    const userSave = new userList(user)
    try {
        if (isContain) {
            res.status(409).send("This username is already taken")
        }
        await userSave.save()
        res.status(200).send(userSave)
    } catch (error) {
        res.status(400).send()
    }
}

const updateUser = async (req, res) => {
    const _id = req.body._id
    const updateUser = req.body

    try {
        await userList.findByIdAndUpdate(_id, updateUser)
        res.status(200).send()
    } catch (error) {
        res.status(400).send()
    }
}

const logoutUser = async (req, res) => {
    const user = await req.user
    user.refreshToken = ""
    try {
        await userList.findByIdAndUpdate(user._id, user)
        res.status(200).send()
    } catch (error) {
        res.status(400).send()
    }
}

module.exports = { getInfoUser, addNewUser, updateUser, logoutUser }