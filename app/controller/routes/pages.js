const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/user-auth');

router.route('/login').get((req, res) => {
	res.render('login');
});

router.route('/createaccount').get((req, res) => {
	res.render('createaccount');
});

router.get('/user-overview', userAuth, (req, res) => {
	res.render('user-overview');
});

router.get('/module-overview', userAuth, (req, res) => {
	res.render('module-overview');
});

router.get('/exercise1', userAuth, (req, res) => {
	res.render('exercise1');
});

module.exports = router;
