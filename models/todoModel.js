const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "This field is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  deadlineDate: {
    type: Date,
    default: null,
  },
  urgent: Boolean,
  important: Boolean,
  description: {
    type: String,
    trim: true,
  },
  repetative: {
    type: String,
    enum: {
      values: ["day", "week", "month", "weekdays"],
    },
  },
  categories: [String],
  underFiveMins: {
    type: Boolean,
    default: true,
  },
  subTodo: [{ type: mongoose.Schema.ObjectId, ref: "Todo" }],
});
//60c12295d2a87bdd7add7c96
todoSchema.pre(/^find/, function (next) {
  this.populate({
    path: "subTodo",
  });
  next();
});
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
