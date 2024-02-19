const express = require("express");
const {
  getOneControl, editControl, editExternal,
} = require("../../controllers/controlControllers/controlsController");
const router = express.Router();

//Obtener un solo control
router.get("/:id", getOneControl);

//editar control
router.put("/:id",editControl);
router.put("/external/:id",editExternal);

module.exports = router;
