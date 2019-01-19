const databaseClient = require('../database/client')

const getAllFeatures = () => databaseClient.getAll('features')

const getFeature = () => {}

module.exports = { getAllFeatures, getFeature }