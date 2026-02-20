const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./connection')
const port = 3001
const response = require('./response')
const bcrypt = require('bcrypt')


app.use(cors())
app.use(express.json())


app.get('/list', (req,res) => {
const sql =  "SELECT * FROM list"
db.query(sql, (err, result) => {
    if(err){
        console.log(err)
        return response(400, null, "terjadi kesalahan", res)
    }else{
        console.log(result)
        response(200, result, "Ini adalah list dari Todo", res)
    }
})
})



app.post('/add', (req, res) => {
    const {user_id, title, description} = req.body
    if(!user_id || !title || !description){
       return response(400, null, "data tidak boleh kosong", res)
    } 

    const sql = "INSERT INTO list (user_id, title, description) VALUES (?,?,?)"
    
    db.query(sql, [user_id, title, description], (err, result) => {
        if(err){
            console.error(err)
            return response(400, null, "terjadi kesalahan", res)
        }
        const data = {
            id: result.insertId,
            user_id,
            title,
            description
        }
        // Kirim response jika data berhasil masuk
        response(200, data, "data berhasil ditambahkan", res)
    })
})


// DELETE
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM list WHERE id = ?"

    db.query(sql, [id], (err, result) => {
        if(err){
           console.error(err)
           return response(400, null, "gagal menghapus data dari database", res)
        }

        if(result.affectedRows === 0){
            return response(404, null, "data tidak ditemukan", res)
        }

        response(200, {deletedId: id}, "data berhasil dihapus", res)
    })

})



// LOGIN ROUTE
app.post('/login', async (req, res) =>{
    const {email, password} = req.body
    const sql = `SELECT * FROM users WHERE email = ?`

    db.query(sql, [email], async (err, result) => {
        if(err){
            response(500, null, "Terjadi Error di Server!", res)
        }

        if(result.length == 0) {
            return response(404, null, "pengguna tidak ditemukan!", res)
        }
        
        const user = result[0]
        const match = await bcrypt.compare(password, user.password)
        
        const userData = {
            nama: user.nama,
            email: user.email
        }

        if(match){
            return response(200, userData, "Login Berhasil", res )
        }else{
            return response(401, null, "Password yang kamu masukkan salah!", res)
        }
    
    })
})


 // REGISTER ROUTE
 const saltRounds = 10
 app.post('/register', async (req, res) => {
     const {nama, email, password} = req.body

     bcrypt.hash(password, saltRounds, (err, hash)=> {
         if(err){
             return response(500, null, "Gagal Mengenkripsi password", res)
         }


         // JIka tidak error maka simpan ke dalam database
         const sql = `INSERT INTO users (nama, email, password) VALUES (?, ? , ?)`
         db.query(sql, [nama, email, hash], (err, result) => {
             if(err){
                 if(err.code == "ER_DUP_ENTRY"){
                     return response(400, null, "Email Sudah terdaftar", res)
                 }else{
                     return response(500, null, "gagal menyimpan user", res)
                 }
             }
             else{
                 const data ={
                     isSuccess : result.affectedRows > 0,
                     id: result.insertId
                 };

                 response(201, data, "User Berhasil Didaftarkan", res)
             }
         })
     })
 })



app.listen(port, () => {
    console.log(`Server Started on Port ${port}`)
})