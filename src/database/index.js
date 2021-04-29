const Sequelize = require('sequelize')
const config = require('../config/database')
const Produto = require('../model/Produto')

const connection = new Sequelize(config);

Produto.init(connection);

module.exports = connection;