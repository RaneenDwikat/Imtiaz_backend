const Outcome= require('../model/outcomes')

class Controller{
    add= async(req,res,next)=>{
        const {note,amount,type}= req.body
        try {
            await new Outcome({note,amount,type}).save()
            return res.status(200).json({success: true, msg:'added successfuly'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: 'an error occur'})
        }
    }
    update= async(req,res,next)=>{
        const {note,amount,type}= req.body
        const {_id}= req.params
        try {
            await Outcome.findOneAndUpdate({_id:_id},{note,amount,type})
            return res.status(200).json({success: true, msg:'updated successfuly'})

        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: 'an error occur'})
        }
    }
    get= async(req,res,next)=>{
        try {
            const outcomes= await Outcome.find()
            return res.status(200).json({success: true, msg: outcomes})

        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: 'an error occur'})
        }
    }
    
}
module.exports= Controller