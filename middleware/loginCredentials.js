const jwt = require('jsonwebtoken')
const {jwt_secret} = require("../config/envVars")
const VerificacionUser = require('../services/vericacionUser')
const auth=(req,res,next)=>{


    const tokenBearer=req.header("Authorization")

    if(!tokenBearer) return res.status(403).json({access:false,message:"No tienes Acceso Se requiere token"})
    const token = tokenBearer.split(" ")[1]
    console.log(jwt.verify(token,jwt_secret))

    
     return next()
}
const authCookies = async (req,res,next)=>{
    try{
        const {token}=req.cookies
        if(!token) return res.status(403).json({access:false,message:"No tienes Acceso Se requiere tokenCookies"})
        const data = jwt.verify(token,jwt_secret)
        const logeoV = new VerificacionUser()
        if(!await logeoV.validLogin(data)) return res.status(403).json({access:false,message:"Credenciales incorrectas"})
        return next()
    }
    catch(e){return res.status(403).json({access:false,message:e.message})}
}
const authCookiesRoleAdmin = async (req,res,next)=>{
    try{
        const {token}=req.cookies
        if(!token) return res.status(403).json({access:false,message:"No tienes Acceso Se requiere tokenCookies"})
        const data = jwt.verify(token,jwt_secret)
        const logeoV = new VerificacionUser()
        // console.log(data)
        if(!await logeoV.validLogin(data)) return res.status(403).json({access:false,message:"Credenciales incorrectas"})
        if(data.Rol !== 10) return res.status(403).json({access:false,message:"No tienes Acceso"})
        return next()
    }
    catch(e){return res.status(403).json({access:false,message:e.message})}
}
const authCookiesRoleUser = async (req,res,next)=>{
    try{
        const {token}=req.cookies
        if(!token) return res.status(403).json({access:false,message:"No tienes Acceso Se requiere tokenCookies"})
        const data = jwt.verify(token,jwt_secret)
        const logeoV = new VerificacionUser()
        // console.log(data)
        if(!await logeoV.validLogin(data)) return res.status(403).json({access:false,message:"Credenciales incorrectas"})
        if(data.Rol < 2) return res.status(403).json({access:false,message:"No tienes Acceso"})
        return next()
    }
    catch(e){return res.status(403).json({access:false,message:e.message})}
}
const authCookiesRoleEditor = async (req,res,next)=>{
    try{
        const {token}=req.cookies
        if(!token) return res.status(403).json({access:false,message:"No tienes Acceso Se requiere tokenCookies"})
        const data = jwt.verify(token,jwt_secret)
        const logeoV = new VerificacionUser()
        // console.log(data)
        if(!await logeoV.validLogin(data)) return res.status(403).json({access:false,message:"Credenciales incorrectas"})
        if(data.Rol < 5) return res.status(403).json({access:false,message:"No tienes Acceso"})
        return next()
    }
    catch(e){return res.status(403).json({access:false,message:e.message})}
}
//Se ecporta como objeto porque mas adelante se 
// podrian exportar mas middelwares

module.exports = {auth,authCookies,authCookiesRoleAdmin,authCookiesRoleUser,authCookiesRoleEditor}