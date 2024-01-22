const express = require("express");
const router = express.Router();
require("dotenv").config();
const nodemailer = require("nodemailer");
const {
  createEmail,
} = require("../../controllers/controlControllers/recoverController");

router.post("/send_recovery_email", createEmail);

module.exports = router;
