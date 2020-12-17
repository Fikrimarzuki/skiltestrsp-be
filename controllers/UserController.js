const { User } = require("../models/");
const { crypto, jwt } = require("../helpers");

class UserController {
	static findAll(req, res, next) {
		User.findAll((err, data) => {
			if (err) next(err);
			else res.status(200).json(data);
		})
	}

	static findOne(req, res, next) {
		const id = req.params.id;
		User.findOne(id, (err, data) => {
			if (err) next(err);
			else res.status(200).json(data);
		})
	}

	static register(req, res, next) {
		let payload = req.body;
		payload.password = crypto.hashHmacSHA512(payload.password);
		User.register(payload, (err, data) => {
			if (err) {
				next(err)
			} else {
				res.status(201).json({ msg: "register success"});
			}
		})
	}

	static login(req, res, next) {
		let { email, password } = req.body;
		User.login(email, (err, data) => {
			if (err) {
				next(err);
			} else {
				if (data && data.length) {
					password = crypto.hashHmacSHA512(password);
					if (data[0].password === password) {
						const token = jwt.generateToken({ id: data[0].id, email });
						res.status(200).json({ token });
					} else {
						next({
							name: "User not found",
							status: 400,
							msg: "Wrong input"
						})
					}
				} else {
					next(err);
				}
			}
		})
	}

	static update(req, res, next) {
		let payload = req.body;
		payload.id = req.params.id;
		User.update(payload, (err, data) => {
			if (err) {
				next(err);
			} else {
				res.status(200).json({ msg: "update success" });
			}
		})
	}
	
	static remove(req, res, next) {
		const id = req.params.id;
		User.remove(id, (err, data) => {
			if (err) next(err);
			else res.status(200).json({ msg: "delete success" });
		})
	}
}

module.exports = UserController;
