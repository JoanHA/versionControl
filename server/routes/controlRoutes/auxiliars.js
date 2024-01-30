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
module.exports = router;
