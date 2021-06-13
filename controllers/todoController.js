const Todo = require("./../models/todoModel");
const catchAsync = require("./../utils/catchAsync");

exports.getTodos = catchAsync(async (req, res, next) => {
  const todo = await Todo.find();
  res.status(200).json({
    status: "success",
    data: todo,
  });
});

exports.createTodo = catchAsync(async (req, res, next) => {
  if (req) {
    // Adds a todo
    var todo = await Todo.create(req.body);
    if (req.body.parentTodoId) {
      // Finds parent todo and adds a sub todo
      var todo = await Todo.findByIdAndUpdate(
        req.body.parentTodoId,
        {
          $push: { subTodo: todo._id },
        },
        { new: true }
      );
    }

    res.status(201).json({
      status: "success",
      data: { todo },
    });
  }
});

exports.flipStatus = catchAsync(async (req, res, next) => {
  if (req) {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {},
      function (err, val) {
        val.completed = !val.completed;
        val.save();
      }
    );
    res.status(200).json({
      status: "success",
      data: { todo },
    });
  }
});
