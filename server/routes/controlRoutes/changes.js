const express = require("express")
const router = express.Router()

const {createChange,getChangesFromOne,getArchivedInfo} = require("../../controllers/controlControllers/changesController")

router.post("/",createChange)
router.get("/:code",getChangesFromOne)
router.get("/archived/:code",getArchivedInfo)

module.exports = router