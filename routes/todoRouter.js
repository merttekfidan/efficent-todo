const express = require("express");
const todoController = require("./../controllers/todoController");
const router = express.Router();

//router.use("/", todoController.sayHello);
// router.use("/test", todoController.test);
// router.use("/subtest", todoController.subTest);
// router.use("/findtest", todoController.findTest);

router.route("/todos").get(todoController.getTodos);
router.route("/createTodo").post(todoController.createTodo);
router.route("/flipStatus/:id").patch(todoController.flipStatus);

module.exports = router;
