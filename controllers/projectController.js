const Project = require("./../models/projectModel");
const Todo = require("./../models/todoModel");
const catchAsync = require("./../utils/catchAsync");

status = (statusCode, data, res) => {
  if (statusCode === 404) {
    res.status(statusCode).json({
      status: "fail",
    });
  } else {
    res.status(statusCode).json({
      status: "success",
      data,
    });
  }
};

exports.createProject = catchAsync(async (req, res, next) => {
  const project = await Project.create(req.body);
  if (project) {
    status(200, project, res);
  } else {
    status(500, null, res);
  }
});
exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find();
  if (projects) {
    status(200, projects, res);
  } else {
    status(500, null, res);
  }
});
exports.getAProject = catchAsync(async (req, res, next) => {
  const project = await Project.findOne({ _id: req.params.id });
  if (project) {
    status(200, projects, res);
  } else {
    status(500, null, res);
  }
});
exports.updateProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body);
  if (project) {
    status(200, projects, res);
  } else {
    status(500, null, res);
  }
});
exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.deleteOne({ _id: req.params.id });
  if (project.deletedCount > 0) {
    status(204, null, res);
  } else {
    status(500, null, res);
  }
});
