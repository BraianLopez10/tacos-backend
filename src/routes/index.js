var express = require('express')
var router = express.Router()

const comboRoute = require('../components/combo/routes')
const productoRoute = require('../components/producto/routes')
const paymentRoute = require('../components/payment/routes')
const pedidoRoute = require('../components/pedido/routes')

// COMBOS
router.use('/combo', comboRoute)
// PRODUCTOS
router.use('/producto', productoRoute)
// PEDIDOS
router.use('/pedido', pedidoRoute)
// MP
router.use('/payment', paymentRoute)

module.exports = router
