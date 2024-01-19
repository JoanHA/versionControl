const express = require("express")
const router = express.Router()
const {getCodeLetters,getProcessAndTypologies,getLastMove} = require("../../controllers/controlControllers/auxiliarsController")

router.get("/",getCodeLetters)
router.get("/pyt",getProcessAndTypologies)
router.get("/lastMove",getLastMove)

module.exports = router