const User = require("../models/User")
const Location = require("../models/Location")

exports.getEditUser = async (req, res) =>{
    try{
        const locations = await Location.find().lean()
        res.render("edituser.ejs", {locations: locations})
    }   catch (err){
        console.log(err)
    }
}
exports.getEmployees = async (req, res) =>{
    console.log(req.params)
    try{
        const employees = await User.find().lean()
        res.render("edituser.ejs", {users : users, locations: locations})
    }   catch (err){
        console.log(err)
    }
}