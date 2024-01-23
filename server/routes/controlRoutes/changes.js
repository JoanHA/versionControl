const express = require("express");
const router = express.Router();

const {
  createChange,
  getChangesFromOne,
  getArchivedInfo,
  getChanges,
  getArchived,
} = require("../../controllers/controlControllers/changesController");

router.post("/", createChange);
router.get("/archived",getArchived)
router.get("/:code", getChangesFromOne);
router.get("/archived/:code", getArchivedInfo);
router.get("/", getChanges);


module.exports = router;
