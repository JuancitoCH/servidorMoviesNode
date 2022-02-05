const express = require('express')
const Movie = require('../services/moviesService')


const moviesRoutes=(app)=>{
    const router = express.Router()
    const movies = new Movie()
    //uzo de la ruta por parte de app
    app.use('/movies',router)

    router.get('/',async(req,res)=>{
        const moviesList = await movies.getAllMovies()
        return res.status(200).json(moviesList)
    })
    router.post('/create',async(req,res)=>{
        
        const data = req.body
        const mesage = await movies.createMovie(data)
        console.log(mesage)
        
        return res.status(201).json(mesage)
    })

}
module.exports = moviesRoutes