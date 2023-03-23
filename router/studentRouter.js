const express=require('express')
const studentController=require('../controller/studentController')
const auth=require('../middleware/auth')

const router=express.Router()
const controller=new studentController()

router.post('/add',auth.authAssistant,controller.add)
router.put('/update/:_id',auth.authAssistant,controller.update)
router.put('/deactivate',auth.authAssistant,controller.deactivate)
router.get('/retrieve',auth.authAssistant,controller.retrieve)
 
module.exports=router