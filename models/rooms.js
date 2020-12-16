const pool = require("../config/config");

class RoomModel {
	static findAll(cb) {
		let query = "SELECT * FROM rooms;"
		pool.query(query, (err, data) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, data);
			}
		})
		pool.end();		
	}

	static findOne(id, cb) {
		let query = `SELECT * FROM rooms where id = ${id};`
		pool.query(query, (err, data) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, data);
			}
		})
	}

	static create(payload, cb) {
		const {
			room_name,
			room_capacity,
			photo,
			created_at,
			updated_at,
			deleted_at
		} = payload;
		let query = `
			INSERT INTO rooms
				(room_name, room_capacity, photo, created_at, updated_at, deleted_at)
			VALUES
				(${room_name}, ${room_capacity}, ${photo}, ${created_at}, ${updated_at}, ${deleted_at});
		`;
		pool.query(query, (err, data) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, data);
			}
		})
	}

	static update(payload, cb) {
		const {
			id,
			room_name,
			room_capacity,
			photo,
			created_at,
			updated_at,
			deleted_at
		} = payload;
		let query = `
			UPDATE rooms
			SET
				room_name = ${room_name},
				room_capacity = ${room_capacity},
				photo = ${photo},
				created_at = ${created_at},
				updated_at = ${updated_at},
				deleted_at = ${deleted_at}
			WHERE
				id = ${id};
		`;
		pool.query(query, (err, data) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, data);
			}
		})
	}

	static remove(id, cb) {
		let query = `DELETE FROM rooms WHERE id = ${id};`;
		pool.query(query, (err, data) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, data);
			}
		})
	}
}

module.exports = RoomModel;