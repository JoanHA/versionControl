const express = require("express");
const router = express.Router();
const {
  createParam,
  lastModified,
  mostModified,
  getParams,
  editParam,
  deleteParam,
} = require("../../controllers/controlControllers/parameterController");
//parameters
router.post("/", createParam);
router.get("/last", lastModified);
router.get("/most", mostModified);
router.get("/all", getParams);
router.put("/", editParam);
router.delete("/:id",deleteParam);
module.exports = router;
