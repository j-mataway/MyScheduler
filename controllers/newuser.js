const User = require("../models/User")

module.exports = {
    getNewUser: (req, res) => {
      res.render("newuser.ejs");
    }, 
  };