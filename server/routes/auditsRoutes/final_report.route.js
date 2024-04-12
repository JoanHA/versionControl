const express = require("express");
const { createFinal, getFinal, getOneFinal } = require("../../controllers/auditsControllers/final_reports.controller");
const router = express.Router();



router.get("/",getFinal)
router.get("/:id",getOneFinal)
router.post("/",createFinal)

module.exports = router;