const store = require('./store')
const response = require('../../routes/response')
const bcrypt = require('bcrypt')
const jwt = require('../../auth/genToken')

async function login (req, res) {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) { return response.error(req, res, 400, 'Faltan valores') }
  try {
    const user = await store.getByUsername(username)
    if (!user) return response.error(req, res, 400, 'Parametros invalidos')
    const userPass = user.password
    bcrypt.compare(password, userPass)
      .then(async (result) => {
        if (!result) {
          return response.error(req, res, 400, 'Parametros invalidos')
        } else {
          console.log(user)
          const data = {
            username: user.username
          }
          try {
            const token = await jwt.sign(data)
            return response.success(req, res, 200, token)
          } catch (err) {
            console.log(err)
            return response.error(req, res)
          }
        }
      })
  } catch (err) {
    console.log(err)
    return response.error(req, res)
  }
}
async function lostPassword (req, res) {
  const username = req.body.username
  const secret = req.body.secret
  const password = req.body.password

  if (!username || !secret || !password) return response.error(req, res, 400, 'Faltan valores')

  if (secret !== process.env.SECRET_RESET_PASS) {
    return response.error(req, res, 400, 'El secret es erroneo')
  }

  // Buscamos al usuario
  const user = await store.getByUsername(username)
  if (!user) { return response.error(req, res, 400, 'Parametros invalidos') }

  // El usuario existe asi que lo vamos a actualizar

  // Ciframos la contraseña la nueva contraseña

  bcrypt.hash(password, 5)
    .then(async (passwordCifrada) => {
      console.log(passwordCifrada)
      const data = {
        password: passwordCifrada
      }
      try {
        const ok = await store.update('username', username, data)
        return response.success(req, res, 200, ok)
      } catch (err) {
        console.log(err)
        return response.error(req, res)
      }
    })
}

module.exports = {
  login,
  lostPassword
}
