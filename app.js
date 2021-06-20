const express = require("express");
const app = express();

const todoRouter = require("./routes/todoRouter");
const projectRouter = require("./routes/projectRouter");
app.use(express.json());
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/project", projectRouter);

module.exports = app;
