const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  testUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/test", protect, testUser);

module.exports = router;
