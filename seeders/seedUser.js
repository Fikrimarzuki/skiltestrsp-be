const pool = require("../config/config");
const { users: data } = require("../data/seedData.json");

let dropQuery = "DELETE FROM users;";

let query = `
	INSERT INTO users
	(email, password, photo, created_at, updated_at, deleted_at)
	VALUES
	($1, $2, $3, $4, $5, $6);
`;

module.exports = {
	up: function() {
		console.log("Seeding data...");
		pool.query(query, (error, result, fields) => {
			if (error) throw error;
			else console.log("Done seeding to users");
			pool.end();
		})
	},

	down: function() {
		pool.query(dropQuery, (error, result, fields) => {
			if (error) throw error;
			else console.log("Done delete all data from users");
			pool.end();
		})
	}
}