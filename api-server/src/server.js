const mongoose = require("mongoose");

const app = require("./app");

const { MONGO_DB_HOST, API_SERVER_PORT = 8000 } = process.env;

mongoose
  .connect(MONGO_DB_HOST, {
    authSource: "admin",
  })
  .then(() => {
    console.log("Database connection successful");
    app.listen(API_SERVER_PORT, () => {
      console.log(`Server running. Use our API on port: ${API_SERVER_PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
