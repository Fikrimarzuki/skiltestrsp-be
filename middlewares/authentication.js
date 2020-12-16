const { User } = require("../models");
const { jwt } = require("../helpers/");

module.exports = (req, res, next) => {
	let token = req.headers.token;
	if (token) {
		const payload = jwt.verifyToken(token);
		User.findOne(payload.id, (err, data) => {
			if (err) {
				next({
					name: "You are not authenticate",
					status: 400,
					msg: "Please log in first"
				})
			} else {
				if (data) {
					req.userId = payload.id;
					next();
				} else {
					next({
						name: "User not found",
						status: 400,
						msg: "Try to log in again"
					})
				}
			}
		})
	} else {
		next({
			name: "You are not authenticate",
			status: 400,
			msg: "Please log in first"
		})
	}
}
