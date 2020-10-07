// get the database connection
const connection = require('../connection/connection')

// query a user by id
const queryAllUsers = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT user_id, user_name FROM users', (err, rows) => {
            if(err) { reject(err) }
            else { 
                if(rows === undefined) rows = undefined // prevents errors at client
                resolve(rows)
            }
        })
    })
}

// export the query
module.exports = queryAllUsers