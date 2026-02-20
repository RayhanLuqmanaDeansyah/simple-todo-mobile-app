const mysql = require('mysql')
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'todo',
    port: 3307

})

db.connect((err) => {
if(err){
    return console.error("gagal konek ke dalam database!", err)
}
console.log("berhasil terhubung ke dalam database!")
}) 

module.exports = db;