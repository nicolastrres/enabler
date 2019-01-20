const { expect } = require('chai')
const { stub } = require('sinon')
const databaseClient = require('../../database/client')
const featuresRepository = require('../../repositories/features-repository')

describe('Features repository test', () => {
  before(() => {
    stub(databaseClient, 'getAll')
      .withArgs('features')
      .resolves([{ name: 'feature1', enabled: false }])

    stub(databaseClient, 'get')
      .withArgs('features', { name: 'feature1' })
      .resolves({ name: 'feature1', enabled: false })

    stub(databaseClient, 'create').resolves({
      result: { ok: 1, n: 2 },
      ops: [
        { name: 'feature1', enabled: false, _id: '0' },
        { name: 'feature2', enabled: true, _id: '1' }
      ]
    })
  })

  after(() => {
    databaseClient.getAll.restore()
    databaseClient.get.restore()
    databaseClient.create.restore()
  })

  it('gets all features', async () => {
    const response = await featuresRepository.getAllFeatures()

    expect(response).to.be.deep.equal([{ name: 'feature1', enabled: false }])
  })

  it('gets feature', async () => {
    const response = await featuresRepository.getFeature('feature1')

    expect(response).to.be.deep.equal({ name: 'feature1', enabled: false })
  })

  it('creates feature', async () => {
    const features = [
      { name: 'feature1', enabled: false },
      { name: 'feature2', enabled: true }
    ]

    const response = await featuresRepository.createFeatures(features)

    expect(response).to.be.deep.equal(features)
  })
})
