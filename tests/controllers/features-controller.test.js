const { expect } = require('chai')
const { stub } = require('sinon')

const featuresRepository = require('../../repositories/features-repository')
const { getFeatures } = require('../../controllers/features-controller')


describe('Features controller', () => {
  describe('get all features', () => {
    describe('with success', () => {
      before(() => {
        stub(featuresRepository, 'getFeatures').resolves({
          feature1: true,
          feature2: true
        })
      })

      after(() => {
        featuresRepository.getFeatures.restore()
      })

      it('returns all features', async () => {
        expect(await getFeatures()).to.have.property('data').and.to.be.deep.equal({
          feature1: true,
          feature2: true
        })
      })

      it('returns success status code', async () => {
        expect(await getFeatures()).to.have.property('statusCode').and.to.be.equal(200)
      })
    })

    describe('when error is thrown', () => {
      before(() => {
        stub(featuresRepository, 'getFeatures').rejects('Error')
        stub(console, 'error')
      })

      it('returns server error status codewn', async () => {
        expect(await getFeatures()).to.have.property('statusCode').and.to.be.equal(500)
      })
    })
  })
})
