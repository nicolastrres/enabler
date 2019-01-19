const databaseClient = require('../database/client')

const getAllFeatures = () => databaseClient.getAll('features')

const getFeature = (featureName) => databaseClient.get('features', { name: featureName })

module.exports = { getAllFeatures, getFeature }