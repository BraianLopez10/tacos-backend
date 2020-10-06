const Model = require('./pedido-model')

async function getAll () {
  const items = await Model.find()
  return items
}

async function getBy (campo , valor ) {
  const item = await Model.findOne({ [campo] : valor })
  return item
}

async function create (data) {
  const newPedido = await Model.create(data)
  return newPedido
}

async function deleteOne (slug) {
  const info = await Model.deleteOne({ slug })
  return info
}

async function update (slug, data) {
  return await Model.updateOne({ slug }, data)
}

async function updateBy (campo , valor , data ) {
  return await Model.findOneAndUpdate({ [campo] : valor} , {...data})
}

module.exports = {
  getAll,
  getBy,
  create,
  deleteOne,
  update,
  updateBy
}
