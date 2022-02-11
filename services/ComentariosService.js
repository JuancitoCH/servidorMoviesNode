const ComentariosModel = require("../models/Comentarios");

class ComentariosService{
    async AgregarComentario(MovieId){
        
       await ComentariosModel.create({MovieId})
       console.log("creadoComentario")

    }
}
module.exports = ComentariosService