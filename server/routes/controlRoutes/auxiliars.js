const express = require("express")
const router = express.Router()
const {getCodeLetters,getProcessAndTypologies} = require("../../controllers/controlControllers/auxiliarsController")

router.get("/",getCodeLetters)
router.get("/pyt",getProcessAndTypologies)

module.exports = router