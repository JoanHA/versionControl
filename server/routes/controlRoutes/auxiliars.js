const express = require("express")
const router = express.Router()
const {getCodeLetters,getProcessAndTypologies,getLastMove,verify} = require("../../controllers/controlControllers/auxiliarsController")
//auxiliars
router.get("/",getCodeLetters)
router.get("/pyt",getProcessAndTypologies)
router.get("/lastMove",getLastMove)
router.post("/verifyToken",verify)

module.exports = router