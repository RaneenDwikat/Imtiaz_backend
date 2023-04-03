const express= require('express')
const cors=require('cors')
const connectDB=require('./utills/mongo/connectDB')
const config= require('./config/config')
const userRouter=require('./router/userRouter')
const studentRouter=require('./router/studentRouter')
const sectionRouter=require('./router/sectionRouter')
const incomeRouter=require('./router/incomeRouter')
const outcomeRouter=require('./router/outcomeRouter')
const curriculumRouter=require('./router/curriculumRouter')
const cuuriModel=require('./model/curriculum')
const path=require('path')
const jwt=require('jsonwebtoken')
const app=express()
const fs=require('fs')

connectDB()
app.use(cors())

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
  const upload = multer({storage});
let  token=jwt.sign({'role':'admin',"_id":'641c3105a66e1eb948b73f67'},'secret')
console.log(token)

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/user',userRouter)
app.use('/student',studentRouter)
app.use('/section',sectionRouter)
app.use('/income',incomeRouter)
app.use('/outcome',outcomeRouter)
app.use('/curriculum',curriculumRouter)

  app.post('/api/upload', upload.single('file'), async (req, res, next) => {
    try {
        console.log(req.headers.sectionid)
        const sectionId=req.headers.sectionid
        const subject=req.headers.subject
      const file = new cuuriModel({
        name: req.file.originalname,
        path: req.file.path,
        sectionId: sectionId,
        subject:subject,
      });
      await file.save();
      res.json({
        message: 'file uploaded successfully'
      });
   
    } catch (err) {
      console.log('Error uploading file:', err);
      res.status(500).json({
        message: 'Error uploading file'
      });
    }
  });

const port= config.port
app.listen(port,console.log(`connected with port ${port}`))