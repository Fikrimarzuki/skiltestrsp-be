const pool = require("../config/config");

let dropQuery = "DROP TABLE IF EXISTS rooms CASCADE;";

let query = `
	CREATE TABLE IF NOT EXISTS rooms (
		id int AUTO_INCREMENT PRIMARY KEY,
		room_name varchar,
		room_capacity varchar,
		photo varchar,
		created_at timestamp,
		updated_at timestamp,
		deleted_at timestamp
	)
`;

module.exports = {
	up: function() {
		pool.query(query, (error, result, fields) => {
			if (error) throw error;
			else console.log("done migrate for table rooms");
			pool.end();
		})
	},

	down: function() {
		pool.query(dropQuery, (error, result, fields) => {
			if (error) throw error;
			else console.log("done undo migrate for table rooms");
			pool.end();
		})
	}
}