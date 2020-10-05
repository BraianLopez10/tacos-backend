const mongoose = require('mongoose')

const ProductoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    desc: String,
    valor: {
      type: Number,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      required: true
    },
    sabores: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      required: true
    },
    estado: {
      type: Boolean,
      default: false
    }
  },
  { toJSON: { virtuals: true }, id: false, timestamps: true }
)

module.exports = mongoose.model('producto', ProductoSchema)
