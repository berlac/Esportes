const express = require('express')
const userController = require('../controller/userController')
const upload = require('../config/multer')

const routes = express.Router()

// List
routes.get('/', userController.list)

// Fliter
routes.post('/', userController.filter)

// Open Add
routes.get('/add', userController.openadd)

// Add
routes.post('/add', upload.single('avatar'),userController.add)

// Open Edit
routes.get('/edit/:id', userController.openedit) 

// Edit
routes.post('/edit/:id', upload.single('avatar'),userController.edit)

// Delete
routes.get('/del/:id', userController.delete)

module.exports = routes;