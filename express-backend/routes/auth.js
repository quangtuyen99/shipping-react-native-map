const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();


//Đăng nhập
router.post("/login", authController.loginUser);

// Tạo 1 user
router.post("/signup", authController.createUser);

module.exports = router;