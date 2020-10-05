const mongoose = require('mongoose')

const ComboSchema = new mongoose.Schema(
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
    main: {
      type: Array,
      required: true
    },
    bebidas: {
      type: Array,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      required: true
    },
    img: String,
    estado: {
      type: Boolean,
      default: false
    }
  },
  { toJSON: { virtuals: true }, id: false, timestamps: true }
)

module.exports = mongoose.model('combo', ComboSchema)
