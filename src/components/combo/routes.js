const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = require('../../storage')
const upload = multer({ storage })
const ComboC = require('./combo-controller')

// Middlewares
const authMiddlwares = require('../../middlewares/checkauth').checkauth

router
  .route('/')
  .get((req, res) => ComboC.getAll(req, res))
  .post(authMiddlwares, upload.single('image-prod'), (req, res) => ComboC.create(req, res))
  .delete(authMiddlwares, (req, res) => ComboC.deleteBySlug(req, res))
  .patch(authMiddlwares, (req, res) => ComboC.updatedBySlug(req, res))
router.get('/:slug', (req, res) => ComboC.getBySlug(req, res))

module.exports = router
