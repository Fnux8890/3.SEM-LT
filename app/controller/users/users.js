const users = require("../../models/users")

const getAllUsers = async (req, res) => {
    try {
        const user = await users.find({})
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createUser = async (req, res) => {
    try {
        const user = await users.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getUser = async (req, res) => {
    try {
        const {id:userID} = req.params
        const user = await users.findOne({_id:userID})
    if(!user) {
        return res.status(404).json({msg:`No user with id: ${userID}}`})
    }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
    
}

const updateUser = (req, res) => {
    res.send("update user")
}

const deleteUser = (req, res) => {
    res.send("delete user")
}

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}