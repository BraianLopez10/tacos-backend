if (process.env.MODE === "DEVELOPMENT")
  require('dotenv').config();
console.log(process.env.MODE)
const app = require('./src/app')
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('SERVER ON PORT ', process.env.PORT || 4000)
})
