const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  scheduleStartDate: {
    type: Date,
    required: true,
  },
  locationNumber: {
    type: Number,
    required: true,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  finalized:{
    type: Boolean,
    default: false,
    required: true,
  },
  employeeSchedule:{
        employeeId:String,
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
        sundayOut:String,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Schedule", ScheduleSchema);