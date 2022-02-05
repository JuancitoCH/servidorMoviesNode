const mongoose = require('mongoose')
const varConfig = require('./envVars')

const connection = async ()=>{
    try{
        // console.log(mongoose)
        const conn = await mongoose.connect(`mongodb+srv://${varConfig.db_userName}:${varConfig.db_password}@${varConfig.db_host}/${varConfig.db_name}`)
        console.log('MongoDb connected '+conn.connection.host)
        // console.log(mongoose)
    }
    catch(e){
        console.log(e)
    }

}

module.exports = {connection,mongoose}