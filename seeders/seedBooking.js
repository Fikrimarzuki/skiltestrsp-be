const pool = require("../config/config");
const { bookings: data } = require("../data/seedData.json");

let query = "INSERT INTO bookings SET ?;";
let dropQuery = "DELETE FROM bookings;";

module.exports = {
	up: function(cb) {
		data.forEach((el, index) => {
			const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			let tomorrowDate = new Date();
			tomorrowDate.setDate(tomorrowDate.getDate() + 1);
			tomorrowDate = tomorrowDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
			let payload = {
				user_id: el.user_id,
				room_id: el.room_id,
				total_person: el.total_person,
				booking_time: date,
				noted: el.noted,
				check_in_time: date,
				check_out_time: tomorrowDate,
				created_at: date,
				updated_at: date,
				deleted_at: null
			};
			pool.query(query, payload, (error, result, fields) => {
				if (error) throw error;
				else
					if (index === data.length - 1) cb();
				// pool.end();
			})
		})
	},

	down: function(cb) {
		pool.query(dropQuery, (error, result, fields) => {
			if (error) throw error;
			else cb();
			// pool.end();
		})
	}
}
