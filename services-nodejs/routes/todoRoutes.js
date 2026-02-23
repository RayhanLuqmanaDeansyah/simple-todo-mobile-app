const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

// MENDEFINISIKAN JALUR 

router.get('/', todoController.getTodoList)
router.get('/find/:id', todoController.getTodoListById)





module.exports = router;