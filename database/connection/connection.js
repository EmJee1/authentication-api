// require dependencies
const mysql = require('mysql')

// get database connection variables from .env file
const database_connection_uri = process.env.DATABASE_CONNECTION_URI
const database_username = process.env.DATABASE_USER
const database_password = process.env.DATABASE_PASSWORD
const database_name = process.env.DATABASE_NAME

// create database connection
const connection = mysql.createConnection({
    host: database_connection_uri,
    user: database_username,
    password: database_password,
    database: database_name
})

// database connection error handling
connection.connect(err => {
    if(err) {
        console.error(`Database connection error: ${err}`)
        return
    } console.log('Database connection established')
})

// export the connection
module.exports = connection