const MongoClient = require('mongodb').MongoClient
const { stub } = require('sinon')
const { expect } = require('chai')

describe('Database tests', () => {
  let databaseClient

  before(() => {
    const featuresFound = { toArray: () => [ { name: 'feature1', enabled: false } ] }
    const featuresCollectionStub = { find: () => featuresFound}
    const dbStub = { collection: (collectionName) => collectionName === 'features' ? featuresCollectionStub : null }

    stub(MongoClient.prototype, 'connect')
    stub(MongoClient.prototype, 'db').returns(dbStub)
    databaseClient = require('../../database/client')
  })

  after(() => {
    MongoClient.prototype.connect.restore()
    MongoClient.prototype.db.restore()
  })

  it('gets all features', async () => {
    expect(await databaseClient.getAll('features')).to.be.deep.equal([{ name: 'feature1', enabled: false }])
  })
})