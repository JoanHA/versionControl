const express = require("express")
const router = express.Router();

const {getAllUsers, updateUsers, getOneUser, } = require("../../controllers/controlControllers/userController.js")

//users
router.get("/", getAllUsers)
router.put("/", updateUsers)
router.get("/:id",getOneUser)
module.exports = router;