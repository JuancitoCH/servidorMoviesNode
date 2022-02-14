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
    async getComentario(MovieId){
        try{
            const {Comentarios} = await ComentariosModel.findOne({MovieId})
            return Comentarios
        }
        catch{
            
            return "sinComentarios"
        }
    }
    async Comentar(data,cookie){
        try{
            const {condicion,Email} = await this.verificacionC.verifyComentar(data,cookie)
            if(!condicion) return {message:"Los Datos Proporcionados son insuficientes" , Datos:"{Comentario:'string',Raiting:'number' }"}

            const {MovieId,Comentario:{Comentario},Raiting} = data
            const {Comentarios} = await ComentariosModel.findOne({MovieId})

            if(Comentarios) return await ComentariosModel.findOneAndUpdate({MovieId},{Comentarios:[...Comentarios,{Email,Comentario,Raiting}]},{new:true})

            return  await ComentariosModel.findOneAndUpdate({MovieId},{ Comentarios:[{Email,Comentario,Raiting}] },{new:true})
        }
        catch(e){
            console.log("error")
            console.log(e)
        }
    }
    async deleteSeccionComentario(MovieId){
        const comentarioDel = await ComentariosModel.findOneAndDelete({MovieId})
        console.log(comentarioDel)
    }
}
module.exports = ComentariosService