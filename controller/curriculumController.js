const Curriculum= require('../model/curriculum')
const path=require('path')
const fs=require('fs')

class Controller{
    getFiles= async(req,res,next)=>{
        try {
            const file =  await Curriculum.aggregate([    
                {$lookup:{
                    from: "sections",
                    foreignField: "_id",
                    localField: "sectionId",
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
           return res.json({success: true, msg: file})
          } catch (err) {
            console.log('Error downloading file:', err);
            res.status(500).json({
              message: 'Error downloading file'
            });
          }
    }
    getById= async(req,res,next)=>{
        try {
            const file = await Curriculum.findById(req.params.id);
            const path = file.path;
            const fileName = file.name;
            const fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            const fileStream = fs.createReadStream(path);
          
            res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-type', fileType);
          
            fileStream.pipe(res);
          } catch (err) {
            console.log('Error downloading file:', err);
            res.status(500).json({
              message: 'Error downloading file'
            });
          }
    }
    updateById= async(req,res,next)=>{
        try {
            const {subject,section}=req.body
            const {id}=req.params
            const data=await Curriculum.findOneAndUpdate({_id:id},{subject:subject,section:section})
            return res.status(200).json({success:true,msg:"updated"})
          } catch (err) {
            console.log('Error updating file:', err);
            res.status(500).json({
              msg: 'Error updating file'
            });
          }
    }
    deleteById= async(req,res,next)=>{
        try {
            const {id}=req.params
            console.log(id)
            const data=await Curriculum.findOneAndDelete({_id:id})
            return res.status(200).json({success:true,msg:"deleted"})
          } catch (err) {
            console.log('Error deleting file:', err);
            res.status(500).json({
              msg: 'Error deleting file'
            });
          }
    }
}

module.exports= Controller