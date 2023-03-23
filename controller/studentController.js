const Student=require('../model/students')
const jwt=require('jsonwebtoken')

class Controller{
    add= async(req,res,next)=>{
        const {name,age,motherMobile,fatherMobile,monthlyEarning,section,bus}= req.body
        try {
            const user= await new Student({name,age,motherMobile,fatherMobile,monthlyEarning,section,bus}).save()
            return res.status(200).json({success: true, msg: 'added successfuly'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: 'an error occur'})
        }
    }
    update= async(req,res,next)=>{
        const {name,age,motherMobile,fatherMobile,monthlyEarning,section,bus}= req.body
        try {
            const user= await Student.findByIdAndUpdate({_id:_id},{name,age,motherMobile,fatherMobile,monthlyEarning,section,bus})
            return res.status(200).json({success: true, msg: 'updated successfuly'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: 'an error occur'})
        }
    }
    deactivate= async (req,res,next)=>{
        const {_id}= req.params
        try {
            const user= await Student.findByIdAndUpdate({_id:_id},{status:'deactive'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: 'an error occur'})
        }
    }
    retrieve= async(req,res,next)=>{

        try {
           const students= await Student.aggregate([
            {$lookup:{
                from: "sections",
                foreignField: "_id",
                localField: "section",
                pipeline: [
                    {
                      $project: {
                        createdAt: 0,
                        updatedAt: 0,
                        __v: 0,
                        status: 0,
                      },
                    },
                  ],
                as:"section"
            }}
           ])
            return res.status(200).json({success: true, msg: students})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: "an error occur"})
        }
    }
}
module.exports= Controller