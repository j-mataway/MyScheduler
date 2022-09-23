const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/getEmployees", usersController.getEmployees)
router.get("/getEmployee", usersController.getEmployee)
router.put("/:id", usersController.editUser)
module.exports = router;