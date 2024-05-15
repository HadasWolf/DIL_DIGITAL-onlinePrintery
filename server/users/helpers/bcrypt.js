const bcrypt = require("bcryptjs");

const generateUserPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (passwordFromClient, passwordFromDB) => {
  return bcrypt.compareSync(passwordFromClient, passwordFromDB);
};

exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;
