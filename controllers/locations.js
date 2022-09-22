const Location = require("../models/Location")

exports.getCreateLocation = (req, res) =>{
    if(req.user.position === 'admin'){
    res.render("createnewlocation.ejs");
    }
    else redirect("/profile")
  }
exports.postCreateLocation = async (req, res) => {
      try {
        await Location.create({
          locationName: req.body.locationName,
          locationNumber: req.body.locationNumber,
          admin: req.body.locationAdmin,
          gm: req.body.locationGM,
          managers: req.body.locationManagers,
          crew: req.body.locationCrew,
        });
        console.log("New Location has been created");
        res.redirect("/profile");
      } catch (err) {
        console.log(err);
      }
    }