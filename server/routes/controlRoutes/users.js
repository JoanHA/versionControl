const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updateUsers,
  getOneUser,
  changePassword,
} = require("../../controllers/controlControllers/userController.js");

//users
router.get("/", getAllUsers);
router.put("/", updateUsers);
router.get("/:id", getOneUser);
router.put("/changePassword", changePassword);
module.exports = router;
