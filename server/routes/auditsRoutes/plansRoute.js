const express = require("express")
const { createPlan, getPlan, getOnePlan } = require("../../controllers/auditsControllers/PlansControllers")
const router = express.Router()

router.get("/",getPlan)
router.post("/",createPlan)
router.get("/:id", getOnePlan)
module.exports = router