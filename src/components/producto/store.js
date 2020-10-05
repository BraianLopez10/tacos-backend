const Model = require('./producto-model')

async function getAll () {
  const items = await Model.find()
  return items
}

async function getBy (slug) {
  const item = await Model.findOne({ slug })
  return item
}

async function create (data) {
  const newProd = await Model.create(data)
  return newProd
}

async function deleteOne (slug) {
  const info = await Model.deleteOne({ slug })
  return info
}

async function update (slug, data) {
  return await Model.updateOne({ slug }, data)
}

module.exports = {
  getAll,
  getBy,
  create,
  deleteOne,
  update
}
