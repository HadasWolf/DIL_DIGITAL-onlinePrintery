const ENVIRONMENT = process.env.INV || "development";

const connectToDB = () => {
  if (ENVIRONMENT === "production") return require("./mongodb/connectToAtlas");
  require("./mongodb/connectToMongoDBLocally");
};

module.exports = connectToDB;
