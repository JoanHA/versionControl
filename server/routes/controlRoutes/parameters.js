const express = require("express")
const router = express.Router()
const {createParam, lastModified, mostModified} = require("../../controllers/controlControllers/parameterController")
//parameters
router.post("/",createParam);
router.get("/last",lastModified);
router.get("/most",mostModified)
module.exports = router