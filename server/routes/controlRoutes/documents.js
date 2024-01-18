const express = require("express")
const router = express.Router()
const {getDocuments,createDocument,editDocument,deleteDocument,getOneDocument} = require("./../../controllers/controlControllers/documentController")

router.get("/",getDocuments)
router.post("/",createDocument)
router.get("/:id",getOneDocument)

module.exports = router