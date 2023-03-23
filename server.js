const express= require('express')
const cors=require('cors')
const connectDB=require('./utills/mongo/connectDB')
const config= require('./config/config')
const userRouter=require('./router/userRouter')
const studentRouter=require('./router/studentRouter')
const sectionRouter=require('./router/sectionRouter')
const incomeRouter=require('./router/incomeRouter')
const outcomeRouter=require('./router/outcomeRouter')

const jwt=require('jsonwebtoken')
const app=express()
connectDB()
app.use(cors())


let  token=jwt.sign({'role':'admin',"_id":'641c3105a66e1eb948b73f67'},'secret')
console.log(token)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/user',userRouter)
app.use('/student',studentRouter)
app.use('/section',sectionRouter)
app.use('/income',incomeRouter)
app.use('/outcome',outcomeRouter)
const port= config.port
app.listen(port,console.log(`connected with port ${port}`))