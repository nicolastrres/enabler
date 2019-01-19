const databaseClient = require('../database/client')

const getAllFeatures = () => databaseClient.getAll('features')

module.exports = { getAllFeatures }