const express = require("express")
const router = express.Router();

const {getAllUsers, updateUsers, } = require("../../controllers/controlControllers/userController.js")

//users
router.get("/", getAllUsers)
router.put("/", updateUsers)
module.exports = router;