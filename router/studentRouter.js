const express=require('express')
const studentController=require('../controller/studentController')
const auth=require('../middleware/auth')

const router=express.Router()
const controller=new studentController()

router.post('/add',auth.authAssistant,controller.add)
router.put('/update/:_id',auth.authAssistant,controller.update)
router.put('/deactivate/:_id',auth.authAssistant,controller.deactivate)
router.get('/retrieve',controller.retrieve)
router.get('/getNumberOfStudent',controller.getNumberOfStudent)
router.get('/getNumberOfGirls',controller.getNumberOfGirls)
router.get('/getNumberOfKG1',controller.getNumberOfKG1)
router.get('/getNumberOfKG2',controller.getNumberOfKG2)
 
module.exports=router