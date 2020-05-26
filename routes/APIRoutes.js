const express = require('express')
const db = require('../models')
const passport = require('../config/passport')

const router = express.Router()

// Sign-on Routes
// Login
router.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
})

// // Register
// router.post('/api/register', async (req, res) => {
//   const { username, email, password } = req.body

//   try {
//     const user = await db.User.create({
//       username,
//       email,
//       password
//     })

//     res.status(200).json(user)
//   } catch (error) {
//     res.status(404).json(error)
//   }
// })

router.post('/api/register', async (req, res) => {
  try {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, '/api/login')
      })
  } catch (error) {
    res.status(401).json(error)
  }
})

router.post('/api/report', async (req, res) => {
  console.log(req.body)
  req.body.UserId = req.user.id
  const data = {
    phoneNumber: req.body.phoneNumber,
    cityName: req.body.cityName,
    message: req.body.message,
    UserId: req.user.id
  }
  try {
    const report = await db.Report.create(data)
    res.status(200).json(report)
  } catch (error) {
    res.status(404).json(error)
  }
})

// GET route for getting all of the reorts
router.get('/api/view', function (req, res) {
  // The `.findAll()` method is inherited from the Sequelize.Model class
  // and returns the results of a "SELECT * FROM Reports" command.
  // findAllRows()
  console.log(req.user)
  db.Report.findAll()
    .then(rows => res.status(200).json({ data: rows }))
    .catch(err => res.status(500).json({ errors: [err] }))
})
module.exports = router
