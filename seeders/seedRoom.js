const pool = require("../config/config");
const { rooms: data } = require("../data/seedData.json");

let query = "INSERT INTO rooms SET ?;";
let dropQuery = "DELETE FROM rooms;";

module.exports = {
	up: function(cb) {
		data.forEach(el => {
			const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			let payload = { 
				room_name: el.room_name,
				room_capacity: el.room_capacity,
				photo: el.photo,
				created_at: date,
				updated_at: date,
				deleted_at: null
			};
			pool.query(query, payload, (error, result, fields) => {
				if (error) throw error;
				else cb();
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