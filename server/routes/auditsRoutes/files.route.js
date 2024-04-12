const express = require("express");
const {
  getFiles,
  createFiles,
  deleteFile,
} = require("../../controllers/auditsControllers/files.controller");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/files/"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).array("files", 1);
router.get("/", getFiles);
router.post("/", upload, createFiles);
router.delete("/:id", deleteFile);
module.exports = router;
