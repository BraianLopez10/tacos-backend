const Model = require('./user-model')

async function getByUsername (username) {
  const user = await Model.findOne({ username })
  return user
}
async function update (campo, valor, data) {
  const update = await Model.findOneAndUpdate({ [campo]: valor }, { ...data })
}

module.exports = {
  getByUsername,
  update
}
