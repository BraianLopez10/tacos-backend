const Router = require('express').Router()

const userController = require('./user-controller')

Router.post('/login', (req, res) => {
  userController.login(req, res)
})
Router.post('/lostpass', (req, res) => {
  userController.lostPassword(req, res)
})

module.exports = Router
