module.exports = function (err, req, res, next) {
	if (err && err.name && err.status) {
		res.status(err.status).json({ error: err.name, msg: err.msg });
	} else {
		res.status(500).json(err);
	}
}
