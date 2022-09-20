const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const newuserController = require("../controllers/newuser");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/createUser", authController.getCreateNewUser);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.post("/createUser", authController.postCreateUser);
module.exports = router;
