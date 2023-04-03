const outcomeController= require('../controller/outcomeController')
const auth= require('../middleware/auth')
const express= require('express')

const router= express.Router()
const controller= new outcomeController()

router.post('/add',auth.authAssistant,controller.add)
router.put('/update/:_id',auth.authAssistant,controller.update)
router.get('/get',auth.authAssistant,controller.get)
router.delete('/delete/:_id',auth.authAssistant,controller.delete)

module.exports= router
