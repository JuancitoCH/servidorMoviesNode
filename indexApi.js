//imports
const express = require('express')
const moviesRoutes = require('./routes/moviesRoutesManager')
const userRoute = require('./routes/userRoute')
const enVar = require('./config/envVars')
const cookies = require('cookie-parser')
const cors = require('cors')
//definition of app for express
const app = express()

//coneccionDataBase
const { connection:coneccionDb } = require('./config/dbConection')
coneccionDb()


//middelware
app.use(express.json())
app.use(cors({
    origin:['http://127.0.0.1:5500','http://localhost:3000'],
    credentials:true
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