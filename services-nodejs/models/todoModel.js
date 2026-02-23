const db = require('../config/db');

const todo = {
    getAll:(callback) => {
        const sql =   `SELECT * FROM list`
        db.query(sql, callback)
    },

    getListById:(id, callback) => {
        const sql = `SELECT * FROM list WHERE id = ?`
        db.query(sql,[id] , callback)
    }
}

module.exports = todo;