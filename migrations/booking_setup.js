const pool = require("../config/config");

let dropQuery = "DROP TABLE IF EXISTS bookings CASCADE;";

let query = `
	CREATE TABLE IF NOT EXISTS bookings (
		id INT AUTO_INCREMENT PRIMARY KEY,
		user_id INT,
		room_id INT,
		total_person INT,
		booking_time datetime,
		noted text,
		check_in_time datetime,
		check_out_time datetime,
		created_at timestamp DEFAULT CURRENT_TIMESTAMP,
		updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		deleted_at timestamp DEFAULT '2000-01-01 00:00:00',
		FOREIGN KEY (user_id) REFERENCES users(id),
		FOREIGN KEY (room_id) REFERENCES rooms(id)
	)
`;

module.exports = {
	up: function(cb) {
		pool.query(query, (error, result, fields) => {
			if (error) throw error;
			else
				console.log("done migrate for table bookings");
				cb();
			// pool.end();
		})
	},

	down: function(cb) {
		pool.query(dropQuery, (error, result, fields) => {
			if (error) throw error;
			else
				console.log("done undo migrate for table booking");
				cb();
			// pool.end();
		})
	}
}