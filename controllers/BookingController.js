const { Booking } = require("../models/");

class BookingController {
	static findAll(req, res, next) {
		Booking.findAll((err, data) => {
			if (err) next(err);
			else res.status(200).json(data);
		})
	}

	static findOne(req, res, next) {
		const id = req.params.id;
		Booking.findOne(id, (err, data) => {
			if (err) next(err);
			else res.status(200).json(data);
		})
	}

	static create(req, res, next) {
		const payload = req.body;
		Booking.create(payload, (err, data) => {
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
		Booking.update(id, (err, data) => {
			if (err) {
				next(err);
			} else {
				res.status(200).json(data);
			}
		})
	}

	static remove(req, res, next) {
		const id = req.params.id;
		Booking.remove(id, (err, data) => {
			if (err) next(err);
			else res.status(200).json(data);
		})
	}
}

module.exports = BookingController;
