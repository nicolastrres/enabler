const databaseClient = require('../database/client')
const { get, omit, map } = require('lodash/fp')

const getAllFeatures = () => databaseClient.getAll('features')

const getFeature = (featureName) => databaseClient.get('features', { name: featureName })

const createFeatures = (features) => {
  return databaseClient.create('features', features)
    .then(get('ops'))
    .then(map(omit(['_id'])))
}

module.exports = { createFeatures, getAllFeatures, getFeature }