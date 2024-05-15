const normalizeCard = require("../cards/helpers/normalizeCard");
const validateCard = require("../cards/models/joi/validateCard");
const Card = require("../cards/models/mongoose/Card");
const normalizeUser = require("../users/helpers/normalizeUser");
const registerValidation = require("../users/models/joi/registerValidation");
const User = require("../users/models/mongoose/User");
const data = require("./initialData.json");
const chalk = require("chalk");

const generateInitialCards = async () => {
  const { cards } = data;
  const userId = "649d3238bac95e85fa0f0546";
  cards.forEach(async (card) => {
    try {
      console.log(card.title);
      const { error } = validateCard(card);
      if (error) throw new Error(`Joi Error: ${error.details[0].message}`);

      const normalizedCard = await normalizeCard(card, userId);

      const cardToDB = new Card(normalizedCard);

      await cardToDB.save();

      console.log(
        chalk.greenBright(`Generate card '${card.title}' successfully`)
      );
    } catch (error) {
      console.log(
        chalk.redBright(`Initial Data Generate Card Error: ${error.message}`)
      );
    }
  });
};

const generateInitialUsers = async () => {
  const { users } = data;

  users.forEach(async (user) => {
    try {
      const { email } = user;
      const { error } = registerValidation(user);
      if (error) throw new Error(`Joi Error: ${error.details[0].message}`);

      const isUserExistInDB = await User.findOne({ email });
      if (isUserExistInDB) throw new Error("user already registered");

      const normalaizeUser = await normalizeUser(user);
      const userForDB = new User(normalaizeUser);

      await userForDB.save();

      console.log(
        chalk.greenBright(`Generate user '${user.name.first}' successfully`)
      );
    } catch (error) {
      console.log(
        chalk.redBright(`Initial Data Generate user Error: ${error.message}`)
      );
    }
  });
};

exports.generateInitialCards = generateInitialCards;
exports.generateInitialUsers = generateInitialUsers;
