const express = require("express")
const router = express.Router()

const {createChange} = require("../../controllers/controlControllers/changesController")

router.post("/",createChange)


module.exports = router