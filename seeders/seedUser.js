const pool = require("../config/config");
const { users: data } = require("../data/seedData.json");

let query = "INSERT INTO users SET ?;";
let dropQuery = "DELETE FROM users;";

module.exports = {
	up: function(cb) {
		data.forEach((el, index) => {
			const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			let payload = { 
				email: el.email,
				password: el.password,
				photo: el.photo,
				created_at: date,
				updated_at: date,
				deleted_at: null
			};
			pool.query(query, payload, (error, result, fields) => {
				if (error) throw error;
				else 
					if (index === data.length - 1) cb();
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