const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const profilesController = require("../controllers/profiles");
const locationsController = require("../controllers/locations");
const usersController = require("../controllers/users");
const schedulesController = require("../controllers/schedules");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - working
router.get("/", homeController.getIndex);
router.get("/logout", authController.logout);
router.get("/profile", ensureAuth, profilesController.getProfile);
router.get("/createUser", authController.getCreateNewUser);
router.get("/createLocation", locationsController.getCreateLocation);
router.get("/editUser", usersController.getEditUser)
router.get("/editLocation", locationsController.getEditLocation)
router.get("/newSchedule", schedulesController.getNewSchedule)
router.get("/editSchedule", schedulesController.getEditSchedule)
router.get("/viewSchedule", schedulesController.getViewSchedule)
router.post("/login", authController.postLogin);
router.post("/createUser", authController.postCreateUser);
router.post("/createLocation", locationsController.postCreateLocation);
module.exports = router;
