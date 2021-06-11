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

exports.subTest = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: "Test2",
      subTodo: "60c12295d2a87bdd7add7c96",
    });
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.findTest = async (req, res) => {
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
