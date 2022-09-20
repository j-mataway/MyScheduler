const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/newuser", ensureAuth, authController.getCreateNewUser);
router.post("/createUser",  authController.postCreateUser);

module.exports = router;