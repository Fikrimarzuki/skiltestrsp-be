const router = require("express").Router();
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", UserController.findAll);
router.post("/", UserController.create);
router.get("/:id", UserController.findOne);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.remove);

module.exports = router;
