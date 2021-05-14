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
routes.get('/edit/:id', produtoController.openedit) 

// Edit
routes.post('/edit/:id', produtoController.edit)

// Delete
routes.get('/del/:id', produtoController.delete)

module.exports = routes;