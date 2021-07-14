const faker = require("faker");
const Project = require("./../projectModel");
const Todo = require("./../todoModel");
const todoSeeder = require("./todoSeeder");

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.seedProject = async (n = 1) => {
  const fieldArr = [];
  try {
    const todoIds = await Todo.find().select("_id");
    if (!todoIds) todoSeeder.seedTodo(5);
    for (let i = 0; i < n; i++) {
      let data = {
        title: faker.lorem.words(),
        todos: [],
      };
      let random = randomIntFromInterval(1, 5);
      for (let i = 0; i < random; i++) {
        data.todos.push(todoIds[randomIntFromInterval(1, todoIds.length)]);
      }
      fieldArr.push(data);
    }

    const projects = await Project.create(fieldArr);
    console.log(projects);
  } catch (err) {
    console.log(err);
  }
};
