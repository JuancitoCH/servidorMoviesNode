const jwt = require('jsonwebtoken')
const {jwt_secret} = require("../config/envVars")

const auth=(req,res,next)=>{

    // return next()
    return res.status(403).json({message:"No tienes Acceso"})

}

module.exports = auth