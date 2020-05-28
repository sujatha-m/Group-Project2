const express = require('express')
const db = require('../models')
const passport = require('../config/passport')

const router = express.Router()

// Sign-on Routes
// Login
router.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
})

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

// Report Routes
router.post('/api/report', async (req, res) => {
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

router.delete('/api/report/:id', async (req, res) => {
  try {
    let report = await db.Report.findByPk(req.params.id)

    report = await report.destroy()

    res.status(200).json({ data: report })
  } catch (error) {
    res.status(500).json({ error: [error] })
  }
})

module.exports = router
