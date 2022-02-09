const express = require('express')
const Movie = require('../services/moviesService')
const { authCookiesRoleAdmin,authCookiesRoleUser,authCookiesRoleEditor } = require('../middleware/loginCredentials')

const moviesRoutes=(app)=>{
    const router = express.Router()
    const movies = new Movie()
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
    router.post('/delete',authCookiesRoleEditor,async(req,res)=>{
        
        const data = req.body
        const mesage = await movies.deleteMovie(data)
        console.log(mesage)
        
        return res.status(201).json(mesage)
    })

}
module.exports = moviesRoutes