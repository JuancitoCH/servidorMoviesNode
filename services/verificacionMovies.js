const MoviesModel = require('../models/moviesModel')

class VerificacionMovie {
    async verificarDatosBase(data){
        
        const err = await MoviesModel.findOne({Title: data.Title})
        //verificacion en la base de datos por unicamente el titulo de la movie
        if(err) return {reject:true,message:"Ya existe esta Pelicula"}
        return {reject:false,message:"Este titulo de pelicula no se encuentra en nuestra base de datos"}
        
    }

    verificacionDatosReq(data){
        const {Title,Realease,Sinopsis,Poster,Banner,Raiting,Genere,Cast} = data
        if(Title&&Realease&&Sinopsis&&Poster&&Banner&&Raiting&&Genere&&Cast) return true
        return false
    }
    
}

module.exports= VerificacionMovie