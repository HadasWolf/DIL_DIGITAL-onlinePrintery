const chalk = require("chalk");

const handleError = (res, status = 404, message = "page not found") => {
  console.log(chalk.redBright(message));
  return res.status(status).send(message);
};

exports.handleError = handleError;
