const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const path = require("node:path");

const envPath = path.join(__dirname, "..", ".env");
const staticPath = path.join(__dirname, "static");

require("dotenv").config({ path: envPath });

const usersRouter = require("./routes/api/users");
const iconsRouter = require("./routes/api/icons");
const backgroundsRouter = require("./routes/api/backgrounds");
const boardsRouter = require("./routes/api/boards");
const columsRouter = require("./routes/api/columns");
const tasksRouter = require("./routes/api/tasks");

const app = express();

const formatLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());
app.use("/api/static", express.static(staticPath));

app.use("/api/users", usersRouter);
app.use("/api/icons", iconsRouter);
app.use("/api/backgrounds", backgroundsRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/columns", columsRouter);
app.use("/api/tasks", tasksRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

module.exports = app;
