const pool = require("../config/config");

let dropQuery = "DROP TABLE IF EXISTS users CASCADE;";

let query = `
	CREATE TABLE IF NOT EXISTS users (
		id INT AUTO_INCREMENT PRIMARY KEY,
		email VARCHAR(255),
		password VARCHAR(255),
		photo VARCHAR(255),
		created_at timestamp DEFAULT CURRENT_TIMESTAMP,
		updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		deleted_at timestamp DEFAULT '2000-01-01 00:00:00'
	);
`;

module.exports = {
	up: function(cb) {
		pool.query(query, (error, result, fields) => {
			if (error) throw error;
			else 
				console.log("done migrate for table users");
				cb();
			// pool.end();
		})
	},

	down: function(cb) {
		pool.query(dropQuery, (error, result, fields) => {
			if (error) throw error;
			else
				console.log("done undo migrate for table users");
				cb()
			// pool.end();
		})
	}
}