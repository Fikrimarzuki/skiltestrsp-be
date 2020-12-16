const pool = require("../config/config");

let dropQuery = `DROP DATABASE IF EXISTS Meeting_Room;`;

let query = `CREATE DATABASE IF NOT EXISTS Meeting_Room;`;

module.exports = {
	up: function() {
		pool.query(query, (error, result, fields) => {
			if (error) throw error;
			else console.log("Database created");
			pool.end();
		})
	},

	down: function() {
		pool.query(dropQuery, (error, result, fields) => {
			if (error) throw error;
			else console.log("Database deleted");
			pool.end();
		})
	}
}