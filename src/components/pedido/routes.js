const router = require('express').Router()
const PedidoController = require('./pedido-controller')

router.get('/', (req, res) => PedidoController.getAll(req, res))

module.exports = router
