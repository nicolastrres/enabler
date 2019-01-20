const { expect } = require('chai')
const { stub } = require('sinon')

const featuresRepository = require('../../repositories/features-repository')
const { createFeatures, getAllFeatures, getFeature } = require('../../controllers/features-controller')

describe('Features controller', () => {
  before(() => {
    stub(console, 'error')
  })

  describe('get all features', () => {
    let response

    describe('with success', () => {
      before(async () => {
        stub(featuresRepository, 'getAllFeatures').resolves([
          { name: 'feature1', enabled: true },
          { name: 'feature2', enabled: false }
        ])
        response = await getAllFeatures()
      })

      after(() => {
        featuresRepository.getAllFeatures.restore()
      })

      it('returns all features', () => {
        expect(response.data).to.be.deep.equal([
          { name: 'feature1', enabled: true },
          { name: 'feature2', enabled: false }
        ])
      })

      it('returns success status code', async () => {
        expect(response.statusCode).to.be.equal(200)
      })
    })

    describe('when error is thrown', () => {
      before(async () => {
        stub(featuresRepository, 'getAllFeatures').rejects('Error')
        response = await getAllFeatures()
      })

      after(() => {
        featuresRepository.getAllFeatures.restore()
      })

      it('returns server error status code', () => {
        expect(response.statusCode).to.be.equal(500)
      })
    })
  })

  describe('creates features', () => {
    let response

    describe('with success', () => {
      const features = [
        { name: 'feature1', enabled: true },
        { name: 'feature2', enabled: false }
      ]
      const request = { body: features }

      before(async () => {
        stub(featuresRepository, 'createFeatures')
          .withArgs(features)
          .resolves(features)

        response = await createFeatures(request)
      })

      after(() => {
        featuresRepository.createFeatures.restore()
      })

      it('returns all features created', () => {
        expect(response.data).to.be.deep.equal(features)
      })

      it('returns success status code', async () => {
        expect(response.statusCode).to.be.equal(201)
      })
    })

    describe('when error is thrown', () => {
      before(async () => {
        stub(featuresRepository, 'createFeatures').rejects('Error')
        response = await createFeatures()
      })

      after(() => {
        featuresRepository.createFeatures.restore()
      })

      it('returns server error status code', () => {
        expect(response.statusCode).to.be.equal(500)
      })
    })
  })

  describe('get feature', () => {
    let response

    describe('with success', () => {
      before(async () => {
        stub(featuresRepository, 'getFeature')
          .withArgs('feature1')
          .resolves({ name: 'feature1', enabled: true })

        response = await getFeature({ params: { featureName: 'feature1' } })
      })

      after(() => {
        featuresRepository.getFeature.restore()
      })

      it('returns feature', () => {
        expect(response.data).to.be.deep.equal({
          name: 'feature1',
          enabled: true
        })
      })

      it('returns success status code', () => {
        expect(response.statusCode).to.be.equal(200)
      })
    })

    describe('when error is thrown', () => {
      before(async () => {
        stub(featuresRepository, 'getFeature')
          .withArgs('feature1')
          .rejects('Error')
        response = await getFeature('feature1')
      })

      after(() => {
        featuresRepository.getFeature.restore()
      })

      it('returns server error status code', () => {
        expect(response.statusCode).to.be.equal(500)
      })
    })

    describe('when featureName is not provided', () => {
      it('returns server error status code', async () => {
        const response = await getFeature({})
        expect(response.statusCode).to.be.equal(500)
      })
    })
  })
})
