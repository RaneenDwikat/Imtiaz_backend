const curriculumController= require('../controller/curriculumController')
const auth= require('../middleware/auth')
const express=require('express')
const { authAssistant } = require('../middleware/auth')

const router=express.Router()
const controller= new curriculumController()

router.get('/getFiles',controller.getFiles)

router.get('/download/:id',auth.authAssistant,controller.getById)
router.put('/update/:id',auth.authAssistant,controller.updateById)
router.delete('/delete/:id',auth.authAssistant,controller.deleteById)

module.exports=router