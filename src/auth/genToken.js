const jwt = require('jsonwebtoken')

function sign (data) {
  return new Promise((resolve, reject) => {
    try {
      const payload = {
        slug: data.slug,
        username: data.username,
        // iat: Date.now() + 86400
        iat: Date.now() + 86400
      }
      const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_JWT)
      resolve(token)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  sign
}
