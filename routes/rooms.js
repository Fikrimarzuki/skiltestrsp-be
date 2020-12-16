const router = require("express").Router();
const RoomController = require("../controllers/RoomController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", RoomController.findAll);
router.post("/", RoomController.create);
router.get("/:id", RoomController.findOne);
router.put("/:id", RoomController.update);
router.delete("/:id", RoomController.remove);

module.exports = router;
