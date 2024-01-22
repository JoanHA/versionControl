const express = require("express")
const router = express.Router();
const db = require("../../dbControl.js");
const helper = require("../../lib/helpers.js");
const jwt = require("jsonwebtoken");
const {login,register} = require("../../controllers/controlControllers/authController.js")
router.post("/login",login)

router.post("/register", register);

module.exports = router;
