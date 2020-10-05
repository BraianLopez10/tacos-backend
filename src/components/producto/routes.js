const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = require('../../storage')
const productoController = require('./producto-controller')
const upload = multer({ storage })

router.get('/:slug', (req, res) => productoController.getBySlug(req, res))
router
  .route('/')
  .get((req, res) => productoController.getAll(req, res))
  .post(upload.single('image-prod'), (req, res) => productoController.create(req, res))
  .delete((req, res) => productoController.deleteBySlug(req, res))
  .patch((req, res) => productoController.updatedBySlug(req, res))

module.exports = router
