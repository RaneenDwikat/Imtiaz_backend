const Income= require('../model/incomes')

class Controller{
    add= async(req,res,next)=>{
        const {note,amount,studentId}= req.body
        console.log(note);
    console.log(studentId)
        try {
            await new Income({note,amount,studentId}).save()
            return res.status(200).json({success: true, msg:'added successfuly'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: 'an error occur'})
        }
    }
    update= async(req,res,next)=>{
        const {note,amount,studentId}= req.body
        const {_id}= req.params
        try {
            await Income.findOneAndUpdate({_id:_id},{note,amount,studentId})
            return res.status(200).json({success: true, msg:'updated successfuly'})

        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: 'an error occur'})
        }
    }
    get= async(req,res,next)=>{
        try {
            const incomes= await Income.aggregate([
                {$lookup:{
                    from: "students",
                    foreignField: "_id",
                    localField: "studentId",
                    pipeline: [
                        {
                          $project: {
                            createdAt: 0,
                            updatedAt: 0,
                            __v: 0,
                            status: 0,
                          },
                        },
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
                        }
                        }
                      ],
                    as:"student"
                }}
               ]).project({studentId: 0, __v: 0})
            return res.status(200).json({success: true, msg: incomes})

        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: 'an error occur'})
        }
    }
    delete= async(req,res,next)=>{
        const {_id}= req.params
        try {
            await Income.findOneAndDelete({_id:_id})
            return res.status(200).json({success: true, msg:'updated successfuly'})

        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, msg: 'an error occur'})
        }
    }
}
module.exports= Controller