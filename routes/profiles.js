const express = require("express");
const router = express.Router();
const profilesController = require("../controllers/profiles");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


module.exports = router;
