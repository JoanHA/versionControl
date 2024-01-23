const express = require("express")
const router = express.Router()
const {createParam} = require("../../controllers/controlControllers/parameterController")

router.post("/",createParam)
module.exports = router