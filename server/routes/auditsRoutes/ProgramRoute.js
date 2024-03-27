const express = require("express");
const { createProgram, getProgramsAndFields, getOneProgram, addProgram } = require("../../controllers/auditsControllers/ProgramController");
const router = express.Router()
router.post("/",createProgram);
router.get("/",getProgramsAndFields);
router.get("/:id",getOneProgram)
router.post("/add",addProgram)

module.exports = router;