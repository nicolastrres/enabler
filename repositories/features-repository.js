const databaseClient = require('../database/client')

const getAllFeatures = () => databaseClient.getAll()

module.exports = { getAllFeatures }