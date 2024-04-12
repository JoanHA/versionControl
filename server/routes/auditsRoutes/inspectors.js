const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const {
  getInspectors,
  createInspectors,
  editInspectors,
  deleteInspectors,
  getOneInspector,
  getRoles,
} = require("../../controllers/auditsControllers/InspectorsController");

//Configuracion del storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/documents/"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload =multer({ storage }).array('files',5)
router.get("/", getInspectors);
router.post("/", upload ,createInspectors);
router.get("/roles",getRoles)
router.get("/:id",getOneInspector)
router.put("/:id", upload,editInspectors);
router.delete("/:id", deleteInspectors);

module.exports = router;
