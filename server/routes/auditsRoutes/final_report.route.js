const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createFinal,
  getFinal,
  getOneFinal,
  getFindings,getOneFinalReport
} = require("../../controllers/auditsControllers/final_reports.controller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/signs"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.get("/", getFinal);
router.get("/:id", getOneFinal);
router.post(
  "/",
  upload.fields([
    { name: "audit_leader_sign", maxCount: 1 },
    { name: "represent_sign", maxCount: 1 },
  ]),
  createFinal
);
router.get("/view/:id",getOneFinalReport)
router.post("/getFinding", getFindings);

module.exports = router;
