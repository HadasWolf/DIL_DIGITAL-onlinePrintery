const { compare } = require("bcryptjs");
const { handleError } = require("../../utils/handleErrors");
const normalizeUser = require("../helpers/normalizeUser");
const registerValidation = require("../models/joi/registerValidation");
const User = require("../models/mongoose/User");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");

const loginUser = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;

    const { error } = loginValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const userInDb = await user.findOne({ email });
    if (!userInDb)
      throw new Error("Authentication Error: invalid email or password");

    const isPasswordValid = comparePassword(user.password, userInDb.password);
    if (!isPasswordValid)
      throw new Error("Authentication Error: invalid email or password");

    const { _id, isBusiness, isAdmin } = userInDb;
    const token = generateAuthToken(_id, isBusiness, isAdmin);
    console.log(token);

    res.send(token);
  } catch (error) {
    const isAuthError =
      error.message === "Authentication Error: invalid email or password";
    return handleError(
      res,
      isAuthError ? 403 : 500,
      `Mongoose Error:${error.message}`
    );
  }
};

const register = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;

    const { error } = registerValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const isUserExistInDB = await user.findOne({ email });
    if (isUserExistInDB) throw new Error("user already registered");

    const normalaizeUser = normalizeUser(user);
    const userForDB = new User(normalaizeUser);
    const userFromDB = await userForDB.save();
    res.send(userFromDB);
  } catch (error) {
    const notUniqueUseError = error.message === "user already registered";
    return handleError(res, 500, `MONGOOSE Error:${error.message}`);
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { _id, isAdmin, isBusiness } = req.user;

    if (_id !== isAdmin && !userId && !isBusiness)
      return handleError(
        res,
        403,
        "Authorization Error: only the registered user admin or business type user can see the user detailes"
      );

    const user = await User.findById(userId, {
      password: 0,
      __v: 0,
    });

    if (!user) throw new Error("Could not find this user in the database");

    return res.send(user);
  } catch (error) {
    error.status = 404;
    return handleError(res, 500, `MONGOOSE Error:${error.message}`);
  }
};

const getUsers = async (req, res) => {
  try {
    const user = req.user;

    if (!user.isAdmin && !user.isBusiness)
      return handleError(
        res,
        403,
        "Authorization error: you must be admin or business typeuser to see all users in database"
      );

    const users = User.find({}, { password: 0, __v: 0 });

    return res.send(users);
  } catch (error) {
    return handleError(res, 500, `MONGOOSE Error:${error.message}`);
  }
};

const updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (id !== user._id && !user.isAdmin && !user.isBusiness)
      return handleError(
        res,
        403,
        `Authorization error:only the user himself admin or business type user can adit a user's detailes`
      );

    const userFromDB = await User.findByIdAndUpdate(id, user, { new: true });

    const normalaizeUser = normalizeUser(userFromDB);
    const userForDB = new User(normalaizeUser);
    const updatedUser = await userForDB.save();
    res.send(updatedUser);
  } catch (error) {
    return handleError(res, 400, `MONGOOSE Error:${error.message}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const userId = user._id;

    if (id !== userId && !user.isAdmin && !isbusiness)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin/business type user or the registered user to delete this user"
      );

    const deletedUser = await User.findByIdAndDelete(userId, {
      password: 0,
      __v: 0,
    });

    if (!deletedUser)
      throw new Error(
        "Could not delete this user because a user with this ID cannot be found in the database"
      );
    return res.sende(deletedUser);
  } catch (error) {
    return handleError(res, 400, `MONGOOSE Error:${error.message}`);
  }
};

// const changeUserBusinessStatus = (req, res) => {
//   res.send({ message: "in  changeUserBusinessStatus" });
// };

exports.register = register;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateuser = updateuser;
// exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
