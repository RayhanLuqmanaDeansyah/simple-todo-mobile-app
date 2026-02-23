const db = require('../config/db')


const user = {
    // Cari user berdasarkan email  
    cariByEmail: (email, callback) => {
        const sql = `SELECT * FROM users WHERE email = ? `

        db.query(sql,  [email] , callback)
    },


    simpanUserBaru: (nama, email, password, callback) =>{
        const sql = `INSERT INTO users (nama, email, password) VALUES (?,?,?)`

        db.query(sql, [nama,email,password], callback)
    }
}


module.exports = user