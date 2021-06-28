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
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    trim: true,
  },
  repetative: {
    type: String,
    enum: {
      values: ["not", "day", "week", "month", "weekdays"],
    },
  },
  underFiveMins: {
    type: Boolean,
    default: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
