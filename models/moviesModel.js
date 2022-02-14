const {mongoose} = require('../config/dbConection')
const {Schema} = mongoose

const MoviesSchema = new Schema({
    Title:String,
    Realease:Date,
    Sinopsis:String,
    Poster:String,
    Banner:String,
    Genere:Array,
    Cast:Array,
    Raiting:Number,
    Trailer:{type:String,default:"https://www.youtube.com/watch?v=-qWuhecwVmc"},
})

const MoviesModel = mongoose.model('movies',MoviesSchema)

module.exports=MoviesModel