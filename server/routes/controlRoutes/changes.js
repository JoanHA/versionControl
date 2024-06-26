const express = require("express");
const router = express.Router();

const {
  createChange,
  getChangesFromOne,
  getArchivedInfo,
  getChanges,
  getArchived,
  getExternals,
  createExternal,
  deleteChange,
  deleteControl,
  getOneChange,
  editChange,
} = require("../../controllers/controlControllers/changesController");

router.get("/externals", getExternals);
router.post("/externals", createExternal);
router.get("/archived", getArchived);
router.get("/archived/:code", getArchivedInfo);
router.get("/:code", getChangesFromOne);
router.post("/", createChange);
router.get("/", getChanges);
router.delete("/:id", deleteChange);
router.delete("/control/:id", deleteControl);
router.get("/one/:id", getOneChange);
router.put("/:id",editChange);
module.exports = router;
