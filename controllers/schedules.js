const Schedule = require("../models/Schedule")
const User = require("../models/User")
const Location = require("../models/Location")

exports.getNewSchedule = async (req, res) =>{
 try{
    const employees = await User.find({location : req.user.location}).lean()
    const gm = employees.filter(employee => employee.position === 'generalmanager')
    const managers = employees.filter(employee => employee.position === 'manager')
    const crew = employees.filter(employee => employee.position === 'crew')
    res.render("newschedule.ejs", {gm:gm, managers:managers, crew:crew})
}   catch (err){
    console.log(err)
}
}

exports.createNewSchedule = async (req, res) =>{
   
    let finalized = false
    if(req.body.finalized){
        finalized=true
    }
    const creator = req.user   
    const existingScheduleDate = await Schedule.find({scheduleStartDate:req.body.startdate})
    const location = await Location.findOne({locationName: creator.location}).lean()
    const allEmployees = await User.find({location :location.locationName}).lean()
    const scheduledEmployees = allEmployees.filter(emp => emp.position !== 'admin') 
                                           .filter(emp => emp.position !== 'districtmanager')
    const employeeIds = scheduledEmployees.map(emp => emp._id)  
    const schedules = req.body
    let empschedule =[]
    for(const employee in scheduledEmployees){
    const id = employee._id
        for(const schedule in schedules){
            if (schedule.includes(id)){
                empschedule.push(schedule)
            }    
        }
    }                            
         console.log(empschedule)                   
    try{
        await Schedule.create({
            scheduleStartDate: req.body.startdate,
            locationNumber: location.locationNumber,
            createdBy: creator._id,
            finalized:finalized,
            employeeSchedule:{
                        employeeId: function() {for(const employee in scheduledEmployees){
                            return employee._id
                        }},
                        mondayIn:String,
                        mondayOut:String,
                        tuesdayIn:String,
                        tuesdayOut:String,
                        wednesdayIn:String,
                        wednesdayOut:String,
                        thursdayIn:String,
                        thursdayOut:String,
                        fridayIn:String,
                        fridayOut:String,
                        saturdayIn:String,
                        saturdayOut:String,
                        sundayIn:String,
                        sundayOut:String

            }
    })

       res.redirect("/profile")
}
    catch (err){
       console.log(err)
    }
} 

