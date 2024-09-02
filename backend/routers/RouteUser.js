const express = require("express");
const {
  createUser,
  loginUser,
  removeToken,
} = require("../controllers/ControllerUser");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.post("/", Authentication, createUser);
router.delete("/:id", removeToken);
router.post("/login", loginUser);

module.exports = router;
