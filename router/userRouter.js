const express=require('express')
const userController=require('../controller/userController')
const auth=require('../middleware/auth')

const router=express.Router()
const controller=new userController()

router.post('/login',controller.login)
router.post('/add',controller.add)
router.put('/edit/:_id',auth.authAdmin,controller.edit)
router.put('/deactivate/:_id',auth.authAdmin,controller.deactivate)

module.exports=router