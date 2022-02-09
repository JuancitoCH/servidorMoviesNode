const express = require('express')
const UserService = require('../services/UserService')
const {auth, authCookies,authCookiesRoleAdmin} = require('../middleware/loginCredentials')
const cookie = require('cookie-parser')
const userRoute=(app)=>{
    const router = express.Router()
    const userService = new UserService()
    app.use('/user',router)

    router.get('/all',authCookiesRoleAdmin,async(req,res)=>{
        // console.log(req.header("Authorization"))
        // console.log(req.originalUrl+req.method)
        // console.log(req.cookies)
        const respuestaT = await userService.getUsers()
        return res.status(200).json(respuestaT)

    })
    router.post('/register',async(req,res)=>{
        const data = req.body
        const usuario = await userService.registerUser(data)
        return res.status(200).cookie("token",usuario.token,{
            httpOnly:true,
            // secure:true,
            // sameSite:"none"
        }).json(usuario)
    })
    router.post('/login',async(req,res)=>{
        const data = req.body
        const respuesta = await userService.loginUser(data)
        return res.status(200).cookie("token",respuesta.token,{
            httpOnly:true,
            // secure:true,
            // sameSite:"none"
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
    router.post('/update',auth,async (req,res)=>{
        
    })
}
module.exports = userRoute