const path = require("path");
const express = require("express");
const app = express();

const todoRouter = require("./routes/todoRouter");
const projectRouter = require("./routes/projectRouter");
const viewRouter = require("./routes/viewRouter");

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Serving static files
app.use(express.static(path.join(__dirname, `public`)));
app.use("/", viewRouter);
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/project", projectRouter);

module.exports = app;
