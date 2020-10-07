// require dependencies
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const path = require('path')

// get the root directory path
const __rootDir = path.dirname(require.main.filename)

// get jsonwebtoken encryption key
const secret_jwt_code = process.env.SECRET_JWT_CODE

// get queries
const queryUserByName = require(`${__rootDir}/database/queries/query_user_by_name`)

// login function
const loginUser = req => {
    return new Promise((resolve, reject) => { // return a new promise
        if(!req.body.name || !req.body.password) { // check if the name and password were provided
            reject('Not all fields were provided') // if not all the fields were provided, reject with error message
            return // return the function to prevent further execution
        }
        queryUserByName(req.body.name)
            .then(user => {
                if(user === undefined) { // check if the does not exist
                    reject('That user does not exist') // reject with error mesage
                    return // return the function to prevent further execution
                } else { // the user exists
                    if(!bcrypt.compareSync(req.body.password, user['user_password'])) { // check if the password does not match the database password
                        reject('The entered password is incorrect') // reject with error mesage
                        return // return the function to prevent further execution
                    } else { // the provided password is correct
                        const token = jsonwebtoken.sign( // create a token
                            { id: user['user_id'], email: user['user_name'] }, // pass the username and userid
                            secret_jwt_code, // second encoding parameter is the jwt secret
                            { expiresIn: "1m" } // give the token an expiration time
                        )
                        resolve(token) // resolve promise with the new token
                        return // return function to prevent further execution
                    }
                }
            })
            .catch(err => {
                reject('Unexpected database query error') // reject promise with error message
                return // return function to prevent further execution
            })
    })
}

module.exports = loginUser