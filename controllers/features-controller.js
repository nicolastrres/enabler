
const featuresRepository = require('../repositories/features-repository')
const { partial, set } = require('lodash')
const { merge } = require('lodash/fp')
const HttpStatus = require('http-status-codes')

const addStatusCode = merge({ statusCode: HttpStatus.OK })

const addData = partial(set, {}, 'data')

const handleError = (error) => {
  // eslint-disable-next-line no-console
  console.error('Error raised while trying to get all features', error) // TODO: Use proper logging library
  return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR }
}

const getFeatures = () => {
  return featuresRepository.getFeatures()
    .then(addData)
    .then(addStatusCode)
    .catch(handleError)
}

module.exports = { getFeatures }