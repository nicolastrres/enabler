
const featuresRepository = require('../repositories/features-repository')
const { isEmpty, partial, set } = require('lodash')
const { get, map, merge, pick } = require('lodash/fp')
const HttpStatus = require('http-status-codes')

const addStatusCode = (statusCode) => merge({ statusCode })
const addSuccessCode = addStatusCode(HttpStatus.OK)
const addCreatedCode = addStatusCode(HttpStatus.CREATED)

const wrapInDataObject = partial(set, {}, 'data')

const handleError = (error) => {
  // eslint-disable-next-line no-console
  console.error('Error raised while trying to get all features', error) // TODO: Use proper logging library
  return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR }
}

const getAllFeatures = () => {
  return featuresRepository.getAllFeatures()
    .then(wrapInDataObject)
    .then(addSuccessCode)
    .catch(handleError)
}

const createFeatures = (req) => { // TODO: validate request
  return Promise.resolve(req)
    .then(get('body'))
    .then(map(pick(['name', 'enabled'])))
    .then(featuresRepository.createFeatures)
    .then(wrapInDataObject)
    .then(addCreatedCode)
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
    .then(addSuccessCode)
    .catch(handleError)
}

module.exports = { createFeatures, getAllFeatures, getFeature }