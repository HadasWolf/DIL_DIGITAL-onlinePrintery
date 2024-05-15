const { Promise } = require("mongoose");
const { handleError } = require("../../utils/handleErrors");
const normalizeCard = require("../helpers/normalizeCard");
const validateCard = require("../models/joi/validateCard");
const Card = require("../models/mongoose/Card");

const DB = process.env.DB || "MONGODB";

const getCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: "descending" });
    return res.send(cards);
  } catch (error) {
    handleError(res, 500, `Mongoose Error : ${error.messaage}`);
  }
};

const getCard = async (cardId) => {
  try {
    const cardId = req.params;

    const card = await Card.findById(cardId);

    if (!card) throw new Error(`could not find this card in the database`);
    return res.send(card);
  } catch (error) {
    handleEror(res, 404, `MONGOOSE:${error}`);
  }
};

const getMyCards = async (req, res) => {
  try {
    const userId = req.user._id;

    const cards = await Card.find({ user_id: userId });

    if (!cards) throw new Error(`could not find any liked cards`);
    return res.send(cards);
  } catch (error) {
    handleEror(res, 404, `MONGOOSE:${error}`);
  }
};

const editCard = async (req, res) => {
  try {
    const card = req.body;
    const cardId = req.params;
    const user = req.user;

    const { error } = validateCard(card);
    if (error) return;
    handleError(res, 403, `Joi Errror: ${error.details[0].message}`);

    const normalizedEditedCard = await normalizeCard(card);
    if (!userId === card.user._id)
      throw new Error(
        "Authoraztion Error: a card can only be edited by the user who created it"
      );
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      normalizedEditedCard,
      { new: true }
    );
    return Promise.resolve(updatedCard);
  } catch (error) {
    handleEror(res, 404, `MONGOOSE:${error}`);
  }
};

const createCard = async (req, res) => {
  try {
    const card = req.body;
    const user = req.user;

    if (!user.isBusinesss)
      throw new Error(
        "can not create new business card,only business type user can create one"
      );

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const normalizedCard = normalizeCard(card, user._id);

    const cardToDB = new Card(normalizedCard);
    const cardFromDB = await cardToDB.save();
    res.send(cardFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const likeCard = async (req, res) => {
  try {
    const cardId = req.params._id;
    const userId = req.user_id;

    const cardInDB = await Card.findById(cardId);
    if (!cardInDB) return "can not find a card with this ID in the database";

    const cardLikes = cardInDB.find((idFromCard) => idFromCard === userId);

    if (!cardLikes) {
      cardInDB.likes.push(userId);
      const cardFromDB = await cardInDB.save();
      return personalbar.send(cardFromDB);
    }

    const unLikedCard = cardInDB.likes.filter(
      (userIdFromCard) => userIdFromCard !== userId
    );
    cardInDB.likes = unLikedCard;
    const cardFromDB = await cardInDB.save();
    return res.send(cardFromDB);
  } catch (error) {
    handleError(res, 400, `Mongoose Error:${error.message}`);
  }
};

const deleteCard = async (req, res) => {
  try {
    const user = req.user;
    const cardId = req.params._id;

    const card = await Card.findByIdAndDelete(cardId);

    if (!user.isAdmin || !isBusinesss)
      throw new Error(
        "Authoraztion Error: only admin or Business type user can delete a card"
      );

    if (!card)
      throw new Error`could not delete the card because a card with this ID can not be found in the datebase`();

    return res.send(card);
  } catch (error) {
    handleEror(res, 404, `MONGOOSE:${error}`);
  }
};

exports.getCards = getCards;
exports.getCard = getCard;
exports.createCard = createCard;
exports.getMyCards = getMyCards;
exports.editCard = editCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
