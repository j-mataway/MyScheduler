const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - working
router.get("/", homeController.getIndex);
router.get("/createUser", authController.getCreateNewUser);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.post("/createUser", authController.postCreateUser);
//routes i may not need? modify?
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
module.exports = router;
