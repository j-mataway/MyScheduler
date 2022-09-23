const express = require("express");
const router = express.Router();
const locationsController = require("../controllers/locations");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/getLocation", locationsController.getLocation)
router.put("/:id", locationsController.editLocation)

module.exports = router;