const ComentariosModel = require("../models/Comentarios");
const VerificarComentarios = require("./verificacionComentarios")
const MoviesModel = require('../models/moviesModel')

class ComentariosService{
    constructor(){
        this.verificacionC= new VerificarComentarios()
        
    }
 
    async getComentario(MovieId){
        try{
            const Comentarios = await ComentariosModel.find({MovieId})
            return Comentarios
        }
        catch{
            
            return "sinComentarios"
        }
    }
    async Comentar(data,cookie){
        try{
            const {condicion,Email} = await this.verificacionC.verifyComentar(data,cookie)
            if(!condicion) return {message:"Los Datos Proporcionados son insuficientes" , Datos:"{{Comentario:'string',Raiting:'number'} }"}
            const {MovieId,Comentario,Raiting} = data
            const movieExistance = await MoviesModel.findById(MovieId)
            if(!movieExistance) return {message:"La Movie No existe"}
            
            await ComentariosModel.create({Email,Comentario,Raiting,MovieId})
            const Comentarios = await ComentariosModel.find({MovieId})

            return  Comentarios
        }
        catch(e){
            console.log("error")
            console.log(e)
            return {message:e.message}
        }
    }
    async deleteSeccionComentario(MovieId,Email){
        // const comentarioDel = await ComentariosModel.findOneAndDelete({Email,MovieId})
        console.log(comentarioDel)
    }
}
module.exports = ComentariosService