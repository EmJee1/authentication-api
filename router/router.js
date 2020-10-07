// require dependencies
const express = require('express')
const path = require('path')

// create the express router
const router = express.Router()

// get the root directory path
const __rootDir = path.dirname(require.main.filename)

// get authentication functions
const loginUser = require(`${__rootDir}/functions/login_user`)
const checkToken = require(`${__rootDir}/functions/check_token`)

// get database queries
const queryUserById = require(`${__rootDir}/database/queries/query_user_by_id`)
const queryUserByName = require(`${__rootDir}/database/queries/query_user_by_name`)
const queryAllUsers = require(`${__rootDir}/database/queries/query_user_all`)

// define the routes
// get user by id post request handler
router.post('/getuser/id/:userid', (req, res) => {
    const userid = req.params.userid // get the user id to fetch data from, from the url parameter
    let newToken // create a variable to store the new token
    checkToken(req)
        .then(response => {
            newToken = response
            return queryUserById(userid)
        })
        .then(response => {
            res.json({"token": newToken, "response": response})
        }).catch(err => {
            res.json({"error": err})
        })
})

// get user by username post request handler
router.post('/getuser/username/:username', (req, res) => {
    const username = req.params.username // get the user id to fetch data from, from the url parameter
    let newToken // create a variable to store the new token
    checkToken(req)
        .then(response => {
            newToken = response
            return queryUserByName(username)
        })
        .then(response => {
            res.json({"token": newToken, "response": response})
        })
        .catch(err => {
            res.json({"error": err})
        })
})

// get all users post request handler
router.post('/getuser/all', (req, res) => {
    let newToken // create variable to store the new token
    checkToken(req)
        .then(response => {
            newToken = response
            return queryAllUsers()
        })
        .then(response => {
            res.json({"token": newToken, "response": response})
        })
        .catch(err => {
            res.json({"error": err})
        })
})

// validate token post request handler
router.post('/token/validate', (req, res) => {
    checkToken(req)
        .then(response => {
            res.json({'response': response})
        }).catch(err => {
            res.json({"error": err})
        })
})

// login user post request handler
router.post('/login', (req, res) => {
    loginUser(req)
        .then(response => {
            res.json({'valid_login': true, "token": response})
        })
        .catch(err => {
            res.json({'valid_login': false, "error": err})
        })
})

// export the router
module.exports = router