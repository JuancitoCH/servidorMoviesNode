const UserModel = require("../models/userModel");
const jwt = require('jsonwebtoken')
const {jwt_secret} = require("../config/envVars")
const bcrypt = require('bcrypt')

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
        //compare
        if (await bcrypt.compare(Password,usuario.Password)) {
            usuario.Password = Password
            const token = this.signTokenOneDay(usuario)
            const User ={
                UserName:usuario.UserName,
                Email:usuario.Email,
                UserPhoto:usuario.UserPhoto
            }
            return {access:true,token,message:'acceso concedido',User}
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
        const res = await bcrypt.compare(Password,usuario.Password)
        return res
    }
    async hashPassword(password){
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password,salt)
    }
    async registrar(data,respuesta){
        const contraseña = data.Password
        data.Password = await this.hashPassword(data.Password)
        data.Rol = undefined
        const user = await UserModel.create(data)
        console.log("Se a Registrado un Usuario")
        user.Password = contraseña
        const token = this.signTokenOneDay(user)
        const {message,valid} = respuesta
        return {message,valid,token}

    }
}
module.exports = VerificacionUser