const store = require('./store')
const response = require('../../routes/response')

async function getAll(req, res) {
    try {
        const pedidos = await store.getAll()
        return response.success(req, res, 200, pedidos)
    } catch (err) {
        console.log(err)
        return response.error(req, res)
    }
}

module.exports = {
    getAll,
}
