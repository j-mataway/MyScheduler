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

exports.getEditSchedule = async (req, res) =>{
    try{
       const userLocation = await Location.find({locationName: req.user.location}).lean()
       const schedules = await Schedule.find({locationNumber: userLocation[0].locationNumber}).lean()
       const allScheduleDates = schedules.map(schedule => schedule.scheduleStartDate.toString())
       const uniqueScheduleDates = [...new Set(allScheduleDates)]
       const scheduleDates = uniqueScheduleDates.map(date => new Date(date).toLocaleDateString())
       res.render("editschedule.ejs", {scheduleDates:scheduleDates, selectedScheduleDate:null})
   }   catch (err){
       console.log(err)
   }
}

exports.editSelectedSchedule = async (req, res) =>{
    const selectedScheduleDate = req.query.scheduleDate
  
    console.log(req.query)
    try{
        res.render("editschedule.ejs", {scheduleDates:null, selectedScheduleDate:selectedScheduleDate})
    }
    catch(e){
        console.log(e)
    }
}

   exports.getViewSchedule = async (req, res) =>{
    try{
       const schedule = null 
       const id = req.user._id 
       const userLocation = await Location.findOne({locationName: req.user.location}).lean()
       const locationNumber = userLocation.locationNumber
       const schedules = await Schedule.find({locationNumber: locationNumber})
       const employeeSchedules = schedules.filter(schedule => schedule.employeeSchedule.schedule.employeeId.equals(id))
       const scheduleDates = employeeSchedules.map(schedule => schedule.scheduleStartDate.toLocaleDateString())
       res.render("viewschedule.ejs", {schedules: employeeSchedules, scheduleDates:scheduleDates, schedule: schedule})
   }   catch (err){
       console.log(err)
   }
   }
   exports.getEmployeeSchedule = async (req, res) =>{
    try{
        const id = req.user._id 
        const selectedDate = req.query.schedule
        const userLocation = await Location.findOne({locationName: req.user.location}).lean()
        const locationNumber = userLocation.locationNumber
        const schedules = await Schedule.find({locationNumber: locationNumber})
        const employeeSchedules = schedules.filter(schedule => schedule.employeeSchedule.schedule.employeeId.equals(id))
        const scheduleDates = employeeSchedules.map(schedule => schedule.scheduleStartDate.toLocaleDateString())
        const schedule = employeeSchedules.filter(schedule => schedule.scheduleStartDate.toLocaleDateString() === selectedDate)
        const user = req.user
        console.log(schedule)
        res.render("viewschedule.ejs", {schedules: employeeSchedules, scheduleDates:scheduleDates, schedule: schedule[0], selectedDate: selectedDate, user:user})   
    }
    catch(err){
        console.log(err)
    }
  }

exports.createNewSchedule = async (req, res) =>{
    const creator = req.user   
    const existingScheduleDate = await Schedule.find({scheduleStartDate:req.body.startdate})
    const location = await Location.findOne({locationName: creator.location}).lean()
    const allEmployees = await User.find({location :location.locationName}).lean()
    const scheduledEmployees = allEmployees.filter(emp => emp.position !== 'admin') 
                                           .filter(emp => emp.position !== 'districtmanager')
    const schedules = req.body  
    let finalized = false
    if(req.body.finalized){
        finalized=true
    }
    function EmployeeSchedule (id, schedules){
        this.id = id,
        this.mondayIn = schedules[`mondayIn_${this.id}`],
        this.mondayOut = schedules[`mondayOut_${this.id}`]
        this.tuesdayIn = schedules[`tuesdayIn_${this.id}`]
        this.tuesdayOut = schedules[`tuesdayOut_${this.id}`]
        this.wednesdayIn = schedules[`wednesdayIn_${this.id}`]
        this.wednesdayOut = schedules[`wednesdayOut_${this.id}`]
        this.thursdayIn = schedules[`thursdayIn_${this.id}`]
        this.thursdayOut = schedules[`thursdayOut_${this.id}`]
        this.fridayIn = schedules[`fridayIn_${this.id}`]
        this.fridayOut = schedules[`fridayOut_${this.id}`]
        this.saturdayIn = schedules[`saturdayIn_${this.id}`]
        this.saturdayOut = schedules[`saturdayOut_${this.id}`]
        this.sundayIn = schedules[`sundayIn_${this.id}`]
        this.sundayOut = schedules[`sundayOut_${this.id}`]
    
    }
    
        let employeeSchedule = {}

        for(const person of scheduledEmployees){
            employeeSchedule[`schedule_${person._id}`] = new EmployeeSchedule(person._id, schedules)
        }




    
    
if(existingScheduleDate.length > 0){
    res.render("editSchedule.ejs", {existingScheduleError: true})
}    




for(let i = 0; i<scheduledEmployees.length; i++){
           const currentSchedule = employeeSchedule[`schedule_${scheduledEmployees[i]._id}`]
    try{
        await Schedule.create({
            scheduleStartDate: req.body.startdate,
            locationNumber: location.locationNumber,
            createdBy: creator._id,
            finalized:finalized,
            employeeSchedule:{
                schedule:{
                    employeeId: currentSchedule.id,
                    mondayIn: currentSchedule.mondayIn,
                    mondayOut: currentSchedule.mondayOut,
                    tuesdayIn: currentSchedule.tuesdayIn,
                    tuesdayOut: currentSchedule.tuesdayOut,
                    wednesdayIn: currentSchedule.wednesdayIn,
                    wednesdayOut: currentSchedule.wednesdayOut,
                    thursdayIn: currentSchedule.thursdayIn,
                    thursdayOut: currentSchedule.thursdayOut,
                    fridayIn: currentSchedule.fridayIn,
                    fridayOut: currentSchedule.fridayOut,
                    saturdayIn: currentSchedule.saturdayIn,
                    saturdayOut: currentSchedule.saturdayOut,
                    sundayIn: currentSchedule.sundayIn,
                    sundayOut: currentSchedule.sundayOut,
                },

            }
    })


}
    catch (err){
       console.log(err)
    }
} 
res.redirect("/profile")
}
