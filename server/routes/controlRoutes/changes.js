const express = require("express");
const router = express.Router();

const {
  createChange,
  getChangesFromOne,
  getArchivedInfo,
  getChanges,
  getArchived,
  getExternals,
} = require("../../controllers/controlControllers/changesController");

router.get("/externals",getExternals);
router.get("/archived",getArchived)
router.get("/archived/:code", getArchivedInfo);
router.get("/:code", getChangesFromOne);
router.post("/", createChange);
router.get("/", getChanges);


module.exports = router;
