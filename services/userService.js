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
    async deleteUser(data){
        const {id} = data
        try{
            const deleted = await UserModel.findByIdAndDelete(id)
            return deleted
        }
        catch(e){
            return {message:"Usuario no encontrado",e}
        }

    }


    async registerUser(data){
        const validData = this.verificacion.validDataUser(data)
        if(validData){

            const respuesta = await this.verificacion.validEmailDB(data)
            const{valid} = respuesta
    
            if(valid){
                
                const user = await UserModel.create(data)

                const token = jwt.sign({Password:user.Password,Email:user.Email,UserName:user.UserName},jwt_secret,{expiresIn:'1d'})
                const {message,valid} = respuesta
                console.log("Se a Registrado un Usuario")
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
        // el valid = false es igual a usuario en base de datos
        if(!valid){
            const respuesta = await this.verificacion.validPasswordDB(data)
            return respuesta
        }
        return {access:false,message:'credenciales incorrectas'}

    }
}
module.exports = UserService