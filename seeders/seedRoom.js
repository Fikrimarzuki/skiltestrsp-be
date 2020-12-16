const pool = require("../config/config");
const { rooms: data } = require("../data/seedData.json");

let dropQuery = "DELETE FROM rooms;";

let query = `
	INSERT INTO rooms
	(room_name, room_capacity, photo, created_at, updated_at, deleted_at)
	VALUES
	($1, $2, $3, $4, $5, $6);
`;

module.exports = {
	up: function() {
		console.log("Seeding data...");
		pool.query(query, (error, result, fields) => {
			if (error) throw error;
			else console.log("Done seeding to rooms");
			pool.end();
		})
	},

	down: function() {
		pool.query(dropQuery, (error, result, fields) => {
			if (error) throw error;
			else console.log("Done delete all data from rooms");
			pool.end();
		})
	}
}