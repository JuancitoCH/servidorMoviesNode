const MoviesModel = require('../models/moviesModel')
const VerificacionMovie = require('./verificacionMovies')

class Movie {

    constructor(){
        this.verificacionM = new VerificacionMovie()
    }
    async getAllMovies(){
        return await MoviesModel.find()
    }
    async createMovie(movieData){
        // no se donde poner la funcion de verificacion si aqui directamente o en la clase misma

        const {message,reject} = await this.verificacionM.verificarDatosBase(movieData)
        if(!reject){
            const validacion = this.verificacionM.verificacionDatosReq(movieData)
            if(validacion){
                await MoviesModel.create(movieData)
                return{message:'Succesfully created'}
            }
            else return {message:"Los Datos Proporcionados no son Suficiente"}
        }
        return {message}
     
    }
}
module.exports = Movie

// {
//     "Title":"Spider-Man: No Way Home",
//     "Realease":"2021-16-12",
//     "Sinopsis":"Tras descubrirse la identidad secreta de Peter Parker como Spider-Man, la vida del joven se vuelve una locura. Peter decide pedirle ayuda al Doctor Extraño para recuperar su vida. Pero algo sale mal y provoca una fractura en el multiverso.",
//     "Poster":"https://www.cinemascomics.com/wp-content/uploads/2022/01/poster-Spider-man-no-way-home.jpg",
//     "Banner":"https://pbs.twimg.com/media/FFDcziJXwAc_sI5?format=jpg&name=large",
//     "Genere":["accion","superheroes","comedia","fantasia","aventura"],
//     "Cast":["Tom Holland","Tobey Maguire","Zendaya","Andrew Garfield","Williem Dafoe","Marisa Tomei","Alfred Molina","Jacob Batal","Benedict Cumberbatch"],
//     "Raiting":4.8
// }