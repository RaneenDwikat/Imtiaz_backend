const jwt=require('jsonwebtoken')
const User=require('../model/users')

const authAdmin=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.replace("Bearer ", "");
        if(token){
            const decode= await jwt.verify(token,'secret')
            if(decode.role=='admin' || decode._id==req.params._id){
                console.log('okay')
                next()
            }else{
                console.log('no')
                return res.json({success: false,msg:'you do not have a permission'})
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false,msg:error})
    }
}
const authAssistant=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.replace("Bearer ", "");
        if(token){
            const decode= await jwt.verify(token,'secret')
            if(decode.role=='admin' || decode.role=='assistant'){
                console.log('okay')
                next()
            }else{
                console.log('no')
                return res.json({success: false,msg:'you do not have a permission'})
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false,msg:error})
    }
}
module.exports= {
    authAdmin: authAdmin,
    authAssistant: authAssistant
}