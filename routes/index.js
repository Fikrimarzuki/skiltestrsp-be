const router = require("express").Router();
const usersRoutes = require("./users");
const roomsRoutes = require("./rooms");
const bookingRoutes = require("./bookings");

router.get("/", (req, res, next) => {
	res.status(200).json("connect");
})
router.use("/users", usersRoutes);
router.use("/rooms", roomsRoutes);
router.use("/bookings", bookingRoutes);

module.exports = router;