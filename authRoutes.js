const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// LOGIN
router.post("/login", authController.login);

// LOGOUT
router.get("/sair", authController.logout);

module.exports = router;

