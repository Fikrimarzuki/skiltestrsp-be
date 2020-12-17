const router = require("express").Router();
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.use(authentication);
router.get("/", authorization.users, UserController.findAll);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.use("/:id", authorization.users);
router.get("/:id", UserController.findOne);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.remove);

module.exports = router;
