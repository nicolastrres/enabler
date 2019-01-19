const MongoClient = require('mongodb').MongoClient
const { stub } = require('sinon')
const { expect } = require('chai')

describe('Database tests', () => {
  let getAll

  before(() => {
    const featuresFound = { toArray: () => [ { name: 'feature1', enabled: false } ] }
    const featuresCollectionStub = { find: () => featuresFound}
    const dbStub = { collection: (collectionName) => collectionName === 'features' ? featuresCollectionStub : null }

    stub(MongoClient.prototype, 'connect')
    stub(MongoClient.prototype, 'db').returns(dbStub)
    getAll = require('../../database/client').getAll
  })

  it('gets all features', async () => {
    expect(await getAll('features')).to.be.deep.equal([{ name: 'feature1', enabled: false }])
  })
})