const {mongoose} = require('../config/dbConection')
const {Schema} = mongoose

const UserSchema = new Schema({
    UserName:String,
    Email:{type:String,unique:true},
    Password:String,
    UserPhoto:String,
    RegisterDate:{type:Date,default:Date.now}
})

const UserModel = mongoose.model('users',UserSchema)
module.exports = UserModel