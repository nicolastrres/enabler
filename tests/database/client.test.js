const MongoClient = require('mongodb').MongoClient
const { stub, spy } = require('sinon')
const { expect } = require('chai')
const databaseClient = require('../../database/client')

const featuresFound = { toArray: () => [ { name: 'feature1', enabled: false } ] }
const featuresCollectionStub = { find: () => featuresFound}
const dbStub = { collection: (collectionName) => collectionName === 'features' ? featuresCollectionStub : null }
const clientStub = { close: spy(), db: () => dbStub }

describe('Database tests', () => {
  before(() => {
    stub(MongoClient.prototype, 'connect').returns(clientStub)
  })

  after(() => {
    MongoClient.prototype.connect.restore()
  })

  it('gets all features', async () => {
    expect(await databaseClient.getAll('features')).to.be.deep.equal([{ name: 'feature1', enabled: false }])
  })

  it('closes db connection', async () => {
    expect(clientStub.close.calledOnce).to.be.equal(true)
  })
})