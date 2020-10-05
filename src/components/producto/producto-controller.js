const uniqueSlug = require('unique-slug')
const store = require('./store')
const response = require('../../routes/response')

async function getAll (req, res) {
  try {
    const allProducts = await store.getAll()
    return response.success(req, res, 200, allProducts)
  } catch (err) {
    console.error([err.message], err)
    return response.error(req, res)
  }
}

async function getByName (req, res) {
  const { name } = req.params
  if (!name) return res.status(401).send()
  const nameFormated = name.trim().toLowerCase()
  try {
    const product = await this.dataBase.findOne({ name: nameFormated })
    res.json(product)
  } catch (error) {
    res.status(500).send()
  }
}

async function getBySlug (req, res) {
  const { slug } = req.params
  if (!slug) return response.error(req, res, 400, 'Faltan valores')
  try {
    const product = await store.getBy(slug)
    if (!product) return response.error(req, res, 404, 'Producto no encontrado')
    return response.success(req, res, 200, product)
  } catch (error) {
    return response.error(req, res)
  }
}

async function create (req, res) {
  if (req.method !== 'POST') { return response.error(req, res) }
  const { name, desc, valor, type, sabores } = req.body
  if (!name || !valor || !type || !req.file) { return response.error(req, res, 400, 'Faltan valores') }

  const arraySabores = sabores ? JSON.parse(sabores) : []
  const nameFormated = name.trim().toLowerCase()
  const product = {
    name: nameFormated,
    desc: desc || '',
    valor,
    img: req.file.location,
    type,
    sabores: arraySabores,
    slug: uniqueSlug()
  }
  try {
    const newProduct = await store.create(product)
    return response.success(req, res,  201, newProduct,)
  } catch (err) {
    console.log(err)
    return response.error(req, res)
  }
}

async function deleteBySlug (req, res) {
  const { slug } = req.body
  if (!slug) return response.error(req, res, 400, 'Faltan valores')
  try {
    const prod = await store.getBy(slug)
    if (!prod) return response.error(req, res, 404, 'Producto no encontrado')
    await store.deleteOne(slug)
    return response.success(req, res)
  } catch (err) {
    console.log(err)
    return response.error(req, res)
  }
}

async function updatedBySlug (req, res) {
  const { valor, name, desc, img, slug, estado, sabores } = req.body
  if (!slug) return response.error(req, res, 400, 'Faltan valores')
  try {
    // Actualiza en funcion de los campos validos pasados por la petición
    const producto = await store.getBy(slug)
    if (!producto) return response.error(req, res, 404)
    const newProd = {
      valor: valor || producto.valor,
      name: name || producto.name,
      desc: desc || producto.desc,
      img: img || producto.img,
      sabores: sabores || producto.sabores,
      estado: typeof estado === 'undefined' ? (producto.estado) : (estado)
    }
    await store.update(slug, newProd)
    return response.success(req, res)
  } catch (error) {
    console.log(error)
    return response.error(req, res)
  }
}

module.exports = {
  create,
  getBySlug,
  getAll,
  deleteBySlug,
  updatedBySlug
}
