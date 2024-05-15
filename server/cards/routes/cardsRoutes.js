const express = require("express");
const auth = require("../../auth/authService");
const {
  getCards,
  getCard,
  createCard,
  getMyCards,
  editCard,
  likeCard,
  deleteCard,
} = require("../controllers/cardsController");

const router = express.Router();

router.get("/", getCards);
router.get("/:cardId", getCard);
router.post("/", auth, createCard);
router.get("/my-cards", getMyCards);
router.put("/:cardId", auth, editCard);
router.patch("/:cardId", auth, likeCard);
router.delete("/:cardId", auth, deleteCard);

module.exports = router;
