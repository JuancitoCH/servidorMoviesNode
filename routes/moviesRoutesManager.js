const express = require('express')
const Movie = require('../services/moviesService')
const Comentar = require('../services/ComentariosService')
const { authCookiesRoleAdmin,authCookiesRoleUser,authCookiesRoleEditor } = require('../middleware/loginCredentials')

const moviesRoutes=(app)=>{
    const router = express.Router()
    const movies = new Movie()
    const comentarios = new Comentar()
    //uzo de la ruta por parte de app
    app.use('/movies',router)

    router.get('/',authCookiesRoleUser,async(req,res)=>{
        const moviesList = await movies.getAllMovies()
        return res.status(200).json(moviesList)
    })
    router.post('/create',authCookiesRoleUser,async(req,res)=>{
        
        const data = req.body
        const mesage = await movies.createMovie(data)
        console.log(mesage)
        
        return res.status(201).json(mesage)
    })
    router.post('/:id/comentar',authCookiesRoleUser,async(req,res)=>{
        const {id:IdMovie} = req.params
        const {Comentario}=req.body
        const data = {Comentario,IdMovie}
        const mesage = comentarios.Comentar(data,req.cookies)
       
        return res.status(201).json(mesage)
    })

    router.post('/delete',authCookiesRoleEditor,async(req,res)=>{
        
        const data = req.body
        const mesage = await movies.deleteMovie(data)
        console.log(mesage)
        
        return res.status(201).json(mesage)
    })

}
module.exports = moviesRoutes