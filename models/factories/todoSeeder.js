const faker = require("faker");
const Todo = require("./../todoModel");

exports.seedTodo = async (n = 1, routine = false) => {
  try {
    const repetativeArr = ["day", "week", "month", "weekdays"];
    const fieldArr = [];

    for (let i = 0; i < n; i++) {
      let data = {
        title: faker.lorem.words(),
        urgent: faker.datatype.boolean(),
        deadLineDate: faker.date.between("2021-01-29", "2022-01-29"),
        import: faker.datatype.boolean(),
        completed: faker.datatype.boolean(),
        description: faker.lorem.sentence(),
        repetative:
          routine === true
            ? repetativeArr[Math.floor(Math.random() * repetativeArr.length)]
            : "not",
        underFiveMins: faker.datatype.boolean(),
      };
      fieldArr.push(data);
    }

    const todos = await Todo.create(fieldArr);
    console.log(todos);
  } catch (err) {
    return err;
  }
};
