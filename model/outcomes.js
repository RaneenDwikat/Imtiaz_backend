const mongoose=require('mongoose')
const outcomeSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    type:{
        type: String,
        enum: ['rent','salary','material']
    },
    note:{
        type: String
    }
},{timestamps: true})

module.exports= mongoose.model('outcomes',outcomeSchema)