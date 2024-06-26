const mongoose = require("mongoose");

const fs = require("node:fs/promises");
const path = require("node:path");

const { Background } = require("./models/background");
const { Icon } = require("./models/icon");
const { TaskPriority } = require("./models/task");

const envPath = path.join(__dirname, "..", ".env");

require("dotenv").config({ path: envPath });

const { MONGO_DB_HOST } = process.env;

const initDbDataPath = path.join(__dirname, "..", "fixtures", "init-db");

(async () => {
  try {
    await mongoose.connect(MONGO_DB_HOST);
    console.log("Database connection successful");

    const backgroundIsExists = await Background.exists();

    if (!backgroundIsExists) {
      const backgroundData = await fs.readFile(
        path.join(initDbDataPath, "backgrounds.json"),
        "utf-8"
      );
      await Background.insertMany(JSON.parse(backgroundData));
    }

    const iconIsExists = await Icon.exists();

    if (!iconIsExists) {
      const iconData = await fs.readFile(
        path.join(initDbDataPath, "icons.json"),
        "utf-8"
      );
      await Icon.insertMany(JSON.parse(iconData));
    }

    const taskPriorityIsExists = await TaskPriority.exists();

    if (!taskPriorityIsExists) {
      const taskPriorityData = await fs.readFile(
        path.join(initDbDataPath, "task-priorities.json"),
        "utf-8"
      );
      await TaskPriority.insertMany(JSON.parse(taskPriorityData));
    }

    await mongoose.disconnect();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
