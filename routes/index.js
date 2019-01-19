const express = require('express')
const router = express.Router()
const featuresController = require('../controllers/features-controller')

const handleGetFeatures = async (req, res) => {
  const { status, data } = await featuresController.getFeatures()
  res.status(status).json(data)
}

router.get('/', handleGetFeatures)

module.exports = router
