
const featuresRepository = require('../repositories/features-repository')
const { isEmpty, partial, set } = require('lodash')
const { get, merge } = require('lodash/fp')
const HttpStatus = require('http-status-codes')

const addStatusCode = merge({ statusCode: HttpStatus.OK })

const wrapInDataObject = partial(set, {}, 'data')

const handleError = (error) => {
  // eslint-disable-next-line no-console
  console.error('Error raised while trying to get all features', error) // TODO: Use proper logging library
  return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR }
}

const getAllFeatures = () => {
  return featuresRepository.getAllFeatures()
    .then(wrapInDataObject)
    .then(addStatusCode)
    .catch(handleError)
}

const throwMissingFeatureName = () => {
  throw new Error('Missing feature name')
}

const validateFeatureName = (featureName) => !isEmpty(featureName) ? featureName : throwMissingFeatureName()

const getFeature = (req) => {
  return Promise.resolve(req)
    .then(get('params.featureName'))
    .then(validateFeatureName)
    .then(featuresRepository.getFeature)
    .then(wrapInDataObject)
    .then(addStatusCode)
    .catch(handleError)
}

module.exports = { getAllFeatures, getFeature }