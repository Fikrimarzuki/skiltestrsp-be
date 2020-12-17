const pool = require("../config/config");

module.exports = {
	users: (req, res, next) => {
		const id = +req.userId;
		const adminId = 1;
		if (id === adminId) {
			next();
		} else {
			next({
				name: "You are not authorize",
				status: 401,
				msg: "You are not authorize"
			})
		}
	},
	rooms: (req, res, next) => {
		const id = +req.userId;
		const adminId = 1;
		if (id === adminId) {
			next();
		} else {
			next({
				name: "You are not authorize",
				status: 401,
				msg: "You are not authorize"
			})
		}
	},
	bookings:	(req, res, next) => {
		const id = +req.params.id;
		const userId = req.userId;
		let query = `
			SELECT
				booking.id,
				booking.user_id,
				booking.total_person,
				booking.booking_time,
				booking.noted,
				booking.check_in_time,
				booking.check_out_time,
				users.email AS email,
				rooms.room_name AS room
			FROM bookings booking
			INNER JOIN users ON users.id = booking.user_id
			INNER JOIN rooms ON rooms.id = booking.room_id
			WHERE booking.id = ${id}
			GROUP BY booking.id
			ORDER BY "ASC";
		`;
		pool.query(query, (err, data) => {
			if (err) {
				next(err);
			} else {
				if (data) {
					if (data.user_id === userId) {
						req.userEmail = data.email;
						req.room = data.room
						next();
					} else {
						next({
							name: "You are not authorize",
							status: 401,
							msg: "You are not authorize"
						})
					}
				} else {
					next({
						name: "You are not authorize",
						status: 401,
						msg: "You are not authorize"
					})
				}
			}
		})
	}
}