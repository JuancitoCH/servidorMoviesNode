require("dotenv").config()

const varConfig = {
    port: process.env.PORT,
    db_userName: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_host : process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    jwt_secret: process.env.JWT_SECRET
}

module.exports = varConfig