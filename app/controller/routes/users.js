const express = require('express')
const router = express.Router()

const users = require('../../models/users')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
	getAllUsers,
	createUser,
	getUser,
	updateUser,
	deleteUser,
} = require('../users/users.js')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

/*router.post('/createaccount', (req, res, next) => {
	users
		.find({ username: req.body.username })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: 'Username exists',
				})
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status.json({
							error: err,
						})
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							name: req.body.username,
							password: hash,
						})
						user
							.save()
							.then(result => {
								console.log(result)
								res.status(201).json({
									message: 'User created',
								})
							})
							.catch(err => {
								console.log(err)
								res.status(500).json({
									error: err,
								})
							})
					}
				})
			}
		})
	console.log(req.body)
})

router.post('/login', (req, res, next) => {
	users
		.findOne({ name: req.body.username })
		.exec()
		.then(user => {
			if (user.length < 1) {
				//status 401 så "hackers" ikke kan se om username findes
				return res.status(401).json({
					message: 'Auth failed',
				})
			} else {
				return res.status(401).json({
					message: 'Auth succeeded',
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				error: err,
			})
		})
	console.log(req.body)
})*/

module.exports = router
