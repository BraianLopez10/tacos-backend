const mongoose = require('mongoose')
let uri
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  console.log('DEVELOPMENT')
  uri = 'mongodb://database:27017/tacos'
} else {
  uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.1k17z.mongodb.net/taco?retryWrites=true&w=majority`
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
