const UserModel = require("../models/userModel");
const ComentariosModel = require('../models/Comentarios')
const jwt = require('jsonwebtoken')
const {jwt_secret} = require("../config/envVars")

class VerificarComentarios{
   
    async verifyComentar(data,cookie){

        const {MovieId,Comentario} = data
        if(!(MovieId && Comentario)) return {condicion :false}
        if(!(Comentario.Comentario && Comentario.Raiting)) return {condicion:false}

        const datos = jwt.verify(cookie.token,jwt_secret)
        const usuario = await UserModel.findOne({Email:datos.Email})
        if(!usuario) return {condicion :false}
        return {condicion:true,Email:datos.Email}

        //verificar el usuario y ver si Email esta en el token que creo que si
    }
    async verifyExistensReview(MovieId){
        existenceReview = await ComentariosModel.findOne({MovieId})
    }
}
module.exports = VerificarComentarios