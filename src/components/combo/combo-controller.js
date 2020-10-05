const response = require('../../routes/response')
const uniqueSlug = require('unique-slug')
const store = require('./store')

async function getAll (req, res) {
  try {
    const items = await store.getAll()
    response.success(req, res, 200, items)
  } catch (err) {
    console.log(err)
    response.error(req, res)
  }
}

async function getBySlug (req, res) {
  const { slug } = req.params
  if (!slug) return response.error(req, res, 400, 'Faltan valores ')
  try {
    const item = await store.getBy(slug)
    if (!item) return response.error(req, res, 404, 'Combo no encontrado')
    return response.success(req, res, 200, item)
  } catch (err) {
    console.log(err)
    return response.error(req, res)
  }
}

async function create (req, res) {
  const { name, valor, main, bebidas, desc } = req.body
  if (!name || !valor || !main || !bebidas || !req.file) { return response.error(req, res, 400, 'Faltan valores ') }
  const mainArray = main ? JSON.parse(main) : []
  const bebidasArray = bebidas ? JSON.parse(bebidas) : []

  const combo = {
    name,
    desc: desc || '',
    valor,
    main: mainArray,
    bebidas: bebidasArray,
    img: req.file.location,
    slug: uniqueSlug()
  }
  try {
    const newCombo = await store.create(combo)
    return response.success(req, res, 201, newCombo)
  } catch (err) {
    console.log(err)
    return response.error(req, res)
  }
}

async function deleteBySlug (req, res) {
  const { slug } = req.body
  if (!slug) return response.error(req, res, 400, 'Faltan valores')
  try {
    await store.deleteOne(slug)
    return response.success(req, res)
  } catch (error) {
    console.log(error)
    response.error(req, res)
  }
}

async function updatedBySlug (req, res) {
  const { slug, img, desc, main, bebidas, valor, name, estado } = req.body
  if (!slug) return response.error(req, res, 400, 'Faltan valores')
  try {
    const combo = await store.getBy(slug)
    if (!combo) return response.error(req, res, 404, 'El combo no existe')
    const comboUpdated = {
      img: img || combo.img,
      desc: desc || combo.desc,
      main: main || combo.main,
      bebidas: bebidas || combo.bebidas,
      valor: valor || combo.valor,
      name: name || combo.name,
      estado: estado || combo.estado
    }
    await store.update(slug, comboUpdated)
    return response.success(req, res, 200, comboUpdated)
  } catch (err) {
    console.log(err)
    return response.error(req, res)
  }
}

module.exports = {
  getAll,
  updatedBySlug,
  deleteBySlug,
  create,
  getBySlug
}
