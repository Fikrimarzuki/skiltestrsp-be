class UserModel {
	static findAll(cb) {
		let query = "SELECT id, email, photo, created_at, updated_at FROM users;"
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
		let query = `SELECT id, email, photo, created_at, updated_at FROM users where id = ${id};`
		pool.query(query, (err, data) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, data);
			}
		})
	}

	static register(payload, cb) {
		const {
			email,
			password,
			photo
		} = payload;
		const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		let query = `
			INSERT INTO users
				(email, password, photo, created_at, updated_at, deleted_at)
			VALUES
				('${email}', '${password}', '${photo}', '${date}', '${date}', null);
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
			email,
			password,
			photo
		} = payload;
		const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		let query = `
			UPDATE users
			SET
				email = '${email}',
				password = '${password}',
				photo = '${photo}',
				updated_at = '${date}'
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
		let query = `DELETE FROM users WHERE id = ${id};`;
		pool.query(query, (err, data) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, data);
			}
		})
	}
}

module.exports = UserModel;