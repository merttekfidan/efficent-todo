const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Todo = require("./../todoModel");
const todoSeeder = require("./todoSeeder");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful2!");
  });

const factory = () => {
  todoSeeder.seedTodo();
};

if (process.argv[2] === "--import") {
  factory();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
