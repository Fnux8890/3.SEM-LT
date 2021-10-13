const express = require('express')
const router = express.Router()

router.route('/login').get((req, res) => {
	res.render('login')
})

router.route('/createaccount').get((req, res) => {
	res.render('createaccount')
})

router.route('/user-overview').get((req,res) => {
	res.render('user-overview')
})

module.exports = router
