const express = require("express");
const {
  getProcess,
  getReq,
  getAllReq,
  getCriteriaTypes,
  createReq,
  createProcess,
  getOneProcess,
  editProcess,
} = require("../../controllers/auditsControllers/ProcessController");
const router = express.Router();

router.get("/", getProcess);
router.post("/", createProcess);
router.get("/pro/:id",getOneProcess)
router.put("/:id",editProcess);
router.get("/:id", getReq);
router.get("/req/all", getAllReq);
router.get("/req/criteriaType", getCriteriaTypes);
router.post("/createReq", createReq);
module.exports = router;
