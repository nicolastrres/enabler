const express = require('express')
const router = express.Router()
const featuresController = require('../controllers/features-controller')

const handleGetAllFeatures = async (req, res) => {
  const { statusCode, data } = await featuresController.getAllFeatures()
  res.status(statusCode).json(data)
}

router.get('/', handleGetAllFeatures)

module.exports = router
