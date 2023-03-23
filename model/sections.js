const mongoose=require('mongoose')

const sectionShcema= new mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    status:{
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'
    }
},{timestamps:true})
module.exports=mongoose.model('sections',sectionShcema)
