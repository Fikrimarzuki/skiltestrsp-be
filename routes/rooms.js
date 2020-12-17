const router = require("express").Router();
const RoomController = require("../controllers/RoomController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.use(authentication);
router.get("/", RoomController.findAll);
router.use("/", authorization.rooms);
router.post("/", RoomController.create);
router.use("/:id", authorization.rooms);
router.get("/:id", RoomController.findOne);
router.put("/:id", RoomController.update);
router.delete("/:id", RoomController.remove);

module.exports = router;
