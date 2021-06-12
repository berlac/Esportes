const Sequelize = require('sequelize')
const config = require('../config/database')
const Produto = require('../model/Produto')
const User = require('../model/User')

const connection = new Sequelize(config);

Produto.init(connection);
User.init(connection);

module.exports = connection;