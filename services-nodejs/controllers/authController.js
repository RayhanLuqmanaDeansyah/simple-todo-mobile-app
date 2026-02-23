const user = require('../models/userModel')
const bcrypt = require('bcrypt')
const response = require('../response')


exports.login = (req, res) => {
    const {email, password} = req.body


    // cari user tersebut
    user.cariByEmail(email, async (err, result)=> {
        if(err){
            return response(500, null, "Terjadi kesalahan Pada Server", res)
        }
        

        if(result.length == 0){
            return response(404, null, "user tidak ditemukan",res)
        }

        // Ambil index ke 0 
        const userFromDb = result[0]

        // password Checking
        const match = await bcrypt.compare(password, userFromDb.password)

        // kondisi
        // jika user tidak ditemukan
       
        // jika ditemukan
        if(match){
            const userData = {nama: userFromDb.nama, email: userFromDb.email}
            return response(200, userData, "Login berhasil", res)
        }
        // jika salah
        return response(401, null, "password salah", res)

    })


 }


 exports.register = async (req, res) => {
    const {nama, email,password} = req.body
    const saltRound = 10

    bcrypt.hash(password, saltRound, (err, hash)=>{
        if(err){
            return response(500, null, "gagal hashing password!", res)
        }

        user.simpanUserBaru(nama,email,hash, (err,result) => {
            if(err){
                if(err.code === "ER_DUP_ENTRY") return  response(400, null,"Email Sudah Terdaftar, Harap Gunakan Email yang lain!", res)
                return response(500, null, "Gagal menyimpan data", res)
            }
            response(201, {id:result.insertId}, "berhasil menyimpan data", res)
        })
    })

    


 }