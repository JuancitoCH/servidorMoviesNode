//imports
const express = require('express')
const { connection:coneccionDb } = require('./config/dbConection')
const moviesRoutes = require('./routes/moviesRoutesManager')
const enVar = require('./config/envVars')
const userRoute = require('./routes/userRoute')
const cors = require('cors')
const cookies = require('cookie-parser')
//definition of app for express
coneccionDb()
const app = express()
//middelware
app.use(express.json())
app.use(cors({
    origin:'*'
}))
app.use(cookies())

//routes
moviesRoutes(app)
userRoute(app)

app.get('/',(req,res)=>{
return res.send('IndexApi')
})


app.listen(enVar.port,()=>{
    console.log('conectado '+ enVar.port)
})