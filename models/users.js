class UserModel {
	static findAll(cb) {
		let query = "SELECT * FROM users;"
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
		let query = `SELECT * FROM users where id = ${id};`
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
			email,
			password,
			photo,
			created_at,
			updated_at,
			deleted_at
		} = payload;
		let query = `
			INSERT INTO users
				(email, password, photo, created_at, updated_at, deleted_at)
			VALUES
				(${email}, ${password}, ${photo}, ${created_at}, ${updated_at}, ${deleted_at});
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
			photo,
			created_at,
			updated_at,
			deleted_at
		} = payload;
		let query = `
			UPDATE users
			SET
				email = ${email},
				password = ${password},
				photo = ${photo},
				created_at = ${created_at},
				updated_at = ${updated_at},
				deleted_at = ${deleted_at}
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