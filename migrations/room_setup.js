const pool = require("../config/config");

let dropQuery = "DROP TABLE IF EXISTS rooms CASCADE;";

let query = `
	CREATE TABLE IF NOT EXISTS rooms (
		id INT AUTO_INCREMENT PRIMARY KEY,
		room_name VARCHAR(255),
		room_capacity VARCHAR(255),
		photo VARCHAR(255),
		created_at timestamp DEFAULT CURRENT_TIMESTAMP,
		updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		deleted_at timestamp DEFAULT '2000-01-01 00:00:00'
	)
`;

module.exports = {
	up: function(cb) {
		pool.query(query, (error, result, fields) => {
			if (error) throw error;
			else
				console.log("done migrate for table rooms");
				cb();
			// pool.end();
		})
	},

	down: function(cb) {
		pool.query(dropQuery, (error, result, fields) => {
			if (error) throw error;
			else
				console.log("done undo migrate for table rooms");
				cb();
			// pool.end();
		})
	}
}