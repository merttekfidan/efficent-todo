const Todo = require("./../models/todoModel");
exports.sayHello = (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Hello",
  });
};
// todoid:60c122b804d985df59ccaae9
exports.test = async (req, res) => {
  try {
    const todo = await Todo.create({ title: "Test1" });
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createTodo = async (req, res) => {
  try {
    if (req) {
      var todo = await Todo.create(req.body);
      if (req.body.parentTodo) {
        //Doesnt EXECUTE, work on findbyidandupdate. Yenisini eklemiyor eskisini güncelliyor.
        var todo = await Todo.findByIdAndUpdate(
          req.body.parentTodo,
          {
            subTodo: todo._id,
          },
          { new: true },
          (err, doc) => {}
        );
      }

      res.status(200).json({
        status: "success",
        data: { todo: todo },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todo = await Todo.find().populate();
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (err) {
    console.log(err);
  }
};
