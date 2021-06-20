const mongoose = require("mongoose");
const Todo = require("./todoModel");
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "This field is required"],
  },
  todos: [{ type: mongoose.Schema.ObjectId, ref: "Todo" }],
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
