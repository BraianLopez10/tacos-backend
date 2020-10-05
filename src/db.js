const mongoose = require('mongoose')
let uri
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  console.log('DEVELOPMENT')
  uri = 'mongodb://database:27017/tacos'
} else {
  uri = process.env.MONGO_URI
}
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('CONECTADO CON ÉXITO A LA DB'))
  .catch((err) => { console.log(err) })

module.exports = mongoose
