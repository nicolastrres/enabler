const MongoClient = require('mongodb').MongoClient
const { stub, spy } = require('sinon')
const { expect } = require('chai')
const databaseClient = require('../../database/client')

const feature = { name: 'feature1', enabled: false }
const featuresFound = { toArray: () => [feature] }

const insertManyStub = stub()
insertManyStub.withArgs('feature1').returns({result: {ok: 1}})

const findOneStub = stub()
findOneStub.withArgs('feature1').returns(feature)

const featuresCollectionStub = {
  find: () => featuresFound,
  findOne: findOneStub,
  insertMany: insertManyStub
}

const collectionStub = stub()
collectionStub.withArgs('features').returns(featuresCollectionStub)

const dbStub = { collection:  collectionStub}
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

  it('get a single feature', async () => {
    expect(await databaseClient.get('features', 'feature1')).to.be.deep.equal(feature)
  })

  it('creates many features', async () => {
    const created = await databaseClient.create('features', 'feature1')

    expect(created.result.ok).to.be.equal(1)
  })

})