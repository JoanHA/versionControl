const express = require("express");
const {
  getNOAndOMRequisites,
  createReports,
} = require("../../controllers/auditsControllers/Reports.controller");
const router = express.Router();

router.get("/:id", getNOAndOMRequisites);
router.post("/", createReports);

module.exports = router;
