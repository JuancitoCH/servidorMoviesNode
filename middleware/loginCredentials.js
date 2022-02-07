const jwt = require('jsonwebtoken')
const {jwt_secret} = require("../config/envVars")

const auth=(req,res,next)=>{
    const tokenBearer=req.header("Authorization")

    if(!tokenBearer) return res.status(403).json({access:false,message:"No tienes Acceso Se requiere token"})
    const token = tokenBearer.split(" ")[1]
    console.log(jwt.verify(token,jwt_secret))

    
     return next()
}


//Se ecporta como objeto porque mas adelante se 
// podrian exportar mas middelwares

module.exports = {auth}