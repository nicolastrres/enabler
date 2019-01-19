const { expect } = require('chai')
const { stub } = require('sinon')
const databaseClient = require('../../database/client')
const featuresRepository = require('../../repositories/features-repository')


describe('Features repository test', () => {
  before(() => {
    stub(databaseClient, 'getAll').returns([{ name: 'feature1', enabled: false }])
    stub(databaseClient, 'get').returns({ name: 'feature1', enabled: false })
  })

  it('gets all features', async () => {
    expect(await featuresRepository.getAllFeatures()).to.be.deep.equal([{ name: 'feature1', enabled: false }])
  })

  it('gets feature', async () => {
    expect(await featuresRepository.getFeature()).to.be.deep.equal({ name: 'feature1', enabled: false })
  })
})
