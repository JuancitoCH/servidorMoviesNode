const UserModel = require("../models/userModel");
const VerificacionUser = require("./vericacionUser");

class UserService{
    constructor(){
        this.verificacion = new VerificacionUser()
    }
    async getUsers(){

        return await UserModel.find()
    }
    async registerUser(data){
        const {valid,message} = await this.verificacion.validEmailDB(data)
        
        if(valid){
            const user = await UserModel.create(data)
            user.Password = undefined
            user.__v = undefined
            user._id = undefined
            return {message:"Usuario Registrado",user}
        }
        return {valid,message}
        
    }
    async loginUser(){
    }
}
module.exports = UserService