const ComentariosModel = require("../models/Comentarios");
const VerificarComentarios = require("./verificacionComentarios")

class ComentariosService{
    constructor(){
        this.verificacionC= new VerificarComentarios()
        
    }
    async AgregarComentario(MovieId){
        
       await ComentariosModel.create({MovieId})
       console.log("creadoComentario")

    }
    async Comentar(data,cookie){
        // ta mal hay que pasar bien los datos a la funcion de verificacion
        try{

            const {condicion,Email} = await this.verificacionC.verifyComentar(data,cookie)
            if(!condicion) return {message:"datos mal"}
            const {MovieId,Comentario,Raiting} = data
            return await ComentariosModel.findOneAndUpdate({MovieId},{Comentarios:[...Comentarios,{Email,Comentario,Raiting}]},{new:true})
        }
        catch(e){
            console.log("error")
            console.log(e)
        }
    }
}
module.exports = ComentariosService