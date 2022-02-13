const {mongoose} = require('../config/dbConection')
const {Schema} = mongoose

const ComentarioShecma = new Schema({
    MovieId:{type:String,unique:true},
    Comentarios:[{type:{
        Email:String,
        Comentario:String,
        Raiting:{type:Number}
    }, default:[]}]
})

const ComentariosModel = mongoose.model('comentarios',ComentarioShecma)

module.exports=ComentariosModel