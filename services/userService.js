const UserModel = require("../models/userModel");
const VerificacionUser = require("./vericacionUser");

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
                console.log("Se a Registrado un Usuario")
                const token = this.verificacion.signTokenOneDay(user)
                const {message,valid} = respuesta
                return {message,valid,token}
            }
            return respuesta
        }
        return {valid:false,message:'Los datos Proporcionados no son suficientes {UserName:String,Email:String,Password:String,UserPhoto:String(url)}'}
        
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