const { expect } = require('chai')
const { stub } = require('sinon')

const featuresRepository = require('../../repositories/features-repository')
const { getAllFeatures } = require('../../controllers/features-controller')


describe('Features controller', () => {
  describe('get all features', () => {
    describe('with success', () => {
      before(() => {
        stub(featuresRepository, 'getAllFeatures').resolves([
          { name: 'feature1', enabled: true },
          { name: 'feature2', enabled: false }
        ])
      })

      after(() => {
        featuresRepository.getAllFeatures.restore()
      })

      it('returns all features', async () => {
        expect(await getAllFeatures()).to.have.property('data').and.to.be.deep.equal([
          { name: 'feature1', enabled: true },
          { name: 'feature2', enabled: false }
        ])
      })

      it('returns success status code', async () => {
        expect(await getAllFeatures()).to.have.property('statusCode').and.to.be.equal(200)
      })
    })

    describe('when error is thrown', () => {
      before(() => {
        stub(featuresRepository, 'getAllFeatures').rejects('Error')
        stub(console, 'error')
      })

      after(() => {
        featuresRepository.getAllFeatures.restore()
      })

      it('returns server error status codewn', async () => {
        expect(await getAllFeatures()).to.have.property('statusCode').and.to.be.equal(500)
      })
    })
  })
})
