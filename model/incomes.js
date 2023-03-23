const mongoose=require('mongoose')

const incomeSchema = new mongoose.Schema({
    amount:{
        type: Number
    },
    studentId:{
        type: mongoose.ObjectId,
        ref: 'student'
    },
    note:{
        type: String
    }
},{timestamps: true})
module.exports=  mongoose.model('incomes',incomeSchema)