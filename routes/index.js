const express = require('express')
const router = express.Router()
const featuresController = require('../controllers/features-controller')

const handle = (handlerFn) => {
  return async (req, res) => {
    const { statusCode, data } = await handlerFn(req.params)
    res.status(statusCode).json(data)
  }
}

router.get('/', handle(featuresController.getAllFeatures))
router.get('/features', handle(featuresController.getAllFeatures))
router.post('/features', handle(featuresController.createFeatures))

router.get('/features/:featureName', handle(featuresController.getFeature))

module.exports = router
