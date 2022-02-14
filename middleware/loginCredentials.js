const jwt = require('jsonwebtoken')
const {jwt_secret} = require("../config/envVars")
const VerificacionUser = require('../services/vericacionUser')

const authParaRoles= async(Rol,req,res,next)=>{
    try{
        const {token}=req.cookies
        if(!token) return res.status(403).json({access:false,message:"No tienes Acceso Se requiere tokenCookies"})
        const data = jwt.verify(token,jwt_secret)
        const logeoV = new VerificacionUser()
        // console.log(data)
        if(!await logeoV.validLogin(data)) return res.status(403).json({access:false,message:"Credenciales incorrectas"})
        if(data.Rol<Rol) return res.status(403).json({access:false,message:"No tienes Acceso"})
        return next()
    }
    catch(e){return res.status(403).json({access:false,message:e.message})}
}

const authCookiesRoleAdmin = async (req,res,next)=>{
    authParaRoles(10,req,res,next)
}
const authCookiesRoleUser = async (req,res,next)=>{
    authParaRoles(2,req,res,next)
}
const authCookiesRoleEditor = async (req,res,next)=>{
    authParaRoles(5,req,res,next)
}

module.exports = {authCookiesRoleAdmin,authCookiesRoleUser,authCookiesRoleEditor}


// const authCookiesGlobalNoUsar = async (req,res,next)=>{
    //     try{
        //         const {token}=req.cookies
        //         if(!token) return res.status(403).json({access:false,message:"No tienes Acceso Se requiere tokenCookies"})
        //         const data = jwt.verify(token,jwt_secret)
        //         const logeoV = new VerificacionUser()
        //         if(!await logeoV.validLogin(data)) return res.status(403).json({access:false,message:"Credenciales incorrectas"})
        //         return next()
        //     }
        //     catch(e){return res.status(403).json({access:false,message:e.message})}
        // }
        // const auth=(req,res,next)=>{
        //     const tokenBearer=req.header("Authorization")
        //     if(!tokenBearer) return res.status(403).json({access:false,message:"No tienes Acceso Se requiere token"})
        //     const token = tokenBearer.split(" ")[1]
        //     console.log(jwt.verify(token,jwt_secret))
        //      return next()
        // }


