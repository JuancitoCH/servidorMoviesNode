const express = require('express')
const UserService = require('../services/userService')
const {authCookiesRoleAdmin} = require('../middleware/loginCredentials')
// const cookie = require('cookie-parser')

const userRoute=(app)=>{
    const router = express.Router()
    const userService = new UserService()
    app.use('/user',router)

    router.get('/',(req,res)=>{
        
        return res.status(200).send("Usuarios")
    })

    router.get('/all',authCookiesRoleAdmin,async(req,res)=>{
        const respuestaT = await userService.getUsers()
        return res.status(200).json(respuestaT)

    })
    router.post('/register',async(req,res)=>{
        const data = req.body
        const usuario = await userService.registerUser(data)
        return res.status(200).cookie("token",usuario.token,{
            httpOnly:true,
            secure:true,
            sameSite:"none"
        }).json(usuario)
    })
    router.post('/login',async(req,res)=>{
        const data = req.body
        const respuesta = await userService.loginUser(data)
        return res.status(200).cookie("token",respuesta.token,{
            httpOnly:true,
            secure:true,
            sameSite:"none"
        }).json(respuesta)
    })

    router.post('/delete',authCookiesRoleAdmin,async (req,res)=>{
        //necesita de autorizacion admin
        //  id del usuario
        const dataUserToDelete = req.body
        const respuesta = userService.deleteUser(dataUserToDelete)
        //cambiar status code
        return res.status(200).json(respuesta)

    })
    router.post('/update',authCookiesRoleAdmin,async (req,res)=>{
        const data = req.body
        const respuesta = await userService.updateUserRole(data)
        return res.status(200).json(respuesta)

    })
}
module.exports = userRoute