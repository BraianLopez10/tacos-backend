var express = require('express')
var router = express.Router()
// var productoRoute = require('./producto')
// var comboRoute = require('./combo')
// var mpRoute = require('./mp')
const comboRoute = require('../components/combo/routes')
const productoRoute = require('../components/producto/routes')
// COMBOS
router.use('/combo', comboRoute)
// PRODUCTOS
router.use('/producto', productoRoute)

// //MP
// router.use('/mp', mpRoute)
module.exports = router
