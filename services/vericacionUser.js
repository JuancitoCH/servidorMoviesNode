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
            const token = jwt.sign({Password,usuario},jwt_secret,{expiresIn:'1d'})
            // console.log({acses:true,token,message:'acceso concedido'})
            return {acses:true,token,message:'acceso concedido'}
        }
        return {acses:false,message:'password incorrecta credenciales incorrectas'}
    }
    validDataUser(data){
        const {UserName,Email,Password,UserPhoto} = data
        if(UserName&&Email&&Password&&UserPhoto){
            return true
        }
        return false
        /*
        UserName:String,
    Email:{type:String,unique:true},
    Password:String,
    UserPhoto:String,
    RegisterDate:{type:Date,default:Date.now}
        */
    }

}
module.exports = VerificacionUser