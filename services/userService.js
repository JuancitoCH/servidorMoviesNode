const UserModel = require("../models/userModel");
const VerificacionUser = require("./vericacionUser");
const jwt = require('jsonwebtoken')
const {jwt_secret} = require("../config/envVars")

class UserService{
    constructor(){
        this.verificacion = new VerificacionUser()
    }
    async getUsers(){

        return await UserModel.find()
    }
    async registerUser(data){
        const validData = this.verificacion.validDataUser(data)
        if(validData){

            const respuesta = await this.verificacion.validEmailDB(data)
            const{valid} = respuesta
    
            if(valid){
                
                const user = await UserModel.create(data)

                const token = jwt.sign({Password:user.Password,Email:user.Email},jwt_secret,{expiresIn:'1d'})
                const {message,valid} = respuesta
                return {message,valid,token}
            }
            return respuesta
        }
        /*
        UserName:String,Email:{type:String,unique:true},Password:String,UserPhoto:String(url),RegisterDate:{type:Date,default:Date.now}
        */
        return {valid:false,message:'Los datos Proporcionados no son suficientes {UserName:String,Email:{type:String,unique:true},Password:String,UserPhoto:String(url),RegisterDate:{type:Date,default:Date.now}}'}
        
    }
    async loginUser(data){
        const {valid} = await this.verificacion.validEmailDB(data)
        if(!valid){
            const respuesta = await this.verificacion.validPasswordDB(data)
            return respuesta
        }
        return {acces:false,message:'credenciales incorrectas'}

    }
}
module.exports = UserService