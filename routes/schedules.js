const express = require("express");
const router = express.Router();
const schedulesController = require("../controllers/schedules");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createSchedule", schedulesController.createNewSchedule)
router.get("/getSchedule", schedulesController.getEmployeeSchedule)
router.get("/editSelectedSchedule", schedulesController.editSelectedSchedule)
router.put("/:date", schedulesController.editSchedule)
module.exports = router;