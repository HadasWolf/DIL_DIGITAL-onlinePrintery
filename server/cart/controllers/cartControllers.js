// const { Promise } = require("mongoose");
const { handleError } = require("../../utils/handleErrors");
const normalizeCart = require("../helpers/normalizeCart");
// const validateCart = require("../models/joi/validateCart");
const chalk = require("chalk");
const Card = require("../../cards/models/mongoose/Card");
const Cart = require("../models/mongoose/Cart");

// const DB = process.env.DB || "MONGODB";

const getMyCartCards = async (req, res) => {
  try {
    const userId = req.user._id;

    const cards = await Card.find({ user_id: userId });

    if (!cards) throw new Error(`your cart is empty`);

    return res.send(cards);
  } catch (error) {
    handleEror(res, 404, `MONGOOSE:${error}`);
  }
};

const getCartCard = async (req, res) => {
  try {
    const cardId = req.params;

    const card = await Card.findById(cardId);

    if (!card) throw new Error(`could not find this card in the database`);
    return res.send(card);
  } catch (error) {
    handleError(res, 404, `MONGOOSE:${error}`);
  }
};

const addCardToCart = async (req, res) => {
  try {
    const cardId = req.params._id;
    const userId = req.user._id;
    const card = req.body;

    //validating order's details:
    const { error } = validateItemForm(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    //check if user already has a cart:
    const isCartExist = await Cart.findOne({ user_id: userId });

    if (!isCartExist) {
      const normalizedCart = normalizeCart(card, userId);
      const cartForDB = new Cart(normalizedCart);
      const cartrFromDB = await cartForDB.save();
      return res.status(201).send(cartrFromDB);
    }

    //if the user already has a cart: is this product(card) new or already in it?
    const cardInCart = await isCartExist.cartItems.find(
      (isCartExist) => isCartExist.card === cardId
    );

    if (!cardInCart) {
      const newCartItem = {
        card: cardId,
        quantity: req.body.quantity || 1,
        price: req.body.price,
      };

      isCartExist.cartItems.push(newCartItem);
      const cartFromDB = await isCartExist.save();
      return res.send(cartFromDB);
    }

    if (cardInCart) {
      const updatedCart = await Cart.findOneAndUpdate(
        { user_id: userId },
        { $push: { cartItems: req.body.cardInCart } },
        { new: true }
      );
      return res.status(201).send(updatedCart);
    }
  } catch (error) {
    handleError(res, 400, `Mongoose Error:${error.message}`);
  }
};

const deleteCardFromCart = async (req, res) => {
  try {
    const cardId = req.params._id;
    const userId = req.user_id;

    const userCart = await Cart.findOne({ user_id: userId });

    if (!userCart)
      throw new Error("can not find ac art for this userId in the database");

    const cardInCart = userCart.cartItems.find(
      (card) => card.toString() === cardId
    );

    if (!cardInCart)
      throw new Error(
        "can not find card with this cardID in the userws cart in the database"
      );

    const updatedCart = userCart.cartItems.filter(
      (cardInCart) => cardInCart.card.toString() !== cardId
    );

    userCart.cartItems = updatedCart;
    const cartFromDB = await userCart.save();
    return res.send(cartFromDB);
  } catch (error) {
    handleError(res, 400, `Mongoose Error:${error.message}`);
  }
};

exports.getMyCartCards = getMyCartCards;
exports.getCartCard = getCartCard;
exports.addCardToCart = addCardToCart;
exports.deleteCardFromCart = deleteCardFromCart;

// exports.createCardInCard = createCardInCard;
// exports.editCartCardcount = editCartCardcount;
// exports.removeCardsFromUsersCart = removeCardsFromUsersCart;
