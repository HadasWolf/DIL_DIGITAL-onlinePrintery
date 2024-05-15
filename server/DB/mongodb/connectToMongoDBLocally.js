const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const ENVIRONMENT = config.get("NODE_ENV");

const DB_NAME = config.get("DB_NAME");
const DB_PASSWORD = config.get("DB_PASSWORD");

if (ENVIRONMENT === "development")
  mongoose
    .connect("mongodb://127.0.0.1:27017/BCard_hadas_wolf")
    .then(() =>
      console.log(
        chalk.magentaBright(
          "You have been connected to MongoDB Locally successfully!"
        )
      )
    )
    .catch((error) =>
      console.log(
        chalk.redBright(`Could not connect to mongoDb locally: ${error}`)
      )
    );

if (ENVIRONMENT === "production")
  mongoose
    .connect(
      `mongodb+srv://127.0.0.1:27017/${DB_NAME}:${DB_PASSWORD}BCard_david_yakin`
    )
    .then(() =>
      console.log(
        chalk.magentaBright(
          "You have been connected to MongoDB Atlas successfully!"
        )
      )
    )
    .catch((error) =>
      console.log(
        chalk.redBright(`Could not connect to mongoDb Atlas: ${error}`)
      )
    );
