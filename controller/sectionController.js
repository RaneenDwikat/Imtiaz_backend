const Section= require('../model/sections')

class Controller{
    add= async(req,res,next)=>{
        const {title, description}= req.body
        try {
            await new Section({title,description}).save()
            return res.status(200).json({success: true, msg: 'successfuly added'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: error})
        }
    }
    deactivate= async (req,res,next)=>{
        const {_id}= req.params
        try {
            await Section.findByIdAndUpdate({_id:_id},{status: 'deactive'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: error})
        }
    }
    get =async(req,res,next)=>{
        try {
            const sections= await Section.find()
            return res.status(200).json({success: true, msg: sections})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: "an error occur"})
        }
    }
}

module.exports= Controller