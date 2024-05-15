const express = require("express");
// const router = require("../controllers/usersController");
const {
  register,
  loginUser,
  getUser,
  updateuser,
  // changeUserBusinessStatus,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

router.post("/", register);
router.post("/login", loginUser);
router.get("/:id", getUser);
router.put("/:id", updateuser);
// router.patch("/:id", changeUserBusinessStatus);
router.delete("/:id", deleteUser);

module.exports = router;
