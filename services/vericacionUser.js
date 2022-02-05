const UserModel = require("../models/userModel");


class VerificacionUser {
    async validEmailDB(data){
        const {Email}=data
        const validEmail = await UserModel.findOne({Email})
        if(validEmail) return { valid:false,message:"Este Email Ya Existe" }
        return {valid:true,message:"Es posible Registrarlo"}
    }

}
module.exports = VerificacionUser