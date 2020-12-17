const pool = require("../config/config");

class RoomModel {
	static findAll(cb) {
		let query = "SELECT * FROM bookings;"
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
		let query = `SELECT * FROM bookings where id = ${id};`
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
			user_id,
			room_id,
			total_person,
			booking_time,
			noted,
			check_in_time,
			check_out_time
		} = payload;
		const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		let query = `
			INSERT INTO bookings
				(user_id, room_id, total_person, booking_time, noted, check_in_time, check_out_time, created_at, updated_at, deleted_at)
			VALUES
				(${user_id}, ${room_id}, ${total_person}, '${booking_time}', '${noted}', '${check_in_time}', '${check_out_time}', '${date}', '${date}', null);
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
			user_id,
			room_id,
			total_person,
			booking_time,
			noted,
			check_in_time,
			check_out_time
		} = payload;
		const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		let query = `
			UPDATE bookings
			SET
				user_id = ${user_id},
				room_id = ${room_id},
				total_person = ${total_person},
				booking_time = ${booking_time},
				noted = ${noted},
				check_in_time = ${check_in_time},
				check_out_time = ${check_out_time},
				updated_at = ${date}
			WHERE
				id = ${id};
		`
		pool.query(query, (err, data) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, data);
			}
		})
	}

	static checkIn(payload, cb) {
		const {
			id,
			checkInDate
		} = payload;
		const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		let query = `
			UPDATE bookings
			SET
				check_in_time = ${checkInDate},
				updated_at = ${date}
			WHERE
				id = ${id};
		`
		pool.query(query, (err, data) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, data);
			}
		})
	}

	static remove(id, cb) {
		let query = `DELETE FROM bookings WHERE id = ${id};`;
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