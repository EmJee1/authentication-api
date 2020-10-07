// get the database connection
const connection = require('../connection/connection')

// query a user by id
const queryUserByName= (username) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE `user_name` = ?', [username], (err, rows) => {
            if(err) { reject(err) }
            else { 
                if(rows === undefined) rows = undefined // prevents errors at client
                resolve(rows[0])
            }
        })
    })
}

// export the query
module.exports = queryUserByName