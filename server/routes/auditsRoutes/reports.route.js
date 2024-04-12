const express = require("express");
const {
  getNOAndOMRequisites,
  createReports,
  viewOneReport,
  getReports,
  validateStatus,
} = require("../../controllers/auditsControllers/Reports.controller");
const router = express.Router();

router.get("/:id", getNOAndOMRequisites);
router.post("/", createReports);
router.get("/one/:id", viewOneReport);
router.get("/", getReports);
router.get("/validate/:id",validateStatus)

module.exports = router;
