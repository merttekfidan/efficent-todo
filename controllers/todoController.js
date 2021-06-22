const Todo = require("./../models/todoModel");
const catchAsync = require("./../utils/catchAsync");
var ObjectID = require("mongodb").ObjectID;

const status = async (statusCode, data, res) => {
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

exports.getTodos = catchAsync(async (req, res, next) => {
  const todo = await Todo.find();
  if (todo) {
    status(200, todo, res);
  } else {
    status(404, null, res);
  }
});

exports.getTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    status(200, todo, res);
  } else {
    status(404, null, res);
  }
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.deleteOne({ _id: req.params.id });
  console.log(todo);
  if (todo.deletedCount > 0) {
    status(204, null, res);
  } else {
    status(404, null, res);
  }
});

exports.createTodo = catchAsync(async (req, res, next) => {
  if (req) {
    // Adds a todo
    var todo = await Todo.create(req.body);

    if (todo) {
      status(201, todo, res);
    } else {
      status(404, null, res);
    }
  }
});

exports.flipStatus = catchAsync(async (req, res, next) => {
  if (req) {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {},
      { new: true },
      function (err, val) {
        val.completed = !val.completed;
        val.save();
        res.status(200).json({
          data: val,
        });
      }
    );
  }
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  if (req) {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (todo) {
      status(200, todo, res);
    } else {
      status(404, null, res);
    }
  }
});
