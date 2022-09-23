const Schedule = require("../models/Schedule")
const User = require("../models/User")

exports.getNewSchedule = async (req, res) =>{
 try{
    const employees = await User.find({location : req.user.location}).lean()
    const gm = employees.filter(employee => employee.position === 'generalmanager')
    const managers = employees.filter(employee => employee.position === 'manager')
    const crew = employees.filter(employee => employee.position === 'crew')
    console.log(crew)
    res.render("newschedule.ejs", {gm:gm, managers:managers, crew:crew})
}   catch (err){
    console.log(err)
}
}