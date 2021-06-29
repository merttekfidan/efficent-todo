const faker = require("faker");
const Project = require("./../projectModel");
const Todo = require("./../todoModel");
const server = require("./../../server");
const seedProject = async () => {
  const fieldArr = [];
  try {
    let data = {
      title: faker.lorem.words(),
      todos: [],
    };
    const todoIds = await Todo.aggregate([
      { $project: { id: "_id" } },
      { $sample: { size: 1 } },
    ]);
    console.log(todoIds.id);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

seedProject();
