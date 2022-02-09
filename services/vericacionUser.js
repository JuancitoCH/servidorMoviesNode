const UserModel = require("../models/userModel");
const jwt = require('jsonwebtoken')
const {jwt_secret} = require("../config/envVars")


class VerificacionUser {
    
    async validEmailDB(data){
        const {Email}=data
        const validEmail = await UserModel.findOne({Email})
        if(validEmail) {
            return { valid:false,message:"Este Email Ya Existe" }
        }
        return {valid:true,message:"Usuario Registrado"}
    }
    
    async validPasswordDB(data){
        const {Password,Email} = data
        const usuario = await UserModel.findOne({Email})

        if (usuario.Password === Password) {
            const token = this.signTokenOneDay(usuario)
            return {access:true,token,message:'acceso concedido'}
        }
        return {access:false,message:'password incorrecta credenciales incorrectas'}
    }
    validDataUser(data){
        const {UserName,Email,Password,UserPhoto} = data
        if(UserName&&Email&&Password&&UserPhoto)return true
        return false
    }

    signTokenOneDay(user){
        const token = jwt.sign({Password:user.Password,Email:user.Email,UserName:user.UserName,Rol:user.Rol},jwt_secret,{expiresIn:'1d'})
        return token
    }
    async validLogin({Email,Password}){
        const usuario = await UserModel.findOne({Email})
        if(!Email) return false
        if(usuario.Password !== Password) return false
        return {access:true}
    }
}
module.exports = VerificacionUser