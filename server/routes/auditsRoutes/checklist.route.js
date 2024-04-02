const express = require("express");
const {
  createCheckList,
  getChecklists,
  editChecklist,
  getOneCheck,
} = require("../../controllers/auditsControllers/checklist.controller");

const router = express.Router();

router.post("/", createCheckList);
router.get("/", getChecklists);
router.get("/:id", getOneCheck);
router.put("/:id", editChecklist);

module.exports = router;
