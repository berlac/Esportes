const Sequelize = require('sequelize')
const congif = require('../config/database')

const connection = new Sequelize(config);

module.exports = connection;