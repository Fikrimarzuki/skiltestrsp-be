const pool = require("../config/config");

let dropQuery = "DROP TABLE IF EXISTS bookings CASCADE;";

let query = `
	CREATE TABLE IF NOT EXISTS bookings (
		id int AUTO_INCREMENT PRIMARY KEY,
		user_id int,
		room_id int,
		total_person int,
		booking_time datetime,
		noted text,
		check_in_time datetime,
		check_out_time datetime,
		created_at timestamp,
		updated_at timestamp,
		deleted_at timestamp,
		FOREIGN KEY (user_id) REFERENCES users(id),
		FOREIGN KEY (room_id) REFERENCES rooms(id)
	)
`;

module.exports = {
	up: function() {
		pool.query(query, (error, result, fields) => {
			if (error) throw error;
			else console.log("done migrate for table bookings");
			pool.end();
		})
	},

	down: function() {
		pool.query(dropQuery, (error, result, fields) => {
			if (error) throw error;
			else console.log("done undo migrate for table booking");
			pool.end();
		})
	}
}