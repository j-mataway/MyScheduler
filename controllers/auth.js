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
    return res.render("index.ejs", {errors: validationErrors});
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
  if (!validator.isEmail(req.body.email))
    validationErrors.push('validEmailError');
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push('passwordLengthError');
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push('passwordMatchError');
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.render("createnewuser.ejs", {errors: validationErrors});
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
        validationErrors.push('uniqueUserError')
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.render("createnewuser.ejs", {errors: validationErrors});
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
  