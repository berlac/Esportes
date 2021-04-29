const express = require('express')
const produtoController = require('../controller/produtoController')

const routes = express.Router()

// List
routes.get('/', produtoController.list)

// Fliter
routes.post('/', produtoController.filter)

// Open Add
routes.get('/add', produtoController.openadd)

// Add
routes.post('/add', produtoController.add)

// Open Edit
routes.get('/edt/:id', produtoController.openedit) 

// Edit
routes.post('/edt/:id', produtoController.edit)

// Delete
routes.get('/del/:id', produtoController.delete)

module.exports = routes;