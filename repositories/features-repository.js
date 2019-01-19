const databaseClient = require('../database/client')

const getAllFeatures = () => databaseClient.getAll('features')

const getFeature = (featureName) => databaseClient.get('features', { name: featureName })

const createFeatures = () => {}

module.exports = { createFeatures, getAllFeatures, getFeature }