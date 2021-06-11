const express = require("express");
const todoController = require("./../controllers/todoController");
const router = express.Router();

//router.use("/", todoController.sayHello);
router.use("/test", todoController.test);
router.use("/subtest", todoController.subTest);
router.use("/findtest", todoController.findTest);

module.exports = router;
