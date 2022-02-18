const {mongoose} = require('../config/dbConection')
const {Schema} = mongoose

const ComentarioShecma = new Schema({
    MovieId:String, 
    Email:String,
    Comentario:String,
    Raiting:{type:Number}
})

const ComentariosModel = mongoose.model('comentarios',ComentarioShecma)

module.exports=ComentariosModel
// const ComentarioShecma = new Schema({
//     MovieId:{type:String,unique:true},
//     Comentarios:[{type:{
//         Email:String,
//         Comentario:String,
//         Raiting:{type:Number}
//     }, default:[]}]
// })