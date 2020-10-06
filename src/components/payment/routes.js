var express = require('express')
var router = express.Router()
const PaymentController = require('./payment-controller')

router.post('/', (req, res, next) => PaymentController.getLinkMp(req, res))
router.post('/webhook', (req, res) => PaymentController.webhook(req, res))

module.exports = router
