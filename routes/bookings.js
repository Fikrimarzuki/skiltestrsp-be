const router = require("express").Router();
const BookingController = require("../controllers/BookingController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.use(authentication);
router.use("/", authorization);
router.get("/", BookingController.findAll);
router.post("/", BookingController.create);
router.get("/:id", BookingController.findOne);
router.put("/:id", BookingController.update);
router.delete("/:id", BookingController.remove);

module.exports = router;
