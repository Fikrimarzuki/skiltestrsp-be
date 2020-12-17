const { Room, Booking } = require("../models/");
const nodemailer = require("nodemailer");

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
		const { room_id, total_person, booking_time } = payload;
		var todayDate = new Date().toISOString().slice(0,10);
		var bookingDate = new Date(booking_time).toISOString().slice(0,10);
		Room.findOne(room_id, (error, data) => {
			if (error) {
				next(error);
			}	else {
				if (data) {
					if (data.room_capacity >= total_person) {
						Booking.create(payload, (err, result) => {
							if (err) {
								next(err)
							} else {
								const transporter = nodemailer.createTransport({
									service: "gmail",
									auth: {
										user: "admin@mail.com",
										pass: "Superpass"
									}
								})
								const mailOptions = {
									from: "admin@gmail.com",
									to: req.userEmail,
									subject: "Booking Invoice",
									text: `
										Hello,
										
										Thank for your purchase from us.
										This is your order information:
											Room: ${data.room_name},
											Total Person: ${data.total_person},
											Booking Time: ${data.booking_time},
											Noted: ${data.noted},
											Check In Time: ${data.check_in_time},
											Check Out Time: ${data.check_out_time}

										Don't forget to check in at the time.
									`
								}
								transporter.sendMail(mailOptions, function(error, info) {
									if (error) {
										throw new Error(error);
									}
								})
								if (todayDate === bookingDate) {
									const mailOptions2 = {
										from: "admin@gmail.com",
										to: req.userEmail,
										subject: "Today is Your Booking Time",
										text: `
											Hello,
											
											We like to inform you that your booking time at:
												Room Name: ${req.room}
												Date: ${data.booking_time}
											is today, dont forget to booking at the right time

											Thank you
										`
									}
									transporter.sendMail(mailOptions2, function(error, info) {
										if (error) {
											throw new Error(error);
										}
									})
								}
								res.status(201).json(data);
							}
						})
					} else {
						next({
							name: "Room Capacity Not Enough",
							status: 400,
							msg: "Total person must be less equal than room capacity"
						});						
					}
				} else {
					next({
						name: "Room Not Found",
						status: 404,
						msg: "Room Not Found"
					});
				}
			}		
		})
	}

	static update(req, res, next) {
		let payload = req.body;
		payload.id = req.params.id;
		Booking.update(payload, (err, data) => {
			if (err) {
				next(err);
			} else {
				res.status(200).json({ msg: "update success" });
			}
		})
	}
	
	static checkIn(req, res, next) {
		const id = +req.params.id;
		const { check_in_time } = req.body;
		var checkInDate = new Date(check_in_time).toISOString().slice(0,10);
		const payload = { id, checkInDate };
		Booking.checkIn(payload, (err, data) => {
			if (err) {
				next(err);
			} else {
				const transporter = nodemailer.createTransport({
					service: "gmail",
					auth: {
						user: "admin@mail.com",
						pass: "Superpass"
					}
				})
				const mailOptions = {
					from: "admin@gmail.com",
					to: req.userEmail,
					subject: "Check In Confirmation",
					text: `
						Hello,
						
						We want to inform you that you already check in.
					`
				}
				transporter.sendMail(mailOptions, function(error, info) {
					if (error) {
						throw new Error(error);
					}
				})
				res.status(200).json({ msg: "check in success"});
			}
		})
	}

	static remove(req, res, next) {
		const id = req.params.id;
		Booking.remove(id, (err, data) => {
			if (err) next(err);
			else res.status(200).json({ msg: "delete success" });
		})
	}
}

module.exports = BookingController;
