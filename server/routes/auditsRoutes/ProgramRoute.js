const express = require("express");
const {
  createProgram,
  getProgramsAndFields,
  getOneProgram,
  addProgram,
  getByDate,
  getProgramFields,
} = require("../../controllers/auditsControllers/ProgramController");
const router = express.Router();
router.post("/", createProgram);
router.get("/", getProgramsAndFields);
router.get("/:id", getOneProgram);
router.post("/add", addProgram);
router.post("/get/date", getByDate);
router.get("/get/programFields",getProgramFields)

module.exports = router;
