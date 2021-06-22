const Project = require("./../models/projectModel");
const Todo = require("./../models/todoModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createProject = catchAsync(async (req, res, next) => {
  const project = await Project.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: project,
    },
  });
});

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find();

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: { data: projects },
  });
});

exports.getAProject = catchAsync(async (req, res, next) => {
  const project = await Project.findOne({ _id: req.params.id });
  if (!project) {
    return next(new AppError("No projects found with this Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: { data: project },
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!project) {
    return next(new AppError("No projects found with this Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: { data: project },
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.deleteOne({ _id: req.params.id });
  if (!project.deletedCount > 0) {
    return next(new AppError("No projects found with this Id", 404));
  }
  res.status(204).json({
    status: "success",
    data: {},
  });
});

exports.addTodoToProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { todos: req.body.todoId },
    },
    { new: true }
  );
  if (!project) {
    return next(new AppError("No Todo found with this Id", 404));
  }
  res.status(201).json({
    status: "success",
    data: { data: project },
  });
});

exports.replaceTodoFromProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { todos: req.body.todoId },
    },
    { new: true }
  );
  if (!project) {
    return next(new AppError("No Todo found with this Id", 404));
  }
  res.status(201).json({
    status: "success",
    data: { data: project },
  });
});
