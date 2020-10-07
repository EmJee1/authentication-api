// require dependencies
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// get jsonwebtoken encryption key
const secret_jwt_code = process.env.SECRET_JWT_CODE

// require queries
const queryUserById = require("../database/queries/query_user_by_id")

const checkToken = req => {
    return new Promise((resolve, reject) => {
        if(req.headers && req.headers.authorization) {
            const authorization = req.headers.authorization
            let decoded
            try {
                decoded = jsonwebtoken.verify(authorization, secret_jwt_code)
            } catch {
                reject('Token invalid')
                return
            }
            let userid = decoded.id
            queryUserById(userid)
                .then(user => {
                    const token = jsonwebtoken.sign(
                        { id: user['user_id'], email: user['user_name'] },
                        secret_jwt_code,
                        { expiresIn: "8m" }
                    )
                    resolve(token)
                })
                .catch(err => {
                    reject(`Token error: ${err}`)
                })
        } else {
            reject('No token found')
        }
    })
}

module.exports = checkToken