const { User } = require("../models/");

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

	static create(req, res, next) {
		const payload = req.body;
		User.create(payload, (err, data) => {
			if (err) {
				next(err)
			} else {
				res.status(200).json(data);
			}
		})
	}

	static update(req, res, next) {
		let payload = req.body;
		payload.id = req.params.id;
		User.update(id, (err, data) => {
			if (err) {
				next(err);
			} else {
				res.status(200).json(data);
			}
		})
	}
	
	static remove(req, res, next) {
		const id = req.params.id;
		User.remove(id, (err, data) => {
			if (err) next(err);
			else res.status(200).json(data);
		})
	}
}

module.exports = UserController;
