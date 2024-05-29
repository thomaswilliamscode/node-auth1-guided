const router = require("express").Router()
const Middle = require('../auth/auth-middleware.js')

const Users = require("./users-model.js")

router.get("/", Middle.protect, (req, res, next) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

module.exports = router
