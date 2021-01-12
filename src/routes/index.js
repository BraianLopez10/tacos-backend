const express = require('express')
const router = express.Router()

const comboRoute = require('../components/combo/routes')
const productoRoute = require('../components/producto/routes')
const paymentRoute = require('../components/payment/routes')
const pedidoRoute = require('../components/pedido/routes')
const userRoute = require('../components/user/routes')

// Middleware
const authMiddleware = require('../middlewares/checkauth').checkauth

// COMBOS
router.use('/combo', comboRoute)
// PRODUCTOS
router.use('/producto', productoRoute)
// PEDIDOS
router.use('/pedido', authMiddleware, pedidoRoute)
// MP
router.use('/payment', paymentRoute)
// User
router.use('/auth', userRoute)

module.exports = router
