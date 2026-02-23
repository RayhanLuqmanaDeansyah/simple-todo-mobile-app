const Todo = require('../models/todoModel')
const response = require('../response')

exports.getTodoList = (req, res) => {

    
    // memanggil fungsi dari models
    Todo.getAll((err, result) => {
        if(err){
            console.log(err)
            return response(500, null, "Terjadi Kesalahan saat mengambil data", res)
        }
        response(200, result, "Berhasil Mengambil data", res)
    })

    
}


exports.getTodoListById = (req, res) => {

    const id = req.params.id
    

    Todo.getListById(id, (err, result) => {
        if(err){
            return response(500, null, "Terjadi Kesalahan Saat mengambil data", res)
        }

        if(result.length == 0) {
            return response(404, null, "id tidak ditemukan", res)
        }

        response(200, result[0], "Berhasil Mengambil Data", res)
    })
}

