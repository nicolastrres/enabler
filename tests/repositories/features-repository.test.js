const { expect } = require('chai')
const { stub } = require('sinon')
const databaseClient = require('../../database/client')


describe('Features repository test', () => {
  let getAllFeatures

  before(() => {
    stub(databaseClient, 'getAll').returns([{ name: 'feature1', enabled: false }])
    getAllFeatures = require('../../repositories/features-repository').getAllFeatures
  })

  it('get all features', async () => {
    expect(await getAllFeatures()).to.be.deep.equal([{ name: 'feature1', enabled: false }])
  })
})
