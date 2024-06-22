const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const path = require("node:path");

const envPath = path.join(__dirname, "..", ".env");

require("dotenv").config({ path: envPath });

const usersRouter = require("./routes/api/users");

const app = express();

const formatLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

module.exports = app;