// require dependencies
const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()

// create the express app object
const app = express()

// import the express router
const router = require('./router/router')

// get the port number from the .env, if it returns undefined set it to 3000
const port = process.env.PORT

// use global middleware
app.use(bodyParser.json())

// use the router
app.use(router)

// listen on the provided port
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})