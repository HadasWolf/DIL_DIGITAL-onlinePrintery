const express = require("express");
const auth = require("../../auth/authService");
const {
  getMyCartCards,
  getCartCard,
  addCardToCart,
  deleteCardFromCart,
  // cleanCardsFromUsersCart,
} = require("../controllers/cartControllers");

const router = express.Router();

router.get("/", auth, getMyCartCards);
router.get("/:cardId", getCartCard);
router.post("/", auth, addCardToCart);
router.delete("/:cardId", auth, deleteCardFromCart);

// router.post("/", auth, createCardInCart);
// router.put("/:cardId", auth, editCartCardcount);
// router.delete("/:cardId", auth, cleanCardsFromUsersCart);
module.exports = router;
