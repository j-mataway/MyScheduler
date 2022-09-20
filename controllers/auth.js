const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (validator.isEmpty(req.body.username))
    validationErrors.push({ msg: "Please enter a valid username." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/");
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(err => {
    if(err) {return (err)};
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getCreateNewUser = (req, res) =>{
  res.render("createnewuser.ejs");
}

exports.postCreateUser = (req, res, next) => {
  const validationErrors = [];
  console.log(req.body)
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../createUser");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    payRate: req.body.payrate,
    typeOfPay: req.body.typeofpay,
    position: req.body.position,
    locationNumber: req.body.location,
  });
  User.findOne(    
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../profile");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", { msg: "New user created." });
          res.redirect("../profile");
        });
      });
    }
  