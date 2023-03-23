const dotenv =require('dotenv')

dotenv.config()

const port= process.env.PORT || 5000
const username= process.env.MONGO_USERNAME
const password=process.env.MONGO_PASSWORD

const mongo={
    username: username,
    password:password
}

const config={
    mongo:mongo,
    port:port
}
module.exports=config