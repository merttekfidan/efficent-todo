const Todo = require("./../models/todoModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllTodos = catchAsync(async (req, res, next) => {
  const todos = await Todo.find();
  if (!todos) {
    return next(new AppError("No Todos found with this Id", 404));
  }
  res.render("index.ejs", { todos });
});
