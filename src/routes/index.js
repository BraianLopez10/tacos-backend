var express = require('express')
var router = express.Router()

const comboRoute = require('../components/combo/routes')
const productoRoute = require('../components/producto/routes')
const mpRoute = require('../components/mercadoPago/routes')
// COMBOS
router.use('/combo', comboRoute)
// PRODUCTOS
router.use('/producto', productoRoute)

// MP
router.use('/mp', mpRoute)

module.exports = router
