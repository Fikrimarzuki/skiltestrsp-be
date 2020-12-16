const pool = require("../config/config");
const { bookings: data } = require("../data/seedData.json");

let dropQuery = "DELETE FROM bookings;";

let query = `
	INSERT INTO bookings
	(user_id, room_id, total_person, booking_time, noted, check_in_time, check_out_time, created_at, updated_at, deleted_at)
	VALUES
	($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
`;

module.exports = {
	up: function() {
		console.log("Seeding data...");
		pool.query(query, (error, result, fields) => {
			if (error) throw error;
			else console.log("Done seeding to bookings");
			pool.end();
		})
	},

	down: function() {
		pool.query(dropQuery, (error, result, fields) => {
			if (error) throw error;
			else console.log("Done delete all data from bookings");
			pool.end();
		})
	}
}
