const passport = require("passport");
const validator = require("validator");
const User = require("../models/User")
const Location = require("../models/Location")

exports.getEditUser = async (req, res) =>{
    try{
        const locations = await Location.find().lean()
        const locationEmployees = null
        const employee = null
        res.render("edituser.ejs", {locations: locations, locationEmployees:locationEmployees, employee:employee })
    }   catch (err){
        console.log(err)
    }
}
exports.getEmployees = async (req, res) =>{ 
    try{
        const employees = await User.find().lean()
        const locationEmployees = await employees.filter(employee => employee.location === req.query.location)
        const locations = null
        const employee = null
        res.render("edituser.ejs", { locations:locations, locationEmployees:locationEmployees, employee:employee})
    }   catch (err){
        console.log(err)
    }
}
exports.getEmployee = async (req, res) =>{ 
    try{     
        const locationEmployees = null
        const locations = await Location.find().lean()
        const firstName = req.query.employees.split(' ')[0]
        const lastName = req.query.employees.split(' ')[1]
        const employee = await User.findOne({firstName: firstName, lastName:lastName})
        console.log(employee)
        res.render("edituser.ejs", { locations:locations, locationEmployees:locationEmployees, employee:employee})
    }   catch (err){
        console.log(err)
    }
}
exports.editUser = async (req, res) =>{
    try{
        await User.findOneAndUpdate(
            {_id: req.params.id},
            {
            username: req.body.username,
            email: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            payRate: req.body.payrate,
            typeOfPay: req.body.typeofpay,
            position: req.body.position,
            location: req.body.location,
            }   
        )
       res.redirect(`/editUser/getEmployee?employees=${req.body.firstname}+${req.body.lastname}`)     
    }
    catch(err){
        console.log(err)
    }
}