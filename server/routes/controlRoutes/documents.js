const express = require("express")
const router = express.Router()
const {getDocuments,editDocument,deleteDocument,getOneDocument, createControl, makeDocument, lastChange} = require("./../../controllers/controlControllers/documentController")

router.get("/",getDocuments);
router.get("/lastchange/:code",lastChange)
router.get("/:id",getOneDocument);
router.post("/control",createControl);
router.post("/doc",makeDocument)
router.put("/",editDocument)

module.exports = router