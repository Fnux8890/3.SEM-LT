const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
	console.log('hej ' + req.cookies);
	const token = req.cookies.jwt;
	console.log(token);

	if (token) {
		jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect('/login');
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect('/login');
	}
};

module.exports = { requireAuth };
