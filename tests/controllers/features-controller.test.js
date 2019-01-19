const { expect } = require('chai')
const { stub } = require('sinon')

const featuresRepository = require('../../repositories/features-repository')
const { getAllFeatures, getFeature } = require('../../controllers/features-controller')


describe('Features controller', () => {
  before(() => {
    stub(console, 'error')
  })

  describe('get all features', () => {
    let allFeatures

    describe('with success', () => {
      before(async () => {
        stub(featuresRepository, 'getAllFeatures').resolves([
          { name: 'feature1', enabled: true },
          { name: 'feature2', enabled: false }
        ])
        allFeatures = await getAllFeatures()
      })

      after(() => {
        featuresRepository.getAllFeatures.restore()
      })

      it('returns all features', () => {
        expect(allFeatures.data).to.be.deep.equal([
          { name: 'feature1', enabled: true },
          { name: 'feature2', enabled: false }
        ])
      })

      it('returns success status code', async () => {
        expect(allFeatures.statusCode).to.be.equal(200)
      })
    })

    describe('when error is thrown', () => {
      before(async () => {
        stub(featuresRepository, 'getAllFeatures').rejects('Error')
        allFeatures = await getAllFeatures()
      })

      after(() => {
        featuresRepository.getAllFeatures.restore()
      })

      it('returns server error status codewn', () => {
        expect(allFeatures).to.have.property('statusCode').and.to.be.equal(500)
      })
    })
  })

  describe('get feature', () => {
    let actualFeature

    describe('with success', () => {
      before(async () => {
        stub(featuresRepository, 'getFeature').withArgs('feature1').resolves({ name: 'feature1', enabled: true })
        actualFeature = await getFeature('feature1')
      })

      after(() => {
        featuresRepository.getFeature.restore()
      })

      it('returns feature', () => {
        expect(actualFeature.data).to.be.deep.equal({ name: 'feature1', enabled: true })
      })

      it('returns success status code', () => {
        expect(actualFeature.statusCode).to.be.equal(200)
      })
    })

    describe('when error is thrown', () => {
      before(async () => {
        stub(featuresRepository, 'getFeature').withArgs('feature1').rejects('Error')
        actualFeature = await getFeature('feature1')
      })

      after(() => {
        featuresRepository.getFeature.restore()
      })

      it('returns server error status codewn', () => {
        expect(actualFeature.statusCode).to.be.equal(500)
      })
    })
  })
})
