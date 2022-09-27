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
        schedule:{
            employeeId:{
             type:mongoose.Schema.Types.ObjectId,
            },
            mondayIn:{
                type:String
            },
            mondayOut:{
                type:String
            },
            tuesdayIn:{
                type:String
            },
            tuesdayOut:{
                type:String
            },
            wednesdayIn:{
                type:String
            },
            wednesdayOut:{
                type:String
            },
            thursdayIn:{
                type:String
            },
            thursdayOut:{
                type:String
            },
            fridayIn:{
                type:String
            },
            fridayOut:{
                type:String
            },
            saturdayIn:{
                type:String
            },
            saturdayOut:{
                type:String
            },
            sundayIn:{
                type:String
            },
            sundayOut:{
                type:String
            },
  }},
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Schedule", ScheduleSchema);