var aws = require('aws-sdk')
var multerS3 = require('multer-s3')
const s3 = new aws.S3({
  accessKeyId: process.env.ACCESSKEYID_S3,
  secretAccessKey: process.env.SECRETACCESSKEY
})
const storage = multerS3({
  s3: s3,
  bucket: 'tacos-mexico',
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    cb(null, file.fieldname + '-' + Date.now().toString() + '.' + extension)
  }
})

module.exports = storage
