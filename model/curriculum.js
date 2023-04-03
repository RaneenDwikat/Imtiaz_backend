const mongoose=require('mongoose')

const curriculumShcema= new mongoose.Schema({
    name: String,
    path: String,
    sectionId:{
        type:mongoose.ObjectId,
        ref:"sections",
    },
    subject: String,
},{timestamps:true})
module.exports=mongoose.model('curriculums',curriculumShcema)
