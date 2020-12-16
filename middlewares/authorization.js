const pool = require("../config/config");

module.exports = (req, res, next) => {
	const id = +req.params.id;
	const userId = req.userId
	let query = `SELECT * FROM bookings where id = ${id};`
	pool.query(query, (err, data) => {
		if (err) {
			next({
				name: "You are not authorize",
				status: 401,
				msg: "You are not authorize"
			})
		} else {
			next();
		}
	})
}