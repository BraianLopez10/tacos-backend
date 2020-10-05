var express = require('express')
var router = express.Router()
const MpControllerInstance = require('./mercadopago-controller')
/* GET home page. */
router.post('/', (req, res, next) => MpControllerInstance.getLinkMp(req, res))
router.post('/webhook', (req, res) => MpControllerInstance.webhook(req, res))

module.exports = router
