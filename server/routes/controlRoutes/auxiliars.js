const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  getCodeLetters,
  getProcessAndTypologies,
  getLastMove,
  verify,
  createMasive,
  sendEmails,
  changePasswordWithEmail,
} = require("../../controllers/controlControllers/auxiliarsController");
//auxiliars
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
router.get("/", getCodeLetters);
router.get("/pyt", getProcessAndTypologies);
router.get("/lastMove", getLastMove);
router.post("/verifyToken", verify);
router.post("/masive", multer({ storage }).single("file"), createMasive);
router.post("/send_recovery_email", sendEmails);
router.put("/changePassword/email", changePasswordWithEmail)
module.exports = router;
