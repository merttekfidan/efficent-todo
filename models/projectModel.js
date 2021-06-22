const mongoose = require("mongoose");
const Todo = require("./todoModel");
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title field is required"],
  },
  todos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Todo",
    },
  ],
});

projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "todos",
  });
  next();
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
