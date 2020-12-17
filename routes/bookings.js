const router = require("express").Router();
const BookingController = require("../controllers/BookingController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.use(authentication);
router.use("/", authorization.bookings);
router.get("/", BookingController.findAll);
router.post("/", BookingController.create);
router.use("/:id", authorization.bookings);
router.patch("/:id/checkin", BookingController.checkIn);
router.get("/:id", BookingController.findOne);
router.put("/:id", BookingController.update);
router.delete("/:id", BookingController.remove);

module.exports = router;
