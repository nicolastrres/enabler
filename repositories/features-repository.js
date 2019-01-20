const databaseClient = require('../database/client')
const { get, pick, map } = require('lodash/fp')

const getFeatureData = pick(['name', 'enabled'])
const getFeaturesData = map(getFeatureData)

const getAllFeatures = () => {
  return databaseClient.getAll('features').then(getFeaturesData)
}

const getFeature = featureName => {
  return databaseClient
    .get('features', { name: featureName })
    .then(getFeatureData)
}

const createFeatures = features => {
  return databaseClient
    .create('features', features)
    .then(get('ops'))
    .then(getFeaturesData)
}

// eslint-disable-next-line no-unused-vars
const deleteFeature = featureName => {

}

module.exports = { createFeatures, deleteFeature, getAllFeatures, getFeature }
