const { Room } = require("../models/");

class RoomController {
	static findAll(req, res, next) {
		Room.findAll((err, data) => {
			if (err) next(err);
			else res.status(200).json(data);
		})
	}

	static findOne(req, res, next) {
		const id = req.params.id;
		Room.findOne((err, data) => {
			if (err) next(err);
			else res.status(200).json(data);
		})
	}

	static create(req, res, next) {
		const payload = req.body;
		Room.create(payload, (err, data) => {
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
		Room.update(id, (err, data) => {
			if (err) {
				next(err);
			} else {
				res.status(200).json(data);
			}
		})
	}

	static remove(req, res, next) {
		const id = req.params.id;
		Room.remove(id, (err, data) => {
			if (err) next(err);
			else res.status(200).json(data);
		})
	}
}

module.exports = RoomController;
