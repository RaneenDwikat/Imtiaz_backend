const mongoose=require('mongoose')
const config=require('../../config/config')
const userName= config.mongo.username
const password=config.mongo.password
const database=`mongodb+srv://${userName}:${password}@cluster0.hvnkgc8.mongodb.net/test`
 async function connectDB(){
    try {
        await mongoose.connect(database)
        console.log('Connected!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports=connectDB