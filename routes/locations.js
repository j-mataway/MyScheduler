const express = require("express");
const router = express.Router();
const locationsController = require("../controllers/locations");
const { ensureAuth, ensureGuest } = require("../middleware/auth");




module.exports = router;