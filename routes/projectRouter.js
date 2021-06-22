const express = require("express");
const projectController = require("./../controllers/projectController");
const router = express.Router();

router
  .route("/")
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route("/:id")
  .get(projectController.getAProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

router.patch("/:id/addTodo", projectController.addTodoToProject);
module.exports = router;
