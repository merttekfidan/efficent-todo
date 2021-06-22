const Todo = require("./../models/todoModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getTodos = catchAsync(async (req, res, next) => {
  const todos = await Todo.find();
  if (!todos) {
    return next(new AppError("No Todos found with this Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: { data: todos },
  });
});

exports.getTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return next(new AppError("No Todos found with this Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: { data: todo },
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.deleteOne({ _id: req.params.id });
  console.log(todo);
  if (!todo.deletedCount > 0) {
    return next(new AppError("No Todos found with this Id", 404));
  }
  res.status(204).json({
    status: "success",
    data: {},
  });
});

exports.createTodo = catchAsync(async (req, res, next) => {
  var todo = await Todo.create(req.body);
  res.status(201).json({
    status: "success",
    data: { data: todo },
  });
});

exports.flipStatus = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    {},
    { new: true },
    function (err, val) {
      if (!val) {
        return next(new AppError("No Todos found with this Id", 404));
      }
      val.completed = !val.completed;
      val.save();
      res.status(200).json({
        status: "success",
        data: { data: val },
      });
    }
  );
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!todo) {
    return next(new AppError("No Todos found with this Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: { data: todo },
  });
});
