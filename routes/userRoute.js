const express = require('express')
const UserService = require('../services/UserService')
const auth = require('../middleware/loginCredentials')

const userRoute=(app)=>{
    const router = express.Router()
    const userService = new UserService()
    app.use('/user',router)

    router.get('/all',auth,async(req,res)=>{
        const respuestaT = await userService.getUsers()
        return res.status(200).json(respuestaT)

    })
    router.post('/register',async(req,res)=>{
        const data = req.body
        const usuario = await userService.registerUser(data)
        return res.cookie("token",usuario.token,{
            httpOnly:true,
            secure:true,
            sameSite:"none"
        }).json(usuario)
    })
    router.post('/login',async(req,res)=>{
        const data = req.body
        const respuesta = await userService.loginUser(data)
        return res.json(respuesta)
    })
}
module.exports = userRoute