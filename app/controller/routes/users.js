const express = require("express");
const router = express.Router();

const users = require('../../models/users')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
	getAllUsers,
	createUser,
	getUser,
	updateUser,
	deleteUser,
	loginUser,
} = require('../users/users.js')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
router.route('/login').post(loginUser)

module.exports = router;
