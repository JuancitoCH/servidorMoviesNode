const UserModel = require("../models/userModel");
const jwt = require('jsonwebtoken')
const {jwt_secret} = require("../config/envVars")

class VerificarComentarios{
   
    async verifyComentar(data,cookie){
        const {IdMovie,Comentario} = data
        if(!(IdMovie && Comentario.Comentario && Comentario.Rating)) return {condicion :false}
        const datos = jwt.verify(cookie.token,jwt_secret)
        const usuario = await UserModel.findOne(datos.Email)
        if(!usuario) return {condicion :false}
        return {condicion:true,Email:datos.Email}

        //verificar el usuario y ver si Email esta en el token que creo que si
    }
}
module.exports = VerificarComentarios