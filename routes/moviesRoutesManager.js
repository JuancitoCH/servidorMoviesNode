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
    // router.get('/',(req,res)=>{
            
    //         return res.status(200).json({moviesList:"aaaaa"})
    //     })

    router.get('/',async(req,res)=>{
        const moviesList = await movies.getAllMovies()
        return res.status(200).json(moviesList)
    })
    router.get('/:id',async(req,res)=>{
        const {id:MovieId} = req.params
        const Movie = await movies.getOneId(MovieId)
        const Comentarios = await comentarios.getComentario(MovieId)
        return res.status(200).json({Movie,Comentarios})
        
    })
    router.post('/create',authCookiesRoleEditor,async(req,res)=>{
        const data = req.body
        const mesage = await movies.createMovie(data)        
        return res.status(201).json(mesage)
    })
    router.post('/:id/comentar',authCookiesRoleUser,async(req,res)=>{
        const {id:MovieId} = req.params
        const {Comentario}=req.body
        
        const data = {Comentario,MovieId}
        console.log(data)
        const mesage = await comentarios.Comentar(data,req.cookies)
        if(!mesage) return res.status(400).json({message:"La Entrada no existe"})
       
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