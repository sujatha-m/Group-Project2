// Dependencies
const express = require('express')
const router = express.Router()

// Requiring our models and passport as we've configured it
const db = require('../models')
const passport = require('../config/passport')

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the report page.
// Otherwise the user will be sent an error
router.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
})
// Route for signing up a user. The user's password is automatically hashed and stored
// If the user is created successfully, proceed to log the user in,
// otherwise send back an error
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

// POST route for creating a new report
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
// DELETE route for deleting reorts
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
