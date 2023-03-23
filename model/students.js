const mongoose=require('mongoose')

const studentShcema= new mongoose.Schema({
    name:{
        type: String
    },
    age:{
        type: String
    },
    section:{
        type:mongoose.ObjectId,
        ref:"sections",
    },
    bus:{
        type: String,
        enum: ["yes","no"]
    },
    monthlyEarning:{
        type: Number
    },
    motherMobile:{
        type: Number
    },
    fatherMobile:{
        type: Number
    },
    status:{
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'
    }
    
},{timestamps:true})
module.exports=mongoose.model('students',studentShcema)
