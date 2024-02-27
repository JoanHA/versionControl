const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  getDocuments,
  editDocument,
  deleteDocument,
  getOneDocument,
  createControl,
  makeDocument,
  lastChange,
} = require("./../../controllers/controlControllers/documentController");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/files"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
router.get("/", getDocuments);
router.get("/lastchange/:code", lastChange);
router.get("/:id", getOneDocument);
router.post("/control", createControl);
router.post("/doc", multer({ storage }).single("file"), makeDocument);
router.put("/", multer({ storage }).single("file"), editDocument);
router.delete("/:id", deleteDocument);

module.exports = router;
