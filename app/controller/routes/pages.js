const express = require('express')
const users = require('../../models/users')
const router = express.Router()
const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.route('/login').get((req, res) => {
	res.render('login')
})

router.route('/createaccount').get((req, res) => {
	res.render('createaccount')
})

router.route('/user-overview').get((req, res) => {
	res.render('user-overview')
})

module.exports = router
