const express = require("express")
const router = express.Router()
const {getDocuments,createDocument,editDocument,deleteDocument,getOneDocument,createDocuments2} = require("./../../controllers/controlControllers/documentController")

router.get("/",getDocuments)
router.post("/",createDocuments2)
router.get("/:id",getOneDocument)

module.exports = router