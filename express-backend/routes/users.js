const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// Lay ra tat ca user
router.get("/", userController.getUser);


module.exports = router;