const Location = require("../models/Location")

exports.getCreateLocation = (req, res) =>{
    if(req.user.position === 'admin'){
    res.render("createnewlocation.ejs");
    }
    else redirect("/profile")
  }
exports.postCreateLocation = async (req, res) => {
    const existingLocationName = await Location.find({locationName:req.body.locationName})
    const existingLocationNumber = await Location.find({locationNumber:req.body.locationNumber})
      if(existingLocationName.length>0 || existingLocationNumber.length>0){
        res.render("createnewlocation.ejs", {existingLocation:true})
      }else{    
  try {
       await Location.create({
          locationName: req.body.locationName,
          locationNumber: req.body.locationNumber,
        });
        console.log("New Location has been created");
        res.redirect("/profile");
      } catch (err) {
        console.log(err);
      }
    }
  }