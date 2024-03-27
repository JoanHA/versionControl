const express = require("express");
const { getAuditTypes } = require("../../controllers/auditsControllers/AuditParamController");
const router = express.Router();

router.get("/auditTypes",getAuditTypes)

module.exports = router;
