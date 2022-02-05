const express = require('express')
const UserService = require('../services/UserService')

const userRoute=(app)=>{
    const router = express.Router()
    const userService = new UserService()
    app.use('/user',router)

    router.get('/all',async(req,res)=>{
        const respuestaT = await userService.getUsers()
        return res.status(200).json(respuestaT)

    })
    router.post('/create',async(req,res)=>{
        const data = req.body
        const usuario = await userService.registerUser(data)
        return res.json(usuario)
    })
    router.post('/login',async(req,res)=>{

    })
}
module.exports = userRoute