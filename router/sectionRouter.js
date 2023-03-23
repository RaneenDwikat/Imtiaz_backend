const sectionController= require('../controller/sectionController')
const auth= require('../middleware/auth')
const express=require('express')
const { authAssistant } = require('../middleware/auth')

const router=express.Router()
const controller= new sectionController()

router.post('/add',auth.authAssistant,controller.add)
router.get('/get',controller.get)
router.put('/deactivate/:_id',authAssistant, controller.deactivate)

module.exports=router