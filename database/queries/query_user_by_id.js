// get the database connection
const connection = require('../connection/connection')

// query a user by id
const queryUserById= (userid) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE `user_id` = ?', [userid], (err, rows) => {
            if(err) { reject(err) }
            else { 
                if(rows === undefined) rows = undefined // prevents errors at client
                resolve(rows[0])
            }
        })
    })
}

// export the query
module.exports = queryUserById