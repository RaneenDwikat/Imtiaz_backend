const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    email:{
        type: String
    },
    password:{
        type: String
    },
    last_login: {
        type: Date,
        default:new Date(),
      },
    role:{
        type: String,
        enum:['admin','assistant','teacher']
    },
    salary:{
        type: Number
    },
    name:{
        type: String
    },
    mobile:{
        type: Number
    },
    section:{
        type:mongoose.ObjectId,
        ref:"sections",
    },
    status:{
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'
    }
},{timestamps:true})
module.exports=mongoose.model('users',userSchema)
