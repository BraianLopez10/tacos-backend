const response = require('../routes/response')
const jwt = require('jsonwebtoken')
const { unix } = require('moment')

const checkauth = (req, res, next) => {
  if (!req.headers.authorization) {
    return response.error(req, res, 401, 'Falta el token')
  }

  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.decode(token, process.env.SECRET_JWT)

  if (!payload) return response.error(req, res, 500, 'Error en el token')
  console.log(payload)
  if (payload.iat <= Date.now()) {
    return response.error(req, res, 401, 'El token ha expirado')
  }
  req.user = payload.username
  next()
}

module.exports = {
  checkauth
}
