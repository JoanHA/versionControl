const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createFinal,
  getFinal,
  getOneFinal,
  getFindings,
} = require("../../controllers/auditsControllers/final_reports.controller");
const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/signs"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }).array("files", 5);
router.get("/", getFinal);
router.get("/:id", getOneFinal);
router.post("/", upload, createFinal);
router.post("/getFinding", getFindings);

module.exports = router;
