const users = require('../../models/users')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res) => {
	try {
		const user = await users.find({})
		res.status(200).json({ user })
	} catch (error) {
		res.status(500).json({ msg: error })
	}
}

const createUser = async (req, res) => {
	try {
		users
			.find({ username: req.body.username })
			.exec()
			.then(user => {
				if (user.length >= 1) {
					return res.status(409).json({
						message: 'name already exists',
					})
				} else {
					bcrypt.hash(req.body.password, 10, (err, hash) => {
							if (err) {
								return res.status(500).json({
									error:err
								})
							} 
							else {
								const newuser = users.create({
						username: req.body.username,
						password: hash
							
						})
						res.status(200).json({ newuser })
					}
					})
				}
			})
	} catch (error) {
		res.status(500).json({ msg: error })
	}
}

const getUser = async (req, res) => {
	try {
		const { id: userID } = req.params
		const user = await users.findOne({ _id: userID })
		if (!user) {
			return res.status(404).json({ msg: `No user with id: ${userID}}` })
		}
		res.status(200).json({ user })
	} catch (error) {
		res.status(500).json({ msg: error })
	}
}

const updateUser = async (req, res) => {
	try {
		const { id: userID } = req.params
		const user = await users.findOneAndUpdate({ _id: userID }, req.body, {
			new: true,
			runValidators: true,
		})
		if (!user) {
			return res.status(404).json({ msg: `No user with id: ${userID}}` })
		}
		res.status(200).json({ user })
	} catch (error) {
		res.status(500).json({ msg: error })
	}
}

const deleteUser = async (req, res) => {
	try {
		const { id: userID } = req.params
		const user = await users.findOneAndDelete({ _id: userID })
		if (!user) {
			return res.status(404).json({ msg: `No user with id: ${userID}}` })
		}
		res.status(200).json({ user })
	} catch (error) {
		res.status(500).json({ msg: error })
	}
}

module.exports = {
	getAllUsers,
	createUser,
	getUser,
	updateUser,
	deleteUser,
}
