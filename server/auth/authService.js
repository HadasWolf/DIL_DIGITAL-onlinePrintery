const { model } = require("mongoose");
const { handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./Providers/jwt");
const config = require("config");

const KEY = config.get("JWT_KEY");
const auth = (req, res, next) => {
  try {
    const tokenFromClient = req.header("x-auth-token");
    if (!tokenFromClient) throw new Error("Authentication Error: Please login");
    const userPayload = verifyToken(tokenFromClient, KEY);
    req.user = userPayload;
    return next();
  } catch (error) {
    handleError(res, 403, error.message);
  }
};

module.exports = auth;
