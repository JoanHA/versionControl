const express = require("express")
const router = express.Router()
const {getDocuments,createDocument,editDocument,deleteDocument,getOneDocument,createDocuments2, createControl, makeDocument} = require("./../../controllers/controlControllers/documentController")

router.get("/",getDocuments);
router.post("/",createDocuments2);
router.get("/:id",getOneDocument);
router.post("/control",createControl);
router.post("/doc",makeDocument)
router.put("/",editDocument)

module.exports = router