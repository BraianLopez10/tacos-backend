const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = require('../../storage')
const upload = multer({ storage })
const ComboC = require('./combo-controller')

router
  .route('/')
  .get((req, res) => ComboC.getAll(req, res))
  .post(upload.single('image-prod'), (req, res) => ComboC.create(req, res))
  .delete((req, res) => ComboC.deleteBySlug(req, res))
  .patch((req, res) => ComboC.updatedBySlug(req, res))
router.get('/:slug', (req, res) => ComboC.getBySlug(req, res))

module.exports = router
