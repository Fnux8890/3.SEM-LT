const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
			if (err) {
				res.redirect("/page/login");
			} else {
				next();
			}
		});
	} else {
		res.redirect("/page/login");
	}
};

module.exports = { requireAuth };
